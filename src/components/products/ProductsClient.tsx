"use client";

import React, { useEffect, useState } from "react";
import { Category, Product } from "@/lib/types";
import api from "@/lib/api";
import FilterSidebar from "@/components/products/FilterSidebar";
import MobileFilter from "@/components/products/MobileFilter";
import SearchBar from "@/components/products/SearchBar";
import SortSelect from "@/components/products/SortSelect";
import ProductCard from "@/components/products/ProductCard";
import { Separator } from "@/components/ui/separator";
import ProductPagination from "@/components/products/ProductPagination";
import EmptyProductsState from "@/components/ui/EmptyProductsState";
import { useFilterStore, useInitializeFilters } from "@/store/filterStore";
import ClientOnly from "./ClientOnly";

// ProductsClient component for handling interactive product filtering
interface ProductsClientProps {
  initialProductData: Product;
  initialCategories: Category[];
  initialCategoryName: string;
  initialSearchParams: Record<string, string | string[] | undefined>;
}

export default function ProductsClient({
  initialProductData,
  initialCategories,
  initialCategoryName,
  initialSearchParams,
}: ProductsClientProps) {
  const [productData, setProductData] = useState<Product>(initialProductData);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [categoryName, setCategoryName] = useState<string>(initialCategoryName);
  
  // Get filter state
  const filterState = useFilterStore();
  
  // Initialize filter store from URL - this will read from URL and sync store
  useInitializeFilters();
  
  // Sync initial server state with client store if needed
  useEffect(() => {
    // Only sync if URL has categoryId but store doesn't (to handle hard refresh)
    if (initialSearchParams.categoryId && !filterState.categoryId) {
      console.log("Syncing categoryId from server to store:", initialSearchParams.categoryId);
      filterState.setCategoryId(initialSearchParams.categoryId as string);
    }
  }, [initialSearchParams.categoryId, filterState.categoryId, filterState.setCategoryId]);
  
  // Prevent unnecessary refetch on initial load
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    setIsInitialized(true);
  }, []);
  
  // Debug: Log current state
  useEffect(() => {
    console.log("ProductsClient - Initial searchParams:", initialSearchParams);
    console.log("ProductsClient - Current store categoryId:", filterState.categoryId);
    console.log("ProductsClient - Current categoryName:", categoryName);
    console.log("ProductsClient - Is initialized:", isInitialized);
  }, [initialSearchParams, filterState.categoryId, categoryName, isInitialized]);
  const getApiParams = () => {
    const params: Record<string, string | string[] | undefined> = {};
    
    if (filterState.categoryId) params.categoryId = filterState.categoryId;
    if (filterState.search) params.search = filterState.search;
    if (filterState.minPrice > 0) params.minPrice = filterState.minPrice.toString();
    if (filterState.maxPrice < 5000) params.maxPrice = filterState.maxPrice.toString();
    if (filterState.sortBy !== 'createdAt') params.sortBy = filterState.sortBy;
    if (filterState.direction !== 'desc') params.direction = filterState.direction;
    if (filterState.page > 0) params.page = filterState.page.toString();
    
    // Always filter for active products
    params.isActive = "true";
    params.size = "12";
    
    return params;
  };

  // Fetch data function
  const fetchData = async () => {
    const params = getApiParams();
    console.log("Fetching products with params:", params);
    
    const [productResponse, categoriesResponse] = await Promise.all([
      api.get(`/products?${new URLSearchParams(params as any).toString()}`).then(res => res.data),
      api.get("/categories?activeOnly=true").then(res => res.data),
    ]);

    setProductData(productResponse);
    setCategories(categoriesResponse);
    
    // Update category name
    const newCategoryName = categoriesResponse.find(
      (c: Category) => c.id.toString() === (filterState.categoryId || "")
    )?.name || "All Collection";
    setCategoryName(newCategoryName);
  };

  // Initialize data on mount and when filters change (but not on initial load)
  useEffect(() => {
    if (isInitialized) {
      fetchData();
    }
  }, [isInitialized, filterState.categoryId, filterState.search, filterState.minPrice, filterState.maxPrice, filterState.sortBy, filterState.direction, filterState.page]);

  return (
    <>
      {/* Fixed Sidebar - Desktop Only */}
      <aside className="hidden md:block fixed left-0 top-[80px] h-[calc(100vh-80px)] w-64 overflow-y-auto overflow-x-hidden z-40">
        <div className="h-full px-2">
          <ClientOnly fallback={<div className="w-full h-20 bg-gray-200 rounded-md animate-pulse mb-4" />}>
            <FilterSidebar categories={categories} totalProductCount={0} />
          </ClientOnly>
        </div>
      </aside>
      
      {/* Main Content - Offset from Sidebar */}
      <main className="ml-0 md:ml-64 min-h-screen" suppressHydrationWarning={true}>
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex-1">
              <h1 className="text-4xl font-black tracking-tight text-gray-900 capitalize">
                {categoryName}
              </h1>
              <p className="text-muted-foreground mt-2 text-sm">
                Showing {productData.totalElements} results
              </p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <ClientOnly fallback={<div className="w-10 h-10 bg-gray-200 rounded-md animate-pulse" />}>
                <MobileFilter categories={categories} totalProductCount={0} />
              </ClientOnly>
              <ClientOnly fallback={<div className="w-64 h-10 bg-gray-200 rounded-md animate-pulse" />}>
                <SearchBar />
              </ClientOnly>
              <ClientOnly fallback={<div className="w-44 h-10 bg-gray-200 rounded-md animate-pulse" />}>
                <SortSelect />
              </ClientOnly>
            </div>
          </div>
          <Separator className="mb-6" />

          {/* PRODUCT GRID */}
          {productData.content.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {productData.content.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    priority={index < 6}
                  />
                ))}
              </div>

              {productData.totalPages > 1 && (
                <ProductPagination
                  currentPage={productData.number + 1}
                  totalPages={productData.totalPages}
                />
              )}
            </>
          ) : (
            // Empty state with DotLottie animation
            <EmptyProductsState clearFilters={() => filterState.clearAllFilters()} />
          )}
        </div>
      </main>
    </>
  );
}

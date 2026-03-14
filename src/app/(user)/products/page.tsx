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
import Link from "next/link";
import ProductPagination from "@/components/products/ProductPagination";
import EmptyProductsState from "@/components/ui/EmptyProductsState";
import { useRouter } from "next/navigation";
import { useFilterStore, useInitializeFilters } from "@/store/filterStore";

// --- API FETCH FUNCTIONS ---

async function getProducts(
  params: Record<string, string | string[] | undefined>
): Promise<Product> {
  console.log("getProducts called with params:", params);
  const query = new URLSearchParams();

  if (typeof params.categoryId === "string")
    query.append("categoryId", params.categoryId);

  if (typeof params.search === "string")
    query.append("search", params.search);

  if (typeof params.minPrice === "string")
    query.append("minPrice", params.minPrice);

  if (typeof params.maxPrice === "string")
    query.append("maxPrice", params.maxPrice);

  if (typeof params.sortBy === "string")
    query.append("sortBy", params.sortBy);

  if (typeof params.direction === "string")
    query.append("direction", params.direction);

  query.append("page", typeof params.page === "string" ? params.page : "0");
  query.append("size", "12");
  query.append("isActive", "true");

  console.log("Final API query:", query.toString());

  try {
    const { data } = await api.get(`/products?${query.toString()}`);
    return data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return {
      content: [],
      totalElements: 0,
      totalPages: 0,
      number: 0,
      size: 12,
      first: true,
      last: true,
    };
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const { data } = await api.get("/categories");
    return data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

// --- PAGE COMPONENT ---

export default function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const router = useRouter();
  const [productData, setProductData] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  
  // Initialize filter store from URL
  useInitializeFilters();
  
  // Get filter state
  const filterState = useFilterStore();

  // Convert filter state to API params
  const getApiParams = () => {
    const params: Record<string, string | string[] | undefined> = {};
    
    if (filterState.categoryId) params.categoryId = filterState.categoryId;
    if (filterState.search) params.search = filterState.search;
    if (filterState.minPrice > 0) params.minPrice = filterState.minPrice.toString();
    if (filterState.maxPrice < 5000) params.maxPrice = filterState.maxPrice.toString();
    if (filterState.sortBy !== 'createdAt') params.sortBy = filterState.sortBy;
    if (filterState.direction !== 'desc') params.direction = filterState.direction;
    if (filterState.page > 0) params.page = filterState.page.toString();
    
    return params;
  };

  // Fetch data function
  const fetchData = async () => {
    const params = getApiParams();
    console.log("Fetching products with params:", params);
    
    const [productResponse, categoriesResponse] = await Promise.all([
      getProducts(params),
      getCategories(),
    ]);

    setProductData(productResponse);
    setCategories(categoriesResponse);
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [filterState.categoryId, filterState.search, filterState.minPrice, filterState.maxPrice, filterState.sortBy, filterState.direction, filterState.page]);

  const currentCategoryName =
    categories.find(
      (c) => c.id.toString() === (filterState.categoryId || "")
    )?.name || "All Collection";

  if (!productData || !categories) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex justify-center items-center py-20">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Fixed Sidebar - Desktop Only */}
      <aside className="hidden md:block fixed left-0 top-[80px] h-[calc(100vh-80px)] w-64 overflow-y-auto overflow-x-hidden z-40">
        <div className="h-full px-2">
          <FilterSidebar categories={categories} />
        </div>
      </aside>
      
      {/* Main Content - Offset from Sidebar */}
      <main className="ml-0 md:ml-64 min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex-1">
              <h1 className="text-4xl font-black tracking-tight text-gray-900 capitalize">
                {currentCategoryName}
              </h1>
              <p className="text-muted-foreground mt-2 text-sm">
                Showing {productData.totalElements} results
              </p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <MobileFilter categories={categories} />
              <SearchBar />
              <SortSelect />
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

import React from "react";
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
import ProductsClient from "@/components/products/ProductsClient";

// Force dynamic rendering to ensure filters work on hard refresh
export const dynamic = "force-dynamic";

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
    const { data } = await api.get("/categories?activeOnly=true");
    return data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

// --- PAGE COMPONENT ---

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // Resolve searchParams on server
  const resolvedSearchParams = await searchParams;
  
  // Fetch initial data on server with URL parameters
  const [productData, categories] = await Promise.all([
    getProducts(resolvedSearchParams),
    getCategories(),
  ]);

  const currentCategoryName =
    categories.find(
      (c) => c.id.toString() === (resolvedSearchParams.categoryId as string || "")
    )?.name || "All Collection";

  return (
    <ProductsClient 
      initialProductData={productData}
      initialCategories={categories}
      initialCategoryName={currentCategoryName}
      initialSearchParams={resolvedSearchParams}
    />
  );
}

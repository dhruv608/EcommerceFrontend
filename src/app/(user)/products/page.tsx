import { Category, Product } from "@/lib/types";
import api from "@/lib/api";
import FilterSidebar from "@/components/products/FilterSidebar";
import MobileFilter from "@/components/products/MobileFilter";
import SearchBar from "@/components/products/SearchBar";
import SortSelect from "@/components/products/SortSelect";
import ProductCard from "@/components/products/ProductCard";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

// --- API FETCH FUNCTIONS ---

async function getProducts(
  params: Record<string, string | string[] | undefined>
): Promise<Product> {
  const query = new URLSearchParams();

  if (typeof params.categoryId === "string")
    query.append("categoryId", params.categoryId);

  if (typeof params.search === "string")
    query.append("search", params.search);

  if (typeof params.maxPrice === "string")
    query.append("maxPrice", params.maxPrice);

  if (typeof params.sortBy === "string")
    query.append("sortBy", params.sortBy);

  if (typeof params.direction === "string")
    query.append("direction", params.direction);

  query.append("page", typeof params.page === "string" ? params.page : "0");
  query.append("size", "12");
  query.append("isActive", "true");

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

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // ✅ MOST IMPORTANT FIX
  const params = await searchParams;

  const [productData, categories] = await Promise.all([
    getProducts(params),
    getCategories(),
  ]);

  const currentCategoryName =
    categories.find(
      (c) => c.id.toString() === params.categoryId
    )?.name || "All Collection";

  const createPageUrl = (newPage: number) => {
    const urlParams = new URLSearchParams();

    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (typeof value === "string") {
        urlParams.set(key, value);
      }
    });

    urlParams.set("page", newPage.toString());
    return `/products?${urlParams.toString()}`;
  };

  return (
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

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        <aside className="hidden md:block sticky top-[100px] h-fit">
          <FilterSidebar categories={categories} />
        </aside>

        <main>
          {productData.content.length > 0 ? (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {productData.content.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    priority={index < 6}
                  />
                ))}
              </div>

              {productData.totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-4">
                  <Button variant="outline" disabled={productData.first} asChild={!productData.first}>
                    {productData.first ? (
                      <span className="flex items-center gap-1 text-gray-400">
                        <ChevronLeft className="w-4 h-4" /> Prev
                      </span>
                    ) : (
                      <Link href={createPageUrl(productData.number - 1)}>
                        <ChevronLeft className="w-4 h-4" /> Prev
                      </Link>
                    )}
                  </Button>

                  <span className="text-sm font-medium text-gray-600">
                    Page {productData.number + 1} of {productData.totalPages}
                  </span>

                  <Button variant="outline" disabled={productData.last} asChild={!productData.last}>
                    {productData.last ? (
                      <span className="flex items-center gap-1 text-gray-400">
                        Next <ChevronRight className="w-4 h-4" />
                      </span>
                    ) : (
                      <Link href={createPageUrl(productData.number + 1)}>
                        Next <ChevronRight className="w-4 h-4" />
                      </Link>
                    )}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-xl font-bold text-gray-500">No products found</p>
              <Link href="/products" className="text-indigo-600 mt-3">
                Clear all filters
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

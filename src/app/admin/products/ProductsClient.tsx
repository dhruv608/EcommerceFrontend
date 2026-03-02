"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Category, Product, ProductContent } from "@/lib/types";
import ProductsTable from "@/components/admin/ProductsTable";
import Link from "next/link";
import { toast } from "sonner";
import { getCategories } from "@/lib/getCategories";
import api from "@/lib/api";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";


export default function ProductsClient({
  initialData,
}: {
  initialData: Product;
}) {
  // 🧠 state (abhi sirf store kar rahe hain)
  const [products, setProducts] = useState<ProductContent[]>(initialData.content);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [feature, setFeature] = useState("all");
  const [page, setPage] = useState(initialData.number);
  const [totalPages, setTotalPages] = useState(initialData.totalPages);
  const [isFirst, setIsFirst] = useState(initialData.first);
  const [isLast, setIsLast] = useState(initialData.last);
  const [sortBy, setSortBy] = useState<"price" | "stock" | null>(null);
  const [direction, setDirection] = useState<"asc" | "desc" | null>(null);

  function handleSort(field: "price" | "stock") {
    if (sortBy !== field) {
      setSortBy(field);
      setDirection("asc");
      return;
    }

    if (direction === "asc") {
      setDirection("desc");
      return;
    }

    // third click → reset
    setSortBy(null);
    setDirection(null);
  }

  function getPageNumbers(current: number, total: number) {
    const pages: number[] = [];

    const start = Math.max(0, current - 2);
    const end = Math.min(total - 1, current + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        toast.error("Failed to load categories");
      }
    }

    fetchCategories();
  }, []);

  function mapStatus(status: string): boolean | null {
    if (status === "active") return true;
    if (status === "inactive") return false;
    return null; // all
  }

  function mapFeatured(feature: string): boolean | null {
    if (feature === "feature") return true;
    if (feature === "unfeature") return false;
    return null; // all
  }

  useEffect(() => {
    setPage(0);
  }, [search, category, status, feature]);

  useEffect(() => {
    async function fetchFilteredProducts() {

      try {
        const res = await api.get("/products", {
          params: {
            page,
            search: search || null,
            categoryId: category === "all" ? null : Number(category),
            isActive: mapStatus(status),
            isFeatured: mapFeatured(feature),
            sortBy,
            direction,
          },
        });
        setProducts(res.data.content);
        setTotalPages(res.data.totalPages);
        setIsFirst(res.data.first);
        setIsLast(res.data.last);
      } catch (err) {
        toast.error("Failed to load products");
      }
    }
    fetchFilteredProducts();
  }, [search, category, status, feature, page ,sortBy,direction]);

  return (
    <div className="space-y-4 pt-2">

      {/* 🔝 HEADER */}
      <div className="flex items-center justify-between">

        {/* Left controls */}
        <div className="flex gap-3">

          {/* Search */}

          <Input
            placeholder="Search products by name..."
            className="w-64"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          {/* Category filter */}
          <Select value={category} onValueChange={setCategory}  >
            <SelectTrigger className="w-44 ">
              <SelectValue placeholder="All Categories" className="mt-2" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" >All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem
                  key={category.id}
                  value={String(category.id)
                  }
                >
                  {category.name}
                </SelectItem>
              ))}

            </SelectContent>
          </Select>

          {/* Status filter */}
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Select value={feature} onValueChange={setFeature}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="feature">Featured</SelectItem>
              <SelectItem value="unfeature">InFeatured</SelectItem>
            </SelectContent>
          </Select>

        </div>

        {/* Right action */}
        <Link href={"/admin/products/addProduct"}>

          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Product

          </Button>
        </Link>
      </div>

      {/*  TABLE */}
      <ProductsTable products={products} sortBy={sortBy} direction={direction} onSort={handleSort} />

      {totalPages > 1 && (
        <Pagination className="justify-center mt-4">
          <PaginationContent>

            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage(p => p - 1)}
                className={isFirst ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>

            {page > 2 && (
              <>
                <PaginationItem>
                  <PaginationLink onClick={() => setPage(0)}>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              </>
            )}

            {getPageNumbers(page, totalPages).map(p => (
              <PaginationItem key={p}>
                <PaginationLink
                  isActive={p === page}
                  onClick={() => setPage(p)}
                >
                  {p + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {page < totalPages - 3 && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink onClick={() => setPage(totalPages - 1)}>
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() => setPage(p => p + 1)}
                className={isLast ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>

          </PaginationContent>
        </Pagination>
      )}


    </div>
  );
}

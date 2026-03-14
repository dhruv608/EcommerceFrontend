"use client";

import LightStorePagination from "@/components/ui/LightStorePagination";
import { useRouter, useSearchParams } from "next/navigation";

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function ProductPagination({ currentPage, totalPages }: ProductPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", (newPage - 1).toString()); // Convert to 0-based for API
    router.push(`/products?${params.toString()}`);
  };

  return (
    <LightStorePagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
}

"use client";

import LightStorePagination from "@/components/ui/LightStorePagination";
import { useFilterStore } from "@/store/filterStore";

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function ProductPagination({ currentPage, totalPages }: ProductPaginationProps) {
  const { setPage } = useFilterStore();

  const handlePageChange = (newPage: number) => {
    setPage(newPage - 1); // Convert to 0-based for API
  };

  return (
    <LightStorePagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
}

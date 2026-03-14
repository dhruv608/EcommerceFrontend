"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    setSearchValue(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearch = useCallback((value: string) => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      if (value.trim()) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("search", value.trim());
        params.delete("page"); // Reset to page 1 when searching
        router.push(`/products?${params.toString()}`);
      }
    }, 300);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    
    // Update URL immediately when input changes
    if (value.trim()) {
      handleSearch(value);
    } else if (value === "") {
      // If search is cleared, remove search parameter but keep other filters
      const params = new URLSearchParams(searchParams.toString());
      params.delete("search");
      params.delete("page"); // Reset to page 1 when searching
      router.push(`/products?${params.toString()}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = (e.target as HTMLInputElement).value;
      if (value) {
        handleSearch(value);
      }
    }
  };

  return (
    <div className="relative w-full md:w-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search products..."
          className="h-10 w-full md:w-64 pl-10 pr-4 text-sm border border-[#e5e7eb] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#a3a23d] focus:border-transparent"
        />
      </div>
    </div>
  );
}

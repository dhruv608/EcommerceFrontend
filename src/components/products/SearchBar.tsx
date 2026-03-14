"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Search } from "lucide-react";
import { useFilterStore } from "@/store/filterStore";

export default function SearchBar() {
  const { search, setSearch } = useFilterStore();
  const [localSearch, setLocalSearch] = useState(search || "");
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Sync local search with global store
  useEffect(() => {
    setLocalSearch(search || "");
  }, [search]);

  const handleSearch = useCallback((value: string) => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      setSearch(value.trim() || null);
    }, 300);
  }, [setSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearch(value);
    
    // Update search with debounce
    handleSearch(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = (e.target as HTMLInputElement).value;
      setSearch(value.trim() || null);
    }
  };

  return (
    <div className="relative w-full md:w-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={localSearch}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search products..."
          className="h-10 w-full md:w-64 pl-10 pr-4 text-sm border border-[#e5e7eb] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#a3a23d] focus:border-transparent"
        />
      </div>
    </div>
  );
}

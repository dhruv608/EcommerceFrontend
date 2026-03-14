"use client";

import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFilterStore } from "@/store/filterStore";

export default function SortSelect() {
  const { sortBy, direction, setSort } = useFilterStore();
  
  const currentSort = sortBy === "price" 
    ? (direction === "asc" ? "price_asc" : "price_desc")
    : "newest";

  const handleSortChange = (value: string) => {
    if (value === "price_asc") {
      setSort("price", "asc");
    } else if (value === "price_desc") {
      setSort("price", "desc");
    } else {
      setSort("createdAt", "desc");
    }
  };

  const getDisplayLabel = () => {
    switch (currentSort) {
      case "newest":
        return "Sort By: Newest";
      case "price_asc":
        return "Sort By: Price: Low → High";
      case "price_desc":
        return "Sort By: Price: High → Low";
      default:
        return "Sort By: Newest";
    }
  };

  return (
    <div className="relative">
      <Select value={currentSort} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[200px] border-gray-300 bg-white hover:border-gray-400 focus:border-[#acac49] focus:ring-[#acac49]/20">
          <SelectValue placeholder="Sort By: Newest">
            <span className="text-sm">{getDisplayLabel()}</span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent 
          className="bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 min-w-[200px]"
          position="popper"
          side="bottom"
          align="start"
        >
          <SelectItem value="newest" className="px-4 py-2 text-sm hover:bg-[#f8f8f8] focus:bg-[#f8f8f8] cursor-pointer rounded-md mx-1">
            Newest
          </SelectItem>
          <SelectItem value="price_asc" className="px-4 py-2 text-sm hover:bg-[#f8f8f8] focus:bg-[#f8f8f8] cursor-pointer rounded-md mx-1">
            Price: Low → High
          </SelectItem>
          <SelectItem value="price_desc" className="px-4 py-2 text-sm hover:bg-[#f8f8f8] focus:bg-[#f8f8f8] cursor-pointer rounded-md mx-1">
            Price: High → Low
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
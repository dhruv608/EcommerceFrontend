"use client";

import * as React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Category } from "@/lib/types";

export default function MobileFilter({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);

  // Manual URL parsing since useSearchParams doesn't work in production
  const getManualParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const params: Record<string, string | string[] | undefined> = {};
    for (const [key, value] of urlParams.entries()) {
      params[key] = value;
    }
    return params;
  };

  const searchParams = getManualParams();

  // 1. Initial State from URL
  const selectedCategoryId = searchParams.get("categoryId");
  const minPriceParam = Number(searchParams.get("minPrice")) || 0;
  const maxPriceParam = Number(searchParams.get("maxPrice")) || 5000;

  // Local State for Slider
  const [minPrice, setMinPrice] = React.useState(minPriceParam);
  const [maxPrice, setMaxPrice] = React.useState(maxPriceParam);

  // Clear All Filters
  const clearAllFilters = () => {
    // Reset local state
    setMinPrice(0);
    setMaxPrice(5000);
    
    // Navigate to clean URL to reset all filters
    router.push("/products");
    
    // Close mobile sheet
    setIsOpen(false);
  };

  // 2. Filter Update Logic
  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "0");
    router.push(`/products?${params.toString()}`);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="md:hidden gap-2 border-black" onClick={() => setIsOpen(true)}>
          <Filter className="w-4 h-4" /> Filters
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="left" 
        className="w-[320px] bg-white overflow-y-auto px-6 py-6"
      >
        <SheetHeader className="mb-6 text-left">
          <SheetTitle className="text-xl font-black">Refine Selection</SheetTitle>
          <SheetDescription>
            Filter products by category and price.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-8 pb-10">
          {/* Categories */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-3">Categories</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 py-1.5 px-2 rounded-md hover:bg-[#f8f8f8] cursor-pointer transition-colors">
                <Checkbox 
                  id="mobile-cat-all" 
                  checked={!selectedCategoryId}
                  onCheckedChange={() => updateFilter("categoryId", null)}
                  className="w-4 h-4 accent-[#a3a23d]"
                />
                <Label htmlFor="mobile-cat-all" className="text-sm font-medium flex-1 cursor-pointer flex justify-between items-center">
                  <span>All Products</span>
                </Label>
              </div>
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center gap-2.5 py-1.5 px-2 rounded-md hover:bg-[#f8f8f8] cursor-pointer transition-colors">
                  <Checkbox 
                    id={`mobile-cat-${cat.id}`} 
                    checked={selectedCategoryId === cat.id.toString()}
                    onCheckedChange={() => updateFilter("categoryId", cat.id.toString())}
                    className="w-4 h-4 accent-[#a3a23d]"
                  />
                  <Label htmlFor={`mobile-cat-${cat.id}`} className="text-sm cursor-pointer flex-1 flex justify-between items-center">
                    <span>{cat.name}</span>
                    <span className="text-[13px] text-[#9ca3af]">({cat.productCount})</span>
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Price Range */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-3">Price Range</h3>
            
            {/* Custom Dual Range Slider */}
            <div className="slider-container relative w-full h-9 mt-4 mb-5">
              {/* Background Track */}
              <div className="slider-track absolute top-1/2 left-0 right-0 w-full h-1 bg-[#e5e7eb] rounded-[4px] transform -translate-y-1/2"></div>
              
              {/* Active Range */}
              <div 
                className="slider-range absolute top-1/2 h-1 bg-[#acac49] rounded-[4px] transform -translate-y-1/2"
                style={{
                  left: `${(minPrice / 5000) * 100}%`,
                  width: `${((maxPrice - minPrice) / 5000) * 100}%`
                }}
              ></div>
              
              {/* Min Range Slider */}
              <input
                type="range"
                min="0"
                max="5000"
                value={minPrice}
                onChange={(e) => {
                  let newMin = Number(e.target.value);
                  if (newMin > maxPrice - 50) {
                    newMin = maxPrice - 50;
                  }
                  setMinPrice(newMin);
                  updateFilter("minPrice", newMin.toString());
                }}
                className="min-slider absolute top-1/2 left-0 w-full h-1 bg-transparent appearance-none transform -translate-y-1/2 pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#acac49] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-3 [&::-webkit-slider-thumb]:-mt-1.5 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
              />
              
              {/* Max Range Slider */}
              <input
                type="range"
                min="0"
                max="5000"
                value={maxPrice}
                onChange={(e) => {
                  let newMax = Number(e.target.value);
                  if (newMax < minPrice + 50) {
                    newMax = minPrice + 50;
                  }
                  setMaxPrice(newMax);
                  updateFilter("maxPrice", newMax.toString());
                }}
                className="max-slider absolute top-1/2 left-0 w-full h-1 bg-transparent appearance-none transform -translate-y-1/2 pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#acac49] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-4 [&::-webkit-slider-thumb]:-mt-1.5 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
              />
            </div>
            
            {/* Price Inputs */}
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => {
                    let newMin = parseInt(e.target.value) || 0;
                    if (newMin > maxPrice - 50) {
                      newMin = maxPrice - 50;
                    }
                    setMinPrice(newMin);
                    updateFilter("minPrice", newMin.toString());
                  }}
                  className="w-full rounded-lg px-2.5 py-2 border border-[#e5e7eb] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#acac49] focus:border-transparent"
                  placeholder="Min"
                />
              </div>
              <span className="text-gray-400 text-sm">—</span>
              <div className="flex-1">
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => {
                    let newMax = parseInt(e.target.value) || 0;
                    if (newMax < minPrice + 50) {
                      newMax = minPrice + 50;
                    }
                    setMaxPrice(newMax);
                    updateFilter("maxPrice", newMax.toString());
                  }}
                  className="w-full rounded-lg px-2.5 py-2 border border-[#e5e7eb] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#acac49] focus:border-transparent"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>

          {/* Clear Filters Button */}
          {(selectedCategoryId || minPriceParam > 0) && (
            <div className="pt-4 border-t border-[#e5e7eb]">
              <Button 
                variant="outline"
                className="w-full border-[#e5e7eb] px-3 py-2 rounded-lg text-[14px] hover:bg-[#f9fafb] transition-colors"
            onClick={clearAllFilters}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
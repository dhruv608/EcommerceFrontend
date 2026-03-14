"use client";

import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Category } from "@/lib/types";
import { useFilterStore } from "@/store/filterStore";

interface FilterSidebarProps {
  categories: Category[];
  totalProductCount?: number;
}

export default function FilterSidebar({ categories, totalProductCount }: FilterSidebarProps) {
  const {
    categoryId,
    minPrice,
    maxPrice,
    isFeatured,
    setCategoryId,
    setPriceRange,
    setFeatured,
    clearAllFilters
  } = useFilterStore();

  // Local state for slider drag interaction
  const [localMinPrice, setLocalMinPrice] = React.useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = React.useState(maxPrice);

  // Sync local slider state with global store
  React.useEffect(() => {
    setLocalMinPrice(minPrice);
    setLocalMaxPrice(maxPrice);
  }, [minPrice, maxPrice]);

  return (
    <div className="bg-white rounded-[14px] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)] w-full max-w-full hidden md:block">
      {/* Filters Title */}
      <h3 className="text-[18px] font-semibold mb-4">Filters</h3>
      <Separator className="mb-6" />
      
      {/* Category Section */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3 text-gray-700">Categories</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 py-1.5 px-2 rounded-md hover:bg-[#f8f8f8] cursor-pointer transition-colors">
            <Checkbox 
              id="cat-all" 
              checked={!categoryId}
              onCheckedChange={() => setCategoryId(null)}
              className="w-4 h-4 accent-[#a3a23d]"
            />
            <Label htmlFor="cat-all" className="text-sm font-medium flex-1 cursor-pointer">
              <span>All Products</span>
            </Label>
          </div>
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2.5 py-1.5 px-2 rounded-md hover:bg-[#f8f8f8] cursor-pointer transition-colors">
              <Checkbox 
                id={`cat-${cat.id}`} 
                checked={categoryId === cat.id.toString()}
                onCheckedChange={() => setCategoryId(cat.id.toString())}
                className="w-4 h-4 accent-[#a3a23d]"
              />
              <Label htmlFor={`cat-${cat.id}`} className="text-sm cursor-pointer flex-1">
                <span>{cat.name}</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3 text-gray-700">Special</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 py-1.5 px-2 rounded-md hover:bg-[#f8f8f8] cursor-pointer transition-colors">
            <Checkbox 
              id="featured" 
              checked={isFeatured}
              onCheckedChange={(checked) => setFeatured(checked as boolean)}
              className="w-4 h-4 accent-[#a3a23d]"
            />
            <Label htmlFor="featured" className="text-sm cursor-pointer flex-1">
              <span>Featured Products</span>
            </Label>
          </div>
        </div>
      </div>

      {/* Price Slider */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold mb-4 text-gray-700">Price Range</h4>
          
          {/* Custom Dual Range Slider */}
          <div className="slider-container relative w-full h-9">
            {/* Background Track */}
            <div className="slider-track absolute top-1/2 left-0 right-0 w-full h-1 bg-[#e5e7eb] rounded-[4px] transform -translate-y-1/2"></div>
            
            {/* Active Range */}
            <div 
              className="slider-range absolute top-1/2 h-1 bg-[#acac49] rounded-[4px] transform -translate-y-1/2"
              style={{
                left: `${(localMinPrice / 5000) * 100}%`,
                width: `${((localMaxPrice - localMinPrice) / 5000) * 100}%`
              }}
            ></div>
            
            {/* Min Range Slider */}
            <input
              type="range"
              min="0"
              max="5000"
              value={localMinPrice}
              onChange={(e) => {
                let newMin = Number(e.target.value);
                // Prevent sliders from crossing
                if (newMin > localMaxPrice - 50) {
                  newMin = localMaxPrice - 50;
                }
                setLocalMinPrice(newMin);
              }}
              onMouseUp={() => setPriceRange(localMinPrice, localMaxPrice)}
              onTouchEnd={() => setPriceRange(localMinPrice, localMaxPrice)}
              className="min-slider absolute top-1/2 left-0 w-full h-1 bg-transparent appearance-none transform -translate-y-1/2 pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#acac49] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-3 [&::-webkit-slider-thumb]:-mt-1.5 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
            />
            
            {/* Max Range Slider */}
            <input
              type="range"
              min="0"
              max="5000"
              value={localMaxPrice}
              onChange={(e) => {
                let newMax = Number(e.target.value);
                // Prevent sliders from crossing
                if (newMax < localMinPrice + 50) {
                  newMax = localMinPrice + 50;
                }
                setLocalMaxPrice(newMax);
              }}
              onMouseUp={() => setPriceRange(localMinPrice, localMaxPrice)}
              onTouchEnd={() => setPriceRange(localMinPrice, localMaxPrice)}
              className="max-slider absolute top-1/2 left-0 w-full h-1 bg-transparent appearance-none transform -translate-y-1/2 pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#acac49] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-4 [&::-webkit-slider-thumb]:-mt-1.5 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
            />
          </div>
        
          {/* Price Inputs */}
          <div className="flex items-center gap-2 w-full">
            <div className="flex-1">
              <input
                type="number"
                value={localMinPrice}
                onChange={(e) => {
                  let newMin = parseInt(e.target.value) || 0;
                  // Prevent sliders from crossing
                  if (newMin > localMaxPrice - 50) {
                    newMin = localMaxPrice - 50;
                  }
                  setLocalMinPrice(newMin);
                }}
                onBlur={() => setPriceRange(localMinPrice, localMaxPrice)}
                className="w-full rounded-lg px-2 py-2 border border-[#e5e7eb] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#acac49] focus:border-transparent"
                placeholder="Min"
              />
            </div>
            <span className="text-gray-400 text-sm flex-shrink-0">—</span>
            <div className="flex-1">
              <input
                type="number"
                value={localMaxPrice}
                onChange={(e) => {
                  let newMax = parseInt(e.target.value) || 0;
                  // Prevent sliders from crossing
                  if (newMax < localMinPrice + 50) {
                    newMax = localMinPrice + 50;
                  }
                  setLocalMaxPrice(newMax);
                }}
                onBlur={() => setPriceRange(localMinPrice, localMaxPrice)}
                className="w-full rounded-lg px-2 py-2 border border-[#e5e7eb] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#acac49] focus:border-transparent"
                placeholder="Max"
              />
            </div>
          </div>
        </div>

      {/* Clear Filters Button */}
      {(categoryId || minPrice > 0 || isFeatured) && (
        <div className="mt-6 pt-4 border-t border-[#e5e7eb]">
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
  );
}
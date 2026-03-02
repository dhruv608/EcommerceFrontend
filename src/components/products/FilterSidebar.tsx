"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Category } from "@/lib/types";

interface FilterSidebarProps {
  categories: Category[];
}

export default function FilterSidebar({ categories }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Initial State from URL
  const selectedCategoryId = searchParams.get("categoryId");
  const minPriceParam = Number(searchParams.get("minPrice")) || 0;
  const maxPriceParam = Number(searchParams.get("maxPrice")) || 5000;

  // Local State for Slider (taaki drag karte waqt URL na badle, chhodne pe badle)
  const [priceRange, setPriceRange] = React.useState([minPriceParam, maxPriceParam]);

  // 2. Filter Update Logic
  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "0"); // Filter change hone pe page 1 pe jao
    router.push(`/products?${params.toString()}`);
  };

  // Price Slider Commit (Jab user slider chhod de)
  const handlePriceCommit = (value: number[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("minPrice", value[0].toString());
    params.set("maxPrice", value[1].toString());
    params.set("page", "0");
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-tight">Filters</h3>
        {(selectedCategoryId || minPriceParam > 0) && (
          <Button 
            variant="ghost" 
            className="text-xs text-red-500 hover:text-red-600 h-8 px-2"
            onClick={() => router.push("/products")}
          >
            Reset
          </Button>
        )}
      </div>
      
      <Separator />

      <Accordion type="multiple" defaultValue={["category", "price"]} className="w-full">
        
        {/* 🔥 Category Filter */}
        <AccordionItem value="category">
          <AccordionTrigger className="text-sm font-bold">Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="cat-all" 
                  checked={!selectedCategoryId}
                  onCheckedChange={() => updateFilter("categoryId", null)}
                />
                <Label htmlFor="cat-all" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  All Products
                </Label>
              </div>
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`cat-${cat.id}`} 
                    checked={selectedCategoryId === cat.id.toString()}
                    onCheckedChange={() => updateFilter("categoryId", cat.id.toString())}
                  />
                  <Label htmlFor={`cat-${cat.id}`} className="text-sm cursor-pointer flex-1 flex justify-between">
                    <span>{cat.name}</span>
                    <span className="text-xs text-gray-400">({cat.productCount})</span>
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 🔥 Price Slider Filter */}
        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-bold">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 px-2">
              <Slider
                defaultValue={[minPriceParam, maxPriceParam]}
                max={10000} // Apne max price ke hisab se set karein
                step={100}
                value={priceRange}
                onValueChange={setPriceRange}
                onValueCommit={handlePriceCommit} // Ye tab chalega jab slider chhodenge
                className="mb-6"
              />
              <div className="flex items-center justify-between">
                <div className="border rounded px-3 py-1 text-sm font-medium min-w-20 text-center">
                  ₹{priceRange[0]}
                </div>
                <span className="text-gray-400 text-xs">TO</span>
                <div className="border rounded px-3 py-1 text-sm font-medium min-w-20 text-center">
                  ₹{priceRange[1]}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
'use client'

import * as React from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Filter } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Category } from '@/lib/types'
import { useFilterStore } from '@/store/filterStore'

export default function MobileFilter({
  categories,
  totalProductCount,
  maxPrice: dynamicMaxPrice = 5000,
}: {
  categories: Category[]
  totalProductCount?: number
  maxPrice?: number
}) {
  const [isOpen, setIsOpen] = React.useState(false)

  const {
    categoryId,
    minPrice,
    maxPrice,
    isFeatured,
    setCategoryId,
    setPriceRange,
    setFeatured,
    clearAllFilters,
  } = useFilterStore()

  // Local state for slider drag interaction
  const [localMinPrice, setLocalMinPrice] = React.useState(minPrice)
  const [localMaxPrice, setLocalMaxPrice] = React.useState(maxPrice > dynamicMaxPrice ? dynamicMaxPrice : maxPrice)

  // Sync local slider state with global store
  React.useEffect(() => {
    setLocalMinPrice(minPrice)
    const adjustedMaxPrice = maxPrice > dynamicMaxPrice ? dynamicMaxPrice : maxPrice
    setLocalMaxPrice(adjustedMaxPrice)
  }, [minPrice, maxPrice, dynamicMaxPrice])

  // Close sheet when filters are cleared
  const handleClearAllFilters = () => {
    clearAllFilters()
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="md:hidden gap-2 border-black"
          onClick={() => setIsOpen(true)}
        >
          <Filter className="w-4 h-4" /> Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[320px] bg-white overflow-y-auto px-6 py-6">
        <SheetHeader className="mb-6 text-left">
          <SheetTitle className="text-lg md:text-xl font-black">Refine Selection</SheetTitle>
          <SheetDescription className="text-sm">
            Filter products by category and price.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6 pb-10">
          {/* Categories */}
          <div>
            <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-3">Categories</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-[#f8f8f8] cursor-pointer transition-colors">
                <Checkbox
                  id="mobile-cat-all"
                  checked={categoryId === null}
                  onCheckedChange={() => setCategoryId(null)}
                  className="w-4 h-4 accent-[#a3a23d]"
                />
                <Label
                  htmlFor="mobile-cat-all"
                  className="text-sm font-medium flex-1 cursor-pointer"
                >
                  <span>All Products</span>
                </Label>
              </div>
              {categories.map(cat => (
                <div
                  key={cat.id}
                  className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-[#f8f8f8] cursor-pointer transition-colors"
                >
                  <Checkbox
                    id={`mobile-cat-${cat.id}`}
                    checked={categoryId === cat.id.toString()}
                    onCheckedChange={() => setCategoryId(cat.id.toString())}
                    className="w-4 h-4 accent-[#a3a23d]"
                  />
                  <Label htmlFor={`mobile-cat-${cat.id}`} className="text-sm cursor-pointer flex-1">
                    <span>{cat.name}</span>
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Featured Products */}
          <div>
            <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-3">Special</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-[#f8f8f8] cursor-pointer transition-colors">
                <Checkbox
                  id="mobile-featured"
                  checked={isFeatured}
                  onCheckedChange={checked => setFeatured(checked as boolean)}
                  className="w-4 h-4 accent-[#a3a23d]"
                />
                <Label htmlFor="mobile-featured" className="text-sm cursor-pointer flex-1">
                  <span>Featured Products</span>
                </Label>
              </div>
            </div>
          </div>

          <Separator />

          {/* Price Range */}
          <div>
            <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-3">Price Range</h3>

            {/* Custom Dual Range Slider */}
            <div className="slider-container relative w-full h-9 mt-4 mb-5">
              {/* Background Track */}
              <div className="slider-track absolute top-1/2 left-0 right-0 w-full h-1 bg-[#e5e7eb] rounded-[4px] transform -translate-y-1/2"></div>

              {/* Active Range */}
              <div
                className="slider-range absolute top-1/2 h-1 bg-[#acac49] rounded-[4px] transform -translate-y-1/2"
                style={{
                  left: `${(localMinPrice / dynamicMaxPrice) * 100}%`,
                  width: `${((localMaxPrice - localMinPrice) / dynamicMaxPrice) * 100}%`,
                }}
              ></div>

              {/* Min Range Slider */}
              <input
                type="range"
                min="0"
                max={dynamicMaxPrice}
                value={localMinPrice}
                onChange={e => {
                  let newMin = Number(e.target.value)
                  if (newMin > localMaxPrice - 50) {
                    newMin = localMaxPrice - 50
                  }
                  setLocalMinPrice(newMin)
                }}
                onMouseUp={() => setPriceRange(localMinPrice, localMaxPrice)}
                onTouchEnd={() => setPriceRange(localMinPrice, localMaxPrice)}
                className="min-slider absolute top-1/2 left-0 w-full h-1 bg-transparent appearance-none transform -translate-y-1/2 pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#acac49] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-3 [&::-webkit-slider-thumb]:-mt-1.5 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
              />

              {/* Max Range Slider */}
              <input
                type="range"
                min="0"
                max={dynamicMaxPrice}
                value={localMaxPrice}
                onChange={e => {
                  let newMax = Number(e.target.value)
                  if (newMax < localMinPrice + 50) {
                    newMax = localMinPrice + 50
                  }
                  setLocalMaxPrice(newMax)
                }}
                onMouseUp={() => setPriceRange(localMinPrice, localMaxPrice)}
                onTouchEnd={() => setPriceRange(localMinPrice, localMaxPrice)}
                className="max-slider absolute top-1/2 left-0 w-full h-1 bg-transparent appearance-none transform -translate-y-1/2 pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#acac49] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-4 [&::-webkit-slider-thumb]:-mt-1.5 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
              />
            </div>

            {/* Price Inputs */}
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <input
                  type="number"
                  value={localMinPrice}
                  onChange={e => {
                    let newMin = parseInt(e.target.value) || 0
                    if (newMin > localMaxPrice - 50) {
                      newMin = localMaxPrice - 50
                    }
                    setLocalMinPrice(newMin)
                  }}
                  onBlur={() => setPriceRange(localMinPrice, localMaxPrice)}
                  className="w-full rounded-lg px-2.5 py-2 border border-[#e5e7eb] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#acac49] focus:border-transparent"
                  placeholder="Min"
                />
              </div>
              <span className="text-gray-400 text-sm">—</span>
              <div className="flex-1">
                <input
                  type="number"
                  value={localMaxPrice}
                  onChange={e => {
                    let newMax = parseInt(e.target.value) || 0
                    if (newMax < localMinPrice + 50) {
                      newMax = localMinPrice + 50
                    }
                    setLocalMaxPrice(newMax)
                  }}
                  onBlur={() => setPriceRange(localMinPrice, localMaxPrice)}
                  className="w-full rounded-lg px-2.5 py-2 border border-[#e5e7eb] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#acac49] focus:border-transparent"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>

          {/* Clear Filters Button */}
          {(categoryId || minPrice > 0 || isFeatured) && (
            <div className="pt-4 border-t border-[#e5e7eb]">
              <Button
                variant="outline"
                className="w-full border-[#e5e7eb] px-3 py-2 rounded-lg text-[14px] hover:bg-[#f9fafb] transition-colors"
                onClick={handleClearAllFilters}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

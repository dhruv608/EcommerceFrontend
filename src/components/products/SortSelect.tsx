"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";

export default function SortSelect() {
  const router = useRouter();
  
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
  const currentSort = searchParams.sortBy === "price" 
    ? (searchParams.direction === "asc" ? "price_asc" : "price_desc")
    : "newest";

  // Listen for URL changes to update sort automatically
  React.useEffect(() => {
    const handleUrlChange = () => {
      const newParams = getManualParams();
      const newSort = newParams.sortBy === "price" 
        ? (newParams.direction === "asc" ? "price_asc" : "price_desc")
        : "newest";
      
      // Update currentSort state if URL sort changed
      if (newSort !== currentSort) {
        // Note: SortSelect component will re-render automatically with new value
      }
    };

    // Listen for popstate events (browser back/forward)
    window.addEventListener('popstate', handleUrlChange);
    
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []); // Remove dependencies to prevent re-render loops

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    
    if (value === "price_asc") {
      params.set("sortBy", "price");
      params.set("direction", "asc");
    } else if (value === "price_desc") {
      params.set("sortBy", "price");
      params.set("direction", "desc");
    } else {
      params.set("sortBy", "createdAt");
      params.set("direction", "desc");
    }
    params.set("page", "0");
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="relative">
      <Select value={currentSort} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[180px] border-gray-300 bg-white hover:border-gray-400 focus:border-[#acac49] focus:ring-[#acac49]/20">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent 
          className="bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 min-w-[180px]"
          position="popper"
          side="bottom"
          align="start"
        >
          <SelectItem value="newest" className="px-4 py-2 text-sm hover:bg-[#f8f8f8] focus:bg-[#f8f8f8] cursor-pointer rounded-md mx-1">
            Newest Arrivals
          </SelectItem>
          <SelectItem value="price_asc" className="px-4 py-2 text-sm hover:bg-[#f8f8f8] focus:bg-[#f8f8f8] cursor-pointer rounded-md mx-1">
            Price: Low to High
          </SelectItem>
          <SelectItem value="price_desc" className="px-4 py-2 text-sm hover:bg-[#f8f8f8] focus:bg-[#f8f8f8] cursor-pointer rounded-md mx-1">
            Price: High to Low
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
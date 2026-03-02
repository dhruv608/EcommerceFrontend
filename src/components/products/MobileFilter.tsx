"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import FilterSidebar from "./FilterSidebar";
import { Category } from "@/lib/types";

export default function MobileFilter({ categories }: { categories: Category[] }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="md:hidden gap-2 border-black">
          <Filter className="w-4 h-4" /> Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] overflow-y-auto">
        <SheetHeader className="mb-6 text-left">
          <SheetTitle className="text-xl font-black">Refine Selection</SheetTitle>
        </SheetHeader>
        <FilterSidebar categories={categories} />
      </SheetContent>
    </Sheet>
  );
}
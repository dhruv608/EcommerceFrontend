// src/components/Hero.tsx
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative h-[70vh] w-full bg-[#F3F3F5] overflow-hidden rounded-3xl mt-4">
      <div className="container mx-auto flex h-full items-center px-8">
        <div className="max-w-xl space-y-6 z-10">
          <span className="text-sm font-semibold tracking-widest uppercase text-gray-500">New Arrivals 2026</span>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Minimalist Fashion <br /> for Everyday Life
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover our new summer collection designed for comfort and style. Sustainable materials, timeless designs.
          </p>
          <div className="flex gap-4">
            <Button size="lg" className="px-8 rounded-none">Shop Collection</Button>
            <Button variant="outline" size="lg" className="px-8 rounded-none">View Categories</Button>
          </div>
        </div>
        {/* Yahan tum apni image laga sakte ho jo right side pe float karegi */}
      </div>
    </section>
  );
}
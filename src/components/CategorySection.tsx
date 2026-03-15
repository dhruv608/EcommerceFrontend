"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag } from "lucide-react";

interface Category {
  id: number;
  name: string;
  description: string;
}

// ✅ Images
const categoryImages: Record<number, string> = {
  1: "https://res.cloudinary.com/dgovkmpvf/image/upload/v1769754998/products/ngjkexekulkbonagrdgk.jpg", // MEN
  2: "https://res.cloudinary.com/dgovkmpvf/image/upload/v1769756142/products/pq44rua4d52ydxgspc9c.jpg", // WOMEN
  7: "https://res.cloudinary.com/dgovkmpvf/image/upload/v1769966155/products/ti5b1neagsamwjgavwqp.png"
};

// ✅ Per-category image styles (REAL FIX)
const imageStyles: Record<number, string> = {
  1: "object-cover object-[50%_65%]", // MEN → image thodi niche
  2: "object-cover object-[50%_70%]",
  7: "object-contain object-center p-6", // WOMEN → image thodi upar
};

export default function CategorySection({ categories }: { categories: Category[] }) {

  return (
    <section className="section-premium bg-gradient-to-br from-background via-secondary/10 to-background">
      <div className="container-premium">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 lg:mb-16 space-y-4 lg:space-y-0">
          <div className="space-y-3">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Collections</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
              Shop by Category
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
              Explore our curated collections and discover the perfect pieces for your style
            </p>
          </div>

          <Link
            href="/categories"
            className="group inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-105"
          >
            View All Categories 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Cards */}
        {/* Mobile: Horizontal scroll slider */}
        <div className="md:hidden flex gap-4 overflow-x-auto px-4 pb-2">
          {categories.map((cat, index) => {
            const bgImage = categoryImages[cat.id];
            const imageClass = imageStyles[cat.id] ?? "object-cover object-center";

            return (
              <Link
                key={cat.id}
                href={`/products?categoryId=${cat.id}`}
                className="group relative min-w-[140px] h-36 overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 active:scale-95"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {bgImage ? (
                  <>
                    <Image
                      src={bgImage}
                      alt={cat.name}
                      fill
                      className={`${imageClass} w-full h-full object-cover object-center`}
                      sizes="140px"
                    />
                    
                    {/* Enhanced Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Bottom-aligned Category Title */}
                    <div className="absolute inset-0 flex items-end justify-start p-3">
                      <h3 className="text-white font-bold text-sm tracking-wide uppercase">
                        {cat.name}
                      </h3>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl">
                    <span className="text-2xl font-bold text-primary">
                      {cat.name}
                    </span>
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop: Original grid layout */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, index) => {
            const bgImage = categoryImages[cat.id];
            const imageClass = imageStyles[cat.id] ?? "object-cover object-center";

            return (
              <Link
                key={cat.id}
                href={`/products?categoryId=${cat.id}`}
                className="group relative w-full h-[420px] overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {bgImage ? (
                  <>
                    <Image
                      src={bgImage}
                      alt={cat.name}
                      fill
                      className={`${imageClass} w-full h-full object-cover object-center`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                    <span className="text-4xl font-bold text-primary">
                      {cat.name}
                    </span>
                  </div>
                )}


                {/* Content - Different layout for mobile vs desktop */}
                {/* Mobile: Removed - handled in separate mobile section above */}
                
                {/* Desktop: Bottom overlay with title and subtitle */}
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold uppercase tracking-wider">
                      {cat.name}
                    </h3>
                    <p className="text-sm opacity-90 line-clamp-1">
                      {cat.description}
                    </p>
                    {/* Shop Now Button */}
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-bold rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                        Shop Now
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/50 transition-all duration-300" />
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
       {/* Bottom CTA */}
<div className="mt-6 md:mt-16 text-center px-4 md:px-6 py-4 md:py-16">
  <div className="flex justify-center md:inline-flex flex-col sm:flex-row items-center gap-4 md:p-8 rounded-none md:rounded-2xl border-0 md:border border-gray-200 shadow-none md:shadow-md bg-transparent md:bg-white md:bg-gradient-to-r md:from-primary/10 md:to-secondary/10">

    {/* Desktop text only */}
    <div className="text-left space-y-4 hidden md:block">
      <h3 className="text-3xl font-semibold">
        Can't find what you're looking for?
      </h3>
      <p className="text-base text-gray-600 mt-2">
        Browse our full collection of premium products
      </p>
    </div>

    <Link
      href="/products"
      className="px-6 py-3 rounded-full bg-[#ACAC49] text-white font-medium shadow-sm hover:opacity-90 inline-flex items-center justify-center transition-all duration-300"
    >
      Browse All Products
    </Link>

  </div>
</div>
      </div>
    </section>
  );
}

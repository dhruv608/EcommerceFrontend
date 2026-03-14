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
            <h2 className="text-4xl lg:text-5xl font-black text-foreground tracking-tight">
              Shop by Category
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat, index) => {
            const bgImage = categoryImages[cat.id];
            const imageClass = imageStyles[cat.id] ?? "object-cover object-center";

            return (
              <Link
                key={cat.id}
                href={`/products?categoryId=${cat.id}`}
                className="group relative w-full aspect-[3/4] lg:aspect-[4/5] overflow-hidden rounded-3xl bg-muted shadow-premium hover:shadow-premium-xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {bgImage ? (
                  <>
                    <Image
                      src={bgImage}
                      alt={cat.name}
                      fill
                      className={`${imageClass} transition-all duration-700 group-hover:scale-110`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                    <span className="text-4xl font-bold text-primary">
                      {cat.name}
                    </span>
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-6 left-6">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-background/90 backdrop-blur-md border border-border">
                    <ShoppingBag className="w-4 h-4 mr-2 text-primary" />
                    <span className="text-xs font-bold text-foreground">New Arrivals</span>
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <div className="space-y-3">
                    <h3 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-wider">
                      {cat.name}
                    </h3>
                    
                    <p className="text-white/80 text-sm line-clamp-2">
                      {cat.description}
                    </p>

                    {/* Shop Now Button */}
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <span className="inline-flex items-center gap-1 px-4 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                        Shop Now
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/50 transition-all duration-300" />
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl border border-primary/20">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Can't find what you're looking for?
              </h3>
              <p className="text-muted-foreground">
                Browse our full collection of premium products
              </p>
            </div>
            <Link href="/products" className="btn-primary px-6 py-3 rounded-full">
              Browse All Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

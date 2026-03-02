"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Shop by Category
            </h2>
            <p className="text-gray-500 mt-1">
              Explore our latest collections
            </p>
          </div>

          <Link
            href="/categories"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 flex items-center gap-1"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const bgImage = categoryImages[cat.id];
            const imageClass = imageStyles[cat.id] ?? "object-cover object-center";

            return (
              <Link
                key={cat.id}
              href={`/products?categoryId=${cat.id}`}
                className="group relative w-full aspect-3/4 overflow-hidden rounded-2xl bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {bgImage ? (
                  <Image
                    src={bgImage}
                    alt={cat.name}
                    fill
                    className={`${imageClass} transition-transform duration-700 group-hover:scale-105`}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                    <span className="text-4xl font-bold text-gray-400">
                      {cat.name}
                    </span>
                  </div>
                )}

                {/* Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                {/* Text */}
                <div className="absolute bottom-0 left-0 p-6 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-2">
                    {cat.name}
                  </h3>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-sm font-medium border-b border-white">
                      Shop Now
                    </span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

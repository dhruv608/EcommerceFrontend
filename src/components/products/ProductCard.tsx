"use client";

import Link from "next/link";
import Image from "next/image";
import { ProductContent } from "@/lib/types";
import { ShoppingBag, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: ProductContent;
  priority?: boolean; // ✅ New Prop: LCP fix karne ke liye
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  // Safe Image Logic
  const mainImage = product.images?.[0] || "/placeholder.jpg";
  const hoverImage = product.images?.[1];

  return (
    <Link 
      href={`/products/${product.id}`} 
      className="group relative block h-full"
    >
      {/* --- IMAGE SECTION --- */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-100 mb-3 border border-gray-100">
        
        {/* Main Image */}
        <Image
          src={mainImage}
          alt={product.name}
          fill
          // ✅ FIX 1: LCP Warning (Jo priority true hogi wo jaldi load hogi)
          priority={priority} 
          // ✅ FIX 2: Sizes Warning (Mobile: 50vw, Tablet: 33vw, Desktop: 25vw)
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className={`object-cover transition-all duration-700 ease-in-out ${
            hoverImage ? "group-hover:opacity-0" : "group-hover:scale-110"
          }`}
        />

        {/* Hover Image */}
        {hoverImage && (
          <Image
            src={hoverImage}
            alt={product.name}
            fill
            // Hover image ko priority ki zarurat nahi, par sizes chahiye
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="absolute inset-0 object-cover opacity-0 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-105"
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {product.isFeatured && (
            <Badge variant="secondary" className="bg-white/90 text-black font-bold backdrop-blur-sm shadow-sm hover:bg-white">
              FEATURED
            </Badge>
          )}
          {!product.isActive && (
            <Badge variant="destructive" className="font-bold shadow-sm">
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Quick Add Button */}
        <div className="absolute bottom-3 left-3 right-3 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
          <Button className="w-full bg-black/90 hover:bg-black text-white shadow-lg backdrop-blur-md gap-2 h-10 rounded-lg">
            <ShoppingBag className="w-4 h-4" />
            Quick View
          </Button>
        </div>
      </div>

      {/* --- DETAILS SECTION --- */}
      <div className="space-y-1 px-1">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
          {product.category?.name || "Collection"}
        </p>
        <h3 className="font-bold text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-1">
          <span className="text-lg font-black text-gray-900">
            ₹{product.price.toLocaleString()}
          </span>
          <div className="flex items-center gap-1 text-xs font-bold text-gray-500">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            4.8
          </div>
        </div>
      </div>
    </Link>
  );
}
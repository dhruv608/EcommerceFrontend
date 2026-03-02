"use client";

import { useState } from "react";
import { ProductContent } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, ShoppingCart, Heart, Truck, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function UserProductInfo({ product }: { product: ProductContent }) {
  const [quantity, setQuantity] = useState(1);
  

  // --- Logic ---
  const increaseQty = () => setQuantity((prev) => (prev < product.stock ? prev + 1 : prev));
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    // Yahan Cart Context ya API call aayega
    console.log("Adding to cart:", product.name, quantity);
    toast(
    
      `description: ${product.name} (x${quantity}) added!`,
    );
  };

  // Fake Discount Calculation (Sirf show off ke liye)
  const originalPrice = product.price * 1.25; 

  return (
    <div className="flex flex-col gap-6">
      
      {/* 1. Header Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
           <Badge variant="outline" className="uppercase tracking-widest text-xs font-bold border-black/20">
             {product.category?.name || "Collection"}
           </Badge>
           
           {/* Stock Status */}
           {product.stock > 0 ? (
             <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-full">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/> In Stock
             </span>
           ) : (
             <Badge variant="destructive">Out of Stock</Badge>
           )}
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight">
          {product.name}
        </h1>

        {/* Price Block */}
        <div className="flex items-end gap-3 mt-4">
          <span className="text-4xl font-bold text-gray-900">
            ₹{product.price.toLocaleString()}
          </span>
          <span className="text-lg text-gray-400 line-through mb-1 font-medium">
            ₹{originalPrice.toFixed(0)}
          </span>
          <span className="mb-2 bg-black text-white text-xs font-bold px-2 py-1 rounded">
            20% OFF
          </span>
        </div>
      </div>

      <Separator />

      {/* 2. Description */}
      <div className="prose prose-sm text-gray-600 leading-relaxed">
        <p>{product.description}</p>
      </div>

      {/* 3. Selectors & Actions */}
      <div className="space-y-6">
        
        {/* Quantity */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-gray-900">Quantity</span>
          <div className="flex items-center border border-gray-300 rounded-lg bg-white">
            <Button onClick={decreaseQty} className="p-3 hover:bg-gray-100 disabled:opacity-50 transition" disabled={quantity <= 1}>
              <Minus className="w-4 h-4" />
            </Button>
            <span className="w-12 text-center font-bold">{quantity}</span>
            <Button onClick={increaseQty} className="p-3 hover:bg-gray-100 disabled:opacity-50 transition" disabled={quantity >= product.stock}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            size="lg" 
            className="flex-1 h-14 text-base font-bold bg-black hover:bg-gray-800 shadow-xl transition-all hover:-translate-y-1"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="mr-2 w-5 h-5" />
            {product.stock > 0 ? "Add to Cart" : "Sold Out"}
          </Button>
          
          <Button size="icon" variant="outline" className="h-14 w-14 border-2 hover:bg-gray-50 hover:text-red-500 transition-colors">
            <Heart className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* 4. Trust Badges (Design element) */}
      <div className="grid grid-cols-2 gap-4 pt-4">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
          <div className="p-2 bg-white rounded-full shadow-sm">
            <Truck className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-900">Free Delivery</span>
            <span className="text-[10px] text-gray-500">Orders over ₹999</span>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
          <div className="p-2 bg-white rounded-full shadow-sm">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-900">Secure Payment</span>
            <span className="text-[10px] text-gray-500">100% Protected</span>
          </div>
        </div>
      </div>

    </div>
  );
}
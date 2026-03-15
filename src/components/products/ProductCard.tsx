"use client";

import Link from "next/link";
import Image from "next/image";
import { ProductContent } from "@/lib/types";
import { ShoppingBag, Plus, Loader2, Minus, Trash2, ShoppingCart, LogIn } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { toast } from "sonner";

interface ProductCardProps {
  product: ProductContent;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addToCart, updateQuantity, removeFromCart, loading, cartItems } = useCart();
  const { isLoggedIn, user } = useAuth();
  const [addingToCart, setAddingToCart] = useState(false);
  
  // Check if product is in cart and get its quantity
  const cartItem = cartItems.find(item => item.productId === product.id);
  const isInCart = !!cartItem;
  const currentQuantity = cartItem?.quantity || 0;
  
  // Safe Image Logic
  const mainImage = product.images?.[0] || "/placeholder.jpg";
  const hoverImage = product.images?.[1];

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.stock === 0) {
      toast.error("This product is out of stock");
      return;
    }

    // Check authentication before adding to cart
    if (!isLoggedIn || !user) {
      toast.warning("Please sign in to add items to your cart", {
        icon: <LogIn className="w-4 h-4" />,
      });
      return;
    }

    try {
      setAddingToCart(true);
      await addToCart(product.id, 1);
      toast.success("Item added to cart", {
        icon: <ShoppingCart className="w-4 h-4" />,
      });
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Failed to add item to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  const handleQuantityChange = async (e: React.MouseEvent, newQuantity: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (newQuantity <= 0) {
      await removeFromCart(product.id);
      toast.success("Removed from cart");
      setTimeout(() => {
        // Cart will refresh and isInCart will update automatically
      }, 100);
    } else {
      await updateQuantity(product.id, newQuantity);
    }
  };

  return (
    <Link 
      href={`/products/${product.id}`} 
      className="group relative block h-full animate-fade-in"
    >
      <div className="card-premium h-full">
        {/* --- IMAGE SECTION --- */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-lg sm:rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5">
          
          {/* Main Image */}
          <Image
            src={mainImage}
            alt={product.name}
            fill
            priority={priority} 
            sizes="(max-width: 640px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className={`object-cover w-full h-full transition-all duration-700 ease-in-out ${
              hoverImage ? "group-hover:opacity-0" : "group-hover:scale-105"
            }`}
          />

          {/* Hover Image */}
          {hoverImage && (
            <Image
              src={hoverImage}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="absolute inset-0 object-cover w-full h-full opacity-0 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-105"
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {product.isFeatured && (
              <Badge className="bg-[#acac49]/10 text-[#acac49] px-2 py-1 text-xs font-medium rounded-full">
                FEATURED
              </Badge>
            )}
            {product.isActive && product.stock === 0 && (
              <Badge className="badge-danger px-2 py-1 text-xs font-medium rounded-full">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Add to Cart Button / Quantity Selector */}
          <div className="absolute bottom-3 left-3 right-3 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-20 hidden sm:flex">
            {isInCart ? (
              // Amazon-style Quantity Selector
              <div className="bg-background/95 backdrop-blur-md border border-border rounded-xl shadow-premium-xl">
                <div className="flex items-center justify-between p-3">
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-primary/10 rounded-lg transition-colors"
                      onClick={(e) => handleQuantityChange(e, currentQuantity - 1)}
                      disabled={loading || currentQuantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center text-sm font-bold text-foreground">{currentQuantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-primary/10 rounded-lg transition-colors"
                      onClick={(e) => handleQuantityChange(e, currentQuantity + 1)}
                      disabled={loading}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Price and Remove */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-primary">
                      ₹{((cartItem?.subtotal || (product.price || 0) * (currentQuantity || 1))).toLocaleString()}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromCart(product.id);
                      }}
                      disabled={loading}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              // Add to Cart Button
              <Button 
                onClick={handleAddToCart}
                disabled={product.stock === 0 || addingToCart || loading}
                className="btn-primary w-full h-12 rounded-xl font-bold text-sm shadow-premium-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addingToCart ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* --- DETAILS SECTION --- */}
        <div className="p-4 sm:p-4 space-y-3 sm:space-y-3">
          {/* Mobile: Category + Stock Row */}
          <div className="flex items-center justify-between sm:hidden">
            <Badge className="bg-[#acac49]/10 text-[#acac49] px-2 py-1 text-xs font-medium rounded-full">
              {product.category?.name || "Collection"}
            </Badge>
            
            {product.stock > 0 ? (
              <Badge className="bg-green-100 text-green-700 px-2 py-1 text-xs font-medium rounded-full">
                In Stock
              </Badge>
            ) : (
              <Badge className="bg-red-100 text-red-700 px-2 py-1 text-xs font-medium rounded-full">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Desktop: Category Badge Only */}
          <div className="hidden sm:flex items-center justify-between">
            <Badge className="bg-[#acac49]/10 text-[#acac49] px-2 py-1 text-xs font-medium rounded-full">
              {product.category?.name || "Collection"}
            </Badge>
          </div>
          
          <h3 className="font-medium text-sm md:text-base text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm md:text-base font-semibold text-primary">
              ₹{product.price.toLocaleString()}
            </span>
            {product.price && (
              <span className="text-xs md:text-sm text-muted-foreground line-through">
                ₹{Math.floor(product.price * 1.3).toLocaleString()}
              </span>
            )}
          </div>

          {/* Mobile Add to Cart Button */}
          <div className="sm:hidden mt-4">
            {isInCart ? (
              // Mobile Quantity Selector
              <div className="bg-background/95 backdrop-blur-md border border-border rounded-lg shadow-sm">
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-primary/10 rounded-lg transition-colors"
                      onClick={(e) => handleQuantityChange(e, currentQuantity - 1)}
                      disabled={loading || currentQuantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center text-sm font-bold text-foreground">{currentQuantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-primary/10 rounded-lg transition-colors"
                      onClick={(e) => handleQuantityChange(e, currentQuantity + 1)}
                      disabled={loading}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-primary">
                      ₹{((cartItem?.subtotal || (product.price || 0) * (currentQuantity || 1))).toLocaleString()}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromCart(product.id);
                      }}
                      disabled={loading}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              // Mobile Add to Cart Button
              <Button 
                onClick={handleAddToCart}
                disabled={product.stock === 0 || addingToCart || loading}
                className="bg-[#acac49] hover:bg-[#96963f] text-white rounded-lg w-full py-3 text-sm font-medium flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addingToCart ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
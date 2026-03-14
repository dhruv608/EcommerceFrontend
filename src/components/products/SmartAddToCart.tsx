"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Minus, Plus, ShoppingBag, Loader2, ShoppingCart, LogIn } from "lucide-react";
import { toast } from "sonner";

interface SmartAddToCartProps {
  productId: number;
  productName: string;
  productPrice: number;
  productImage?: string;
  className?: string;
  disabled?: boolean;
}

export default function SmartAddToCart({ 
  productId, 
  productName, 
  productPrice, 
  productImage,
  className = "",
  disabled = false 
}: SmartAddToCartProps) {
  const { addToCart, updateQuantity, removeFromCart, loading, cartItems } = useCart();
  const { isLoggedIn, user } = useAuth();
  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  // Check if product is in cart and sync quantity
  useEffect(() => {
    const cartItem = cartItems.find(item => item.productId === productId);
    setIsInCart(!!cartItem);
    setQuantity(cartItem?.quantity || 1);
  }, [cartItems, productId]);

  const handleAddToCart = async () => {
    if (disabled || isAdding) return;

    // Check authentication before adding to cart
    if (!isLoggedIn || !user) {
      toast.warning("Please sign in to add items to your cart", {
        icon: <LogIn className="w-4 h-4" />,
      });
      return;
    }

    try {
      setIsAdding(true);
      await addToCart(productId, 1);
      setIsInCart(true);
      setQuantity(1);
      toast.success("Item added to cart", {
        icon: <ShoppingCart className="w-4 h-4" />,
      });
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Failed to add item to cart");
    } finally {
      setIsAdding(false);
    }
  };

  const handleQuantityChange = async (newQuantity: number) => {
    if (loading || disabled) return;

    try {
      if (newQuantity <= 0) {
        await removeFromCart(productId);
        setIsInCart(false);
        setQuantity(1);
        toast.success(`${productName} removed from cart`);
      } else {
        await updateQuantity(productId, newQuantity);
        setQuantity(newQuantity);
      }
    } catch (error) {
      console.error("Failed to update quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

  const handleIncrease = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    handleQuantityChange(newQty);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      handleQuantityChange(newQty);
    } else {
      handleQuantityChange(0); // This will remove the item
    }
  };

  return (
    <div className={`relative ${className}`}>
      {isInCart ? (
        // Quantity Control Bar - appropriate width
        <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-out w-fit">
          {/* Decrease Button */}
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0 hover:bg-gray-100 rounded-none transition-all duration-200"
            onClick={handleDecrease}
            disabled={loading || disabled}
          >
            <Minus className="h-4 w-4" />
          </Button>
          
          {/* Quantity Display */}
          <div className="w-16 flex items-center justify-center bg-gray-50">
            <span className="font-bold text-lg">{quantity}</span>
          </div>
          
          {/* Increase Button */}
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0 hover:bg-gray-100 rounded-none transition-all duration-200"
            onClick={handleIncrease}
            disabled={loading || disabled}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        // Add to Cart Button - appropriate width
        <Button
          onClick={handleAddToCart}
          disabled={disabled || isAdding}
          className="bg-[#acac49] hover:bg-[#96963f] text-white shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed w-fit px-6 py-3 font-medium flex items-center gap-2 rounded-lg"
          size="lg"
        >
          {isAdding ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
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
  );
}

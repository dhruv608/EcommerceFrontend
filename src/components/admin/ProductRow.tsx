"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { ProductContent } from "@/lib/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DeleteProductDialog } from "./DeleteProducDialog";
import Link from "next/link";
import { useState } from "react";
import api from "@/lib/api";
import ToggleSwitch from "./ToggleSwitch";
import {
  Table,
  TableRow,
  TableCell,
} from "@/components/ui/table";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function ProductRow({ product }: { product: ProductContent }) {
  const router = useRouter();
  const slug = slugify(product.name);

  const [isFeatured, setIsFeatured] = useState(product.isFeatured);
  const [isActive, setIsActive] = useState(product.isActive);

  const handleToggleFeatured = async () => {
    // Don't allow featuring if product is not active
    if (!isActive && !isFeatured) {
      toast.error("Product must be active to be featured");
      return;
    }
    
    const newFeaturedState = !isFeatured;
    setIsFeatured(newFeaturedState);
    try {
      await api.patch(`/products/${product.id}`, { isFeatured: newFeaturedState });
      toast.success("Featured status updated");
    } catch {
      setIsFeatured(!newFeaturedState);
      toast.error("Failed to update featured status");
    }
  };

  const handleToggleActive = async () => {
    const newActiveState = !isActive;
    setIsActive(newActiveState);
    
    // If deactivating, also uncheck featured
    if (!newActiveState && isFeatured) {
      setIsFeatured(false);
      
      try {
        // Update both isActive and isFeatured in one call
        await api.patch(`/products/${product.id}`, {
          isActive: newActiveState,
          isFeatured: false,
        });
        toast.success("Product deactivated and removed from featured");
      } catch {
        setIsActive(!newActiveState);
        setIsFeatured(true);
        toast.error("Failed to update status");
      }
      return;
    }

    try {
      await api.patch(`/products/${product.id}`, { isActive: newActiveState });
      toast.success("Status updated");
    } catch {
      setIsActive(!newActiveState);
      toast.error("Failed to update status");
    }
  };

  const goToProduct = () => {
    router.push(`/admin/products/${slug}?pid=${product.id}`);
  };

  const getStockText = (stock: number) => {
    if (stock === 0) return "Out of Stock";
    return stock.toString();
  };

  return (
    <TableRow 
      className="hover:bg-gray-50 cursor-pointer transition"
      onClick={goToProduct}
    >
      {/* Product Cell */}
      <TableCell className="px-4 py-5 align-middle">
        <div className="flex items-center gap-3">
          <Image
            src={product.images?.[0] || "/placeholder.png"}
            alt={product.name}
            width={48}
            height={48}
            className="w-12 h-12 rounded-md object-cover flex-shrink-0"
          />
          <div className="flex flex-col gap-1 min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900 truncate max-w-[220px]">{product.name}</p>
            <p className="text-xs text-gray-500 truncate line-clamp-1 max-w-[320px]">
              {product.description || "No description"}
            </p>
          </div>
        </div>
      </TableCell>

      {/* Category Cell */}
      <TableCell className="px-4 py-5 align-middle">
        <Badge className="bg-[#acac49]/10 text-[#acac49] px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap">
          {product.category?.name || "Uncategorized"}
        </Badge>
      </TableCell>

      {/* Price Cell */}
      <TableCell className="w-[90px] px-4 py-5 align-middle">
        <div className="text-sm font-medium whitespace-nowrap">₹{product.price}</div>
      </TableCell>

      {/* Stock Cell */}
      <TableCell className="w-[90px] px-4 py-5 align-middle">
        <div className="text-sm text-gray-600 whitespace-nowrap">
          {getStockText(product.stock)}
        </div>
      </TableCell>

      {/* Gallery Cell */}
      <TableCell className="hidden md:table-cell px-4 py-5 align-middle">
        <div className="flex items-center gap-2">
          {product.images.slice(0, 3).map((img, i) => (
            <div key={i} className="relative group">
              <Image
                src={img}
                alt="gallery"
                width={32}
                height={32}
                className="w-8 h-8 rounded-md object-cover group-hover:scale-105 transition-transform duration-150"
              />
            </div>
          ))}
          {product.images.length > 3 && (
            <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center text-xs text-gray-500 group-hover:scale-105 transition-transform duration-150">
              +{product.images.length - 3}
            </div>
          )}
        </div>
      </TableCell>

      {/* Status Cell */}
      <TableCell className="hidden md:table-cell px-4 py-5 align-middle">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Featured</span>
            <div className="relative">
              <ToggleSwitch
                checked={isFeatured}
                onChange={() => {}} // Empty onChange since we handle onClick
                onClick={handleToggleFeatured}
                disabled={!isActive}
              />
              {!isActive && (
                <div 
                  className="absolute inset-0 bg-gray-100/50 rounded-full cursor-not-allowed"
                  title="Product must be active to be featured"
                />
              )}
            </div>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Active</span>
            <ToggleSwitch
              checked={isActive}
              onChange={() => {}} // Empty onChange since we handle onClick
              onClick={handleToggleActive}
            />
          </div>
        </div>
      </TableCell>

      {/* Actions Cell */}
      <TableCell className="px-4 py-5 align-middle">
        <div className="flex items-center gap-3">
          <Link href={`/admin/products/editProduct/${product.id}`}>
            <div 
              className="p-1.5 rounded hover:bg-gray-100 transition-colors duration-150 cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              <Pencil className="w-4 h-4 text-gray-500 hover:text-[#acac49]" />
            </div>
          </Link>
          <div onClick={(e) => e.stopPropagation()}>
            <DeleteProductDialog
              productId={product.id}
              productName={product.name}
            />
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}

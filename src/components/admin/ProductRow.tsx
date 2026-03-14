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

  const handleToggleFeatured = async (checked: boolean) => {
    setIsFeatured(checked);
    try {
      await api.patch(`/products/${product.id}`, { isFeatured: checked });
      toast.success("Featured status updated");
    } catch {
      setIsFeatured(!checked);
      toast.error("Failed to update featured status");
    }
  };

  const handleToggleActive = async (checked: boolean) => {
    setIsActive(checked);
    try {
      await api.patch(`/products/${product.id}`, { isActive: checked });
      toast.success("Status updated");
    } catch {
      setIsActive(!checked);
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
            <ToggleSwitch
              checked={isFeatured}
              onChange={handleToggleFeatured}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Active</span>
            <ToggleSwitch
              checked={isActive}
              onChange={handleToggleActive}
              onClick={(e) => e.stopPropagation()}
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

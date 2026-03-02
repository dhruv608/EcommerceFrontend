"use client";

import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Product, ProductContent } from "@/lib/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DeleteProductDialog } from "./DeleteProducDialog";
import Link from "next/link";
import { useState } from "react";
import api from "@/lib/api";
import ToggleActiveButton from "./ToggleActiveButton";
import ToggleFeaturedButton from "./ToggleFeaturedButton";

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

  const goToProduct = () => {
    router.push(`/admin/products/${slug}?pid=${product.id}`);
  };




  return (
    <tr
      className="cursor-pointer hover:bg-gray-50 border-b  last:border-0"
      onClick={goToProduct}
    >
      {/* Product */}
      <td className="p-4 w-90">
        <div className="flex items-center gap-3">
          <Image
            src={product.images?.[0] || "/placeholder.png"}
            alt={product.name}
            width={40}
            height={40}
            className="rounded-md border"
          />
          <div>
            <p className="font-medium">{product.name}</p>
            <p className="text-xs text-gray-500 truncate max-w-50">
              {product.description}
            </p>
          </div>
        </div>
      </td>

      {/* Category */}
      <td className="p-4 text-sm">{product.category?.name}</td>

      {/* Price */}
      <td className="p-4 text-sm font-medium">₹{product.price}</td>

      {/* Stock */}
      <td className="p-4 text-sm">
        <span
          className={
            product.stock < 10 ? "text-orange-500 font-medium" : ""
          }
        >
          {product.stock}
        </span>
      </td>

      {/* Gallery */}
      <td className="p-4">
        
        <div className="flex items-center gap-1">
          
          {product.images.slice(0, 3).map((img, i) => (
            <Image
              key={i}
              src={img}
              alt="gallery"
              width={28}
              height={28}
              className="rounded border"
            />
          ))}

          {product.images.length > 3 && (
            <span className="text-xs text-gray-500">
              +{product.images.length - 3}
            </span>
          )}
        </div>
      </td>

      {/* Featured */}
      <td className="p-4">
        <ToggleFeaturedButton
          id={product.id}
          isFeatured={isFeatured}
          setIsFeatured={setIsFeatured}
        />
      </td>

      {/* Active */}
      <td className="p-4">
        <ToggleActiveButton
          id={product.id}
          isActive={isActive}
          setIsActive={setIsActive}
        />
      </td>

      {/* Actions */}
      <td className="p-4">
        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          <Link href={`/admin/products/editProduct/${product.id}`}>
            <Button size="icon" variant="ghost">
              <Pencil size={16} />
            </Button>
          </Link>

          <DeleteProductDialog
            productId={product.id}
            productName={product.name}
          />
        </div>
      </td>
    </tr>
  );
}

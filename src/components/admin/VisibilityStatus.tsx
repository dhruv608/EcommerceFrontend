"use client";

import { useState } from "react";
import api from "@/lib/api";
import { toast } from "sonner";
import { Product, ProductContent } from "@/lib/types";
import ToggleSwitch from "./ToggleSwitch";

interface VisibilityStatusProps {
  product: ProductContent;
}

export default function VisibilityStatus({ product }: VisibilityStatusProps) {
  const [isActive, setIsActive] = useState(product.isActive);
  const [isFeatured, setIsFeatured] = useState(product.isFeatured);

  async function toggleActive(val: boolean) {
    setIsActive(val); // optimistic update

    try {
      await api.patch(`/products/${product.id}`, {
        isActive: val,
      });
      toast.success("Active status updated");
    } catch {
      setIsActive(!val); // rollback
      toast.error("Failed to update active status");
    }
  }

  async function toggleFeatured(val: boolean) {
    setIsFeatured(val);

    try {
      await api.patch(`/products/${product.id}`, {
        isFeatured: val,
      });
      toast.success("Featured status updated");
    } catch {
      setIsFeatured(!val);
      toast.error("Failed to update featured status");
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
      <h2 className="font-medium">Visibility Status</h2>

      {/* Active */}
      <div className="flex items-center justify-between py-2">
        <span className="text-sm font-medium text-gray-700">Active Status</span>
        <ToggleSwitch
          checked={isActive}
          onChange={toggleActive}
        />
      </div>

      {/* Featured */}
      <div className="flex items-center justify-between py-2">
        <span className="text-sm font-medium text-gray-700">Featured Product</span>
        <ToggleSwitch
          checked={isFeatured}
          onChange={toggleFeatured}
        />
      </div>

      {/* Badges */}
      <div className="flex gap-2">
        {isActive && (
          <span className="px-3 py-1 text-xs bg-emerald-100 text-emerald-700 rounded">
            Published
          </span>
        )}
        {isFeatured && (
          <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded">
            Featured
          </span>
        )}
      </div>
    </div>
  );
}

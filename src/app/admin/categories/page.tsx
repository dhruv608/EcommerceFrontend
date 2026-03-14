"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Plus, Edit, Trash2, Package, Shirt, Home, Smartphone, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

import AddCategoryDialog from "@/components/admin/category/AddCategoryDialog";
import EditCategoryDialog from "@/components/admin/category/EditCategoryDialog";
import DeleteCategoryDialog from "@/components/admin/category/DeleteCategoryDialog";

export type Category = {
  id: number;
  name: string;
  description: string;
  productCount: number;
  createdAt: string;
  updatedAt: string;
};

// Category icon mapping
const CATEGORY_ICONS: { [key: string]: React.ReactNode } = {
  default: <Package className="h-5 w-5" />,
  mens: <Shirt className="h-5 w-5" />,
  womens: <Shirt className="h-5 w-5" />,
  electronics: <Smartphone className="h-5 w-5" />,
  home: <Home className="h-5 w-5" />,
  bags: <ShoppingBag className="h-5 w-5" />,
};

const getCategoryIcon = (categoryName: string) => {
  const lowerName = categoryName.toLowerCase();
  for (const [key, icon] of Object.entries(CATEGORY_ICONS)) {
    if (lowerName.includes(key)) return icon;
  }
  return CATEGORY_ICONS.default;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchCategories() {
    try {
      setLoading(true);
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch {
      console.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Categories</h1>
              <p className="text-gray-500">Manage product categories</p>
            </div>
            <AddCategoryDialog onSuccess={fetchCategories} />
          </div>
        </div>

        {/* Categories Table */}
        <div className="bg-white rounded-xl border border-[#eeeeee] overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="bg-[#f8f8ef] px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center font-semibold text-[#444] text-sm">
              <div>Category</div>
              <div className="hidden md:block">Description</div>
              <div className="text-center">Products</div>
              <div className="text-right">Actions</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {loading && (
              <div className="px-6 py-12 text-center text-gray-500">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-[#acac49] mx-auto mb-4"></div>
                Loading categories...
              </div>
            )}

            {!loading && categories.length === 0 && (
              <div className="px-6 py-16 text-center">
                <div className="w-20 h-20 bg-[#e5e5ce] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="h-10 w-10 text-[#6c6c2e]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No categories created yet</h3>
                <p className="text-gray-500 mb-6">Start by creating your first product category</p>
                <AddCategoryDialog onSuccess={fetchCategories} />
              </div>
            )}

            {categories.map((category) => (
              <div 
                key={category.id}
                className="px-6 py-4 hover:bg-[#fafaf3] transition-colors duration-150 cursor-pointer"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  {/* Category Name with Icon */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#e5e5ce] rounded-lg flex items-center justify-center text-[#6c6c2e]">
                      {getCategoryIcon(category.name)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{category.name}</div>
                      <div className="text-sm text-gray-500 md:hidden">
                        {category.description || "No description"}
                      </div>
                    </div>
                  </div>

                  {/* Description - Hidden on mobile */}
                  <div className="hidden md:block">
                    <div className="text-sm text-gray-500">
                      {category.description || "No description"}
                    </div>
                  </div>

                  {/* Products Count */}
                  <div className="flex justify-center">
                    <Badge 
                      className="bg-[#e5e5ce] text-[#5a5a2b] px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {category.productCount} products
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-2">
                    <EditCategoryDialog
                      category={category}
                      onSuccess={fetchCategories}
                    />
                    <DeleteCategoryDialog
                      categoryId={category.id}
                      categoryName={category.name}
                      onSuccess={fetchCategories}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

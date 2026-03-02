"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

import AddCategoryDialog from "@/components/admin/category/AddCategoryDialog";
import EditCategoryDialog from "@/components/admin/category/EditCategoryDialog";
import DeleteCategoryDialog from "@/components/admin/category/DeleteCategoryDialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { format } from "date-fns";

export type Category = {
  id: number;
  name: string;
  description: string;
  productCount: number;
  createdAt: string;
  updatedAt: string;
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Categories</h1>
          <p className="text-sm text-muted-foreground">
            Manage product categories
          </p>
        </div>

        <AddCategoryDialog onSuccess={fetchCategories} />
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-center">Products</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            )}

            {!loading && categories.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No categories found
                </TableCell>
              </TableRow>
            )}

            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">
                  {category.name}
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {category.description || "-"}
                </TableCell>

                <TableCell className="text-center font-medium">
                  {category.productCount}
                </TableCell>

                <TableCell>
                  {format(new Date(category.createdAt), "dd MMM yyyy")}
                </TableCell>

                <TableCell>
                  {format(new Date(category.updatedAt), "dd MMM yyyy")}
                </TableCell>

                <TableCell className="text-right flex justify-end gap-2">
                  <EditCategoryDialog
                    category={category}
                    onSuccess={fetchCategories}
                  />

                  <DeleteCategoryDialog
                    categoryId={category.id}
                    categoryName={category.name}
                    onSuccess={fetchCategories}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import api from "@/lib/api";
import { Product, ProductForm } from "@/lib/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import DeleteImageDialog from "./DeleteImageDialog";
import Link from "next/link";



/* ---------------- COMPONENT ---------------- */
export default function EditProductForm({
  product,
}: {
  product: Product;
}) {
  const router = useRouter();

  /* -------- FORM STATE -------- */
  const [form, setForm] = useState<ProductForm>({
    name: product.name,
    description: product.description,
    price: String(product.price),
    stock: String(product.stock),
    categoryId: String(product.category.id),
    isActive: product.isActive,
    isFeatured: product.isFeatured,
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* -------- HANDLERS -------- */

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }


  /* -------- UPDATE PRODUCT -------- */
  async function handleUpdate() {
    if (isSubmitting) return;

    const price = Number(form.price);
    const stock = Number(form.stock);

    if (!form.name || !form.categoryId) {
      toast.error("Required fields missing");
      return;
    }

    if (isNaN(price) || isNaN(stock)) {
      toast.error("Price & stock must be numbers");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        name: form.name,
        description: form.description,
        price,
        stock,
        isActive: form.isActive,
        isFeatured: form.isFeatured,
        category: {
          id: Number(form.categoryId),
        },
      };

      const formData = new FormData();
      formData.append("product", JSON.stringify(payload));

      newImages.forEach((img) => {
        formData.append("images", img);
      });

      await api.put(`/products/${product.id}`, formData);

      toast.success("Product updated successfully");
      router.push("/admin/products");
    } catch {
      toast.error("Update failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        {/* LEFT : Title + Breadcrumb */}
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Edit Product</h1>

          <div className="text-sm text-gray-500 flex items-center gap-1">
            <Link
              href="/admin/products"
              className="hover:text-emerald-600 transition"
            >
              Products
            </Link>

          

            <span>/</span>

            <span className="font-medium text-gray-900 truncate max-w-60">
              {product.name}
            </span>
            
          </div>
        </div>

        {/* RIGHT : Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push("/admin/products")}
          >
            Cancel
          </Button>

          <Button
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={handleUpdate}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>


      <div className="grid grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="col-span-2 space-y-8">

          {/* GENERAL INFO */}
          <div className="bg-white border rounded-lg p-6 space-y-5">
           

            {/* Product Name */}
            <div className="space-y-1">
              <label className="text-sm font-medium">
                Product Name 
              </label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-sm font-medium">
                Product Description
              </label>
              <Textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Write product description..."
              />
            </div>

            {/* Price & Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">
                  Price 
                </label>
                <Input
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="₹ Price"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">
                  Stock 
                </label>
                <Input
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="Available stock"
                  required
                />
              </div>
            </div>
          </div>

          {/* IMAGES */}
          <div className="bg-white border rounded-lg p-6 space-y-4">

            <h2 className="font-medium">Product Images</h2>

            {/* Existing Images */}
            <div className="grid grid-cols-4 gap-3">

              {product.images.map((img) => (
                <div
                  key={img}
                  className="relative h-28 border rounded overflow-hidden"
                >
                  <Image
                    src={img}
                    alt="product"
                    fill
                    sizes="200px"
                    className="object-contain"
                  />

                  <DeleteImageDialog
                    productId={product.id}
                    imageUrl={img}
                    onSuccess={() => router.refresh()}
                  />

                </div>
              ))}

            </div>

            {/* Add New Images */}

            <Input
              type="file"
              multiple
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files) {
                  setNewImages(Array.from(e.target.files));
                }
              }}
            />

            {newImages.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {newImages.map((img, index) => (
                  <div
                    key={index}
                    className="relative border rounded-lg overflow-hidden"
                  >
                    <img
                      src={URL.createObjectURL(img)}
                      alt="preview"
                      className="h-full w-full object-cover"
                    />

                    {/*  Remove button */}
                    <button
                      type="button"
                      onClick={() => {
                        setNewImages(prev =>
                          prev.filter((_, i) => i !== index)
                        );
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs hover:bg-black"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-8">

          {/* CATEGORY */}
          <div className="bg-white border rounded-lg p-6 space-y-4">
            <h2 className="font-medium">Category</h2>

            <Select
              value={form.categoryId}
              onValueChange={(val) =>
                setForm((p) => ({ ...p, categoryId: val }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Men</SelectItem>
                <SelectItem value="2">Women</SelectItem>
                <SelectItem value="3">Kids</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* STATUS */}
          <div className="bg-white border rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span>Active</span>
              <Switch
                checked={form.isActive}
                onCheckedChange={(v) =>
                  setForm((p) => ({ ...p, isActive: v }))
                }
              />
            </div>

            <div className="flex justify-between items-center">
              <span>Featured</span>
              <Switch
                checked={form.isFeatured}
                onCheckedChange={(v) =>
                  setForm((p) => ({ ...p, isFeatured: v }))
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import api from "@/lib/api";
import { SingleProduct, ProductForm, Category } from "@/lib/types";
import { getCategories } from "@/lib/getCategories";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import DeleteImageDialog from "./DeleteImageDialog";
import Link from "next/link";
import ToggleSwitch from "./ToggleSwitch";



/* ---------------- COMPONENT ---------------- */
export default function EditProductForm({
  product,
}: {
  product: SingleProduct;
}) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

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

  // Auto-uncheck featured when product is deactivated
  const handleActiveChange = (isActive: boolean) => {
    const newForm = { ...form, isActive };
    // If deactivating, also uncheck featured
    if (!isActive) {
      newForm.isFeatured = false;
    }
    setForm(newForm);
  };

  // Prevent featuring if product is not active
  const handleFeaturedChange = (isFeatured: boolean) => {
    if (isFeatured && !form.isActive) {
      toast.error("Product must be active to be featured");
      return;
    }
    setForm({ ...form, isFeatured });
  };
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* -------- FETCH CATEGORIES -------- */
  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        toast.error("Failed to load categories");
      }
    }

    fetchCategories();
  }, []);

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
    <div className="max-w-7xl mx-auto px-6 py-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        {/* LEFT : Title + Breadcrumb */}
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Edit Product</h1>

          <div className="text-sm text-gray-500 flex items-center gap-1">
            <Link
              href="/admin/products"
              className="hover:text-[#acac49] transition"
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
            className="bg-[#acac49] hover:bg-[#96963f] text-white rounded-md px-4 py-2 font-medium shadow-sm transition"
            onClick={handleUpdate}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="col-span-2 space-y-4">

          {/* GENERAL INFO */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
            {/* Product Name */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-900">
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
              <label className="text-sm font-medium text-gray-900">
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
                <label className="text-sm font-medium text-gray-900">
                  Price 
                </label>
                <Input
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="₹ Price"
                  required
                  className="h-10 px-3 rounded-md border"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-900">
                  Stock 
                </label>
                <Input
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="Available stock"
                  required
                  className="h-10 px-3 rounded-md border"
                />
              </div>
            </div>
          </div>

          {/* IMAGES */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
            <h2 className="font-medium text-gray-900">Product Images</h2>

            {/* Existing Images */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img) => (
                <div
                  key={img}
                  className="relative w-full h-24 rounded-md border overflow-hidden"
                >
                  <Image
                    src={img}
                    alt="product"
                    fill
                    sizes="200px"
                    className="object-cover"
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
                    className="relative w-full h-24 rounded-md border overflow-hidden"
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
        <div className="col-span-1 space-y-4">
          {/* CATEGORY */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
            <h2 className="font-medium text-gray-900">Category</h2>

            <Select
              value={form.categoryId}
              onValueChange={(val) =>
                setForm((p) => ({ ...p, categoryId: val }))
              }
            >
              <SelectTrigger className="w-full h-10 px-3 border rounded-md bg-white text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={String(category.id)}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* STATUS */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
            <h2 className="font-medium text-gray-900">Visibility Status</h2>
            
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium text-gray-700">Active Product</span>
              <ToggleSwitch
                checked={form.isActive}
                onChange={handleActiveChange}
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium text-gray-700">Featured Product</span>
              <div className="relative">
                <ToggleSwitch
                  checked={form.isFeatured}
                  onChange={handleFeaturedChange}
                  disabled={!form.isActive}
                />
                {!form.isActive && (
                  <div 
                    className="absolute inset-0 bg-gray-100/50 rounded-full cursor-not-allowed"
                    title="Product must be active to be featured"
                  />
                )}
              </div>
            </div>
            
            {!form.isActive && form.isFeatured && (
              <div className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg p-2">
                ⚠️ Inactive products cannot be featured. The featured status will be automatically removed when you save.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

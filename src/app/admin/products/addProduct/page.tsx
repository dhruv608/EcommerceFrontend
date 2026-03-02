"use client";
import { toast } from "sonner"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Spinner } from "@/components/ui/spinner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Category, ProductForm } from "@/lib/types";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { getCategories } from "@/lib/getCategories";


const initialProduct: ProductForm = {
  name: "",
  description: "",
  price: "",
  stock: "",
  categoryId: "",
  isActive: true,
  isFeatured: false,
};

export default function AddProductPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  const router = useRouter();
  const [product, setProduct] = useState<ProductForm>(initialProduct);
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit() {
    if (isSubmitting) return;
    const price = Number(product.price);
    const stock = Number(product.stock);

    if (!product.name || !product.categoryId) {
      toast.error("Please fill required fields");
      return;
    }

    if (isNaN(price) || isNaN(stock)) {
      toast.error("Price & stock must be numbers");
      return;
    }
    try {
      setIsSubmitting(true)
      const payload = {
        name: product.name,
        description: product.description,
        price: Number(product.price),
        stock: Number(product.stock),
        isActive: product.isActive,
        isFeatured: product.isFeatured,
        category: {
          id: Number(product.categoryId),
        },
      }
      const formData = new FormData();
      formData.append("product", JSON.stringify(payload));

      images.forEach((img) => {
        formData.append("images", img);
      });
      await api.post("/products", formData);
      toast.success("Product created successfully");

      router.push("/admin/products");
    } catch (error) {
      toast.error("Failed to add product")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Add New Product</h1>
        <div className="flex gap-2">
          <Link href={"/admin/products"}>
            <Button variant="outline">Discard</Button>
          </Link>
          <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : ""}
            {isSubmitting ? "Adding Product..." : "Save Product"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="col-span-2 space-y-6">
          {/* General Info */}
          <div className="bg-white p-6 rounded-lg border space-y-4">
            <h2 className="font-medium">General Information</h2>

            <Input placeholder="Product Name"
              value={product.name}
              name="name"
              required
              onChange={handleChange}
            />

            <Textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Product description"
              rows={4}
            />
          </div>


          {/* Media */}
          <div className="bg-white p-6 rounded-lg border space-y-4">
            <h2 className="font-medium">Media</h2>

            <div className="border-2 border-dashed rounded-lg p-6 text-center text-sm text-gray-500">
              Click to upload or drag & drop
              <br />
              PNG, JPG up to 4 images
            </div>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) {
                  setImages(Array.from(e.target.files));
                }
              }}
            />
            {/* Preview Grid */}
            {images.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, index) => (
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
                        setImages(prev =>
                          prev.filter((_, i) => i !== index)
                        );
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

          {/* Pricing */}
          <div className="bg-white p-6 rounded-lg border space-y-4">
            <h2 className="font-medium">Pricing</h2>

            <Input type="text" placeholder="Price (₹)" value={product.price} name="price" onChange={handleChange} />
          </div>

        </div>


        {/* RIGHT SIDE */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-white p-6 rounded-lg border space-y-4">
            <h2 className="font-medium">Status</h2>

            <div className="flex items-center justify-between">
              <span>Active</span>
              <Switch defaultChecked
                checked={product.isActive}
                onCheckedChange={(val) =>
                  setProduct(prev => ({ ...prev, isActive: val }))

                }
              />
            </div>

            <div className="flex items-center justify-between">
              <span>Featured</span>
              <Switch
                checked={product.isFeatured}
                onCheckedChange={(val) =>
                  setProduct(prev => ({ ...prev, isFeatured: val }))
                }
              />
            </div>
          </div>

          {/* Organization */}
          <div className="bg-white p-6 rounded-lg border space-y-4">

            <Select
              onValueChange={(val) =>
                setProduct(prev => ({ ...prev, categoryId: val }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>

                {categories.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={String(category.id)}
                  >
                    {category.name}
                  </SelectItem>
                ))}

              </SelectContent>
            </Select>

            <Input type="number" placeholder="Stock" value={product.stock} name="stock" onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
}

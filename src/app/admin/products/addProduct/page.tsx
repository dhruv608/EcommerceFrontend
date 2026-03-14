"use client";
import { toast } from "sonner"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner"
import ToggleSwitch from "@/components/admin/ToggleSwitch";
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

  // Auto-uncheck featured when product is deactivated
  const handleActiveChange = (isActive: boolean) => {
    const newProduct = { ...product, isActive };
    // If deactivating, also uncheck featured
    if (!isActive) {
      newProduct.isFeatured = false;
    }
    setProduct(newProduct);
  };

  // Prevent featuring if product is not active
  const handleFeaturedChange = (isFeatured: boolean) => {
    if (isFeatured && !product.isActive) {
      toast.error("Product must be active to be featured");
      return;
    }
    setProduct({ ...product, isFeatured });
  };

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
    <div className="px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Add New Product</h1>
        <div className="flex gap-2">
          <Link href={"/admin/products"}>
            <Button variant="outline" className="border border-gray-300 hover:bg-gray-100 rounded-lg px-5 py-2">Discard</Button>
          </Link>
          <Button className="bg-[#ACAC49] hover:bg-[#9a9a42] text-white rounded-lg px-5 py-2" onClick={handleSubmit}
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
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="font-medium">General Information</h2>

            <Input placeholder="Product Name"
              value={product.name}
              name="name"
              required
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#ACAC49] focus:border-[#ACAC49]"
            />

            <Textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Product description"
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#ACAC49] focus:border-[#ACAC49]"
            />
          </div>


          {/* Media */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="font-medium">Media</h2>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-sm text-gray-500 hover:border-[#ACAC49] transition-colors">
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
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#ACAC49] focus:border-[#ACAC49]"
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
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="font-medium">Pricing</h2>

            <Input type="text" placeholder="Price (₹)" value={product.price} name="price" onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#ACAC49] focus:border-[#ACAC49]" />
          </div>

        </div>


        {/* RIGHT SIDE */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="font-medium">Status</h2>

            <div className="flex items-center justify-between py-2">
              <span>Active</span>
              <ToggleSwitch
                checked={product.isActive}
                onChange={handleActiveChange}
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <span>Featured</span>
              <div className="relative">
                <ToggleSwitch
                  checked={product.isFeatured}
                  onChange={handleFeaturedChange}
                  disabled={!product.isActive}
                />
                {!product.isActive && (
                  <div 
                    className="absolute inset-0 bg-gray-100/50 rounded-full cursor-not-allowed"
                    title="Product must be active to be featured"
                  />
                )}
              </div>
            </div>
            
            {!product.isActive && product.isFeatured && (
              <div className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg p-2">
                ⚠️ Inactive products cannot be featured. The featured status will be automatically removed when you save.
              </div>
            )}
          </div>

          {/* Organization */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="font-medium">Category / Stock</h2>

            <div className="space-y-4">
              <div>
                <Select
                  onValueChange={(val) =>
                    setProduct(prev => ({ ...prev, categoryId: val }))
                  }
                >
                  <SelectTrigger className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-[#ACAC49] focus:border-[#ACAC49]">
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
              </div>

              <Input 
                type="number" 
                placeholder="Stock" 
                value={product.stock} 
                name="stock" 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#ACAC49] focus:border-[#ACAC49]" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

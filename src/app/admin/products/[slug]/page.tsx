import { DeleteProductDialog } from "@/components/admin/DeleteProducDialog";
import InventoryPricing from "@/components/admin/InventoryPricing";
import Metadata from "@/components/admin/Metadata";
import ProductGallery from "@/components/admin/ProductGallery";
import ProductInfo from "@/components/admin/ProductInfo";
import VisibilityStatus from "@/components/admin/VisibilityStatus";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ pid?: string; }>;
}

export default async function ProductDetailPage({
  searchParams,
}: PageProps) {
  // 🔥 IMPORTANT FIX
  const { pid } = await searchParams;

  if (!pid) {
    return <div>Product not found</div>;
  }

  const res = await api.get(`/products/${pid}`);
  const product = res.data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Product Details</h1>
          <p className="text-sm text-gray-500">
            <Link href={"/admin/products"}>  Products</Link>

            / {product.name}
          </p>
        </div>

        <div className="flex gap-2">
          <div className="mx-4">

            <DeleteProductDialog
              productId={product.id}
              productName={product.name}
              redirectAfter
            />
          </div>
          <Link href={`/admin/products/editProduct/${product.id}`}>
            <Button className="px-4 py-2 bg-emerald-600 text-white rounded">
              Edit Product

            </Button>
          </Link>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="col-span-2 space-y-6">
          <ProductGallery images={product.images} />
          <ProductInfo product={product} />
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <InventoryPricing product={product} />
          <VisibilityStatus product={product} />
          <Metadata product={product} />
        </div>
      </div>
    </div>

  );
}

import api from "@/lib/api";
import EditProductForm from "@/components/admin/EditProductForm";
import { SingleProduct } from "@/lib/types";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage({ params }: PageProps) {

  const { id } = await params;

  try {
    const res = await api.get(`/products/${id}`);
    const product: SingleProduct = res.data;

    return <EditProductForm product={product} />;
  } catch (error) {
    console.error("Failed to fetch product", error);
    return <div>Failed to load product</div>;
  }
}

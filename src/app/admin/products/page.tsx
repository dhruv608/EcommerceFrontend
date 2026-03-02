// app/admin/products/page.tsx
import ProductsClient from "./ProductsClient";
import api from "@/lib/api";
import { Product } from "@/lib/types";

export default async function ProductsPage() {
  const res = await api.get<Product>("/products");
  const data = res.data;
  
  return (
    <ProductsClient initialData={data} />
  );
}

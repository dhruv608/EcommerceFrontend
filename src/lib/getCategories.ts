import api from "@/lib/api";

export async function getCategories() {
  const res = await api.get("/categories");
  return res.data;
}

import api from "@/lib/api";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import CategorySection from "@/components/CategorySection";
import FeaturedSection from "@/components/FeaturedSection";

async function getFeaturedProducts() {
  const res = await api.get("/products", {
    params: { isFeatured: true, size: 5 },
  });

  return res.data?.content || [];
}
async function getAllFeaturedProducts() {
  const res = await api.get("/products", {
    params: { isFeatured: true},
  });

  return res.data?.content || [];
}
async function getCategories() {
  const res = await api.get("/categories?activeOnly=true");
  return res.data || [];
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  const categories = await getCategories();
  const allFeaturedProducts = await getAllFeaturedProducts();
  return (
    <main className="min-h-screen bg-white pb-10">
      
      {/* Featured Carousel */}
      <section className="w-full">
        {featuredProducts.length > 0 && (
          <FeaturedCarousel products={featuredProducts} />
        )}
      </section>

      {/* Shop by Category */}
      <CategorySection categories={categories} />

      <FeaturedSection allFeaturedProducts= {allFeaturedProducts} />

    </main>
  );
}

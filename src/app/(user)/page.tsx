import api from '@/lib/api'
import { FeaturedCarousel } from '@/components/FeaturedCarousel'
import CategorySection from '@/components/CategorySection'
import FeaturedSection from '@/components/FeaturedSection'
import { generateMetadata, generateStructuredData } from '@/lib/seo'
import { StructuredData } from '@/components/StructuredData'
import { Metadata } from 'next'

async function getFeaturedProducts() {
  const res = await api.get('/products', {
    params: { isFeatured: true, size: 5 },
  })

  return res.data?.content || []
}
async function getAllFeaturedProducts() {
  const res = await api.get('/products', {
    params: { isFeatured: true },
  })

  return res.data?.content || []
}
async function getCategories() {
  const res = await api.get('/categories?activeOnly=true')
  return res.data || []
}

export async function generateHomePageMetadata(): Promise<Metadata> {
  const categories = await getCategories()
  const featuredProducts = await getFeaturedProducts()

  const categoryNames = categories.map((cat: any) => cat.name).join(', ')
  const productCount = featuredProducts.length

  return generateMetadata({
    title: 'Light Store - Premium Fashion & Style',
    description: `Discover premium clothing and fashion at Light Store. Shop from ${categories.length} categories including ${categoryNames}. ${productCount} featured products available.`,
    keywords: [
      'fashion',
      'clothing',
      'premium',
      'style',
      'ecommerce',
      ...categories.map((cat: any) => cat.name.toLowerCase()),
    ],
    type: 'website',
    url: 'https://lightstore.vercel.app',
  })
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts()
  const categories = await getCategories()
  const allFeaturedProducts = await getAllFeaturedProducts()

  // Generate structured data
  const structuredData = generateStructuredData({
    type: 'website',
    title: 'Light Store - Premium Fashion & Style',
    description: `Discover premium clothing and fashion at Light Store. Shop from ${categories.length} categories including ${categories.map((cat: any) => cat.name).join(', ')}.`,
    url: 'https://lightstore.vercel.app',
    breadcrumbs: [{ name: 'Home', url: 'https://lightstore.vercel.app' }],
  })

  return (
    <>
      <StructuredData data={structuredData} />
      <main className="min-h-screen bg-white pb-10">
        {/* Featured Carousel */}
        <section className="w-full">
          {featuredProducts.length > 0 && <FeaturedCarousel products={featuredProducts} />}
        </section>

        {/* Shop by Category */}
        <CategorySection categories={categories} />

        <FeaturedSection allFeaturedProducts={allFeaturedProducts} />
      </main>
    </>
  )
}

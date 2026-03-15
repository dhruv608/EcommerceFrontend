import api from '@/lib/api'
import { ProductGridSkeleton } from '@/components/skeleton'
import { generateMetadata, generateStructuredData } from '@/lib/seo'
import { StructuredData } from '@/components/StructuredData'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react'

// ✅ Images
const categoryImages: Record<number, string> = {
  1: 'https://res.cloudinary.com/dgovkmpvf/image/upload/v1769754998/products/ngjkexekulkbonagrdgk.jpg', // MEN
  2: 'https://res.cloudinary.com/dgovkmpvf/image/upload/v1769756142/products/pq44rua4d52ydxgspc9c.jpg', // WOMEN
  7: 'https://res.cloudinary.com/dgovkmpvf/image/upload/v1769966155/products/ti5b1neagsamwjgavwqp.png',
}

// ✅ Per-category image styles
const imageStyles: Record<number, string> = {
  1: 'object-cover object-[50%_65%]', // MEN → image thodi niche
  2: 'object-cover object-[50%_70%]',
  7: 'object-contain object-center p-6', // WOMEN → image thodi upar
}

interface Category {
  id: number
  name: string
  description: string
}

async function getCategories() {
  const res = await api.get('/categories?activeOnly=true')
  return res.data || []
}

export async function generateCategoriesPageMetadata(): Promise<Metadata> {
  const categories = await getCategories()

  const categoryNames = categories.map((cat: any) => cat.name).join(', ')

  return generateMetadata({
    title: 'All Categories - Light Store',
    description: `Explore all our fashion categories including ${categoryNames}. Find the perfect pieces for your style.`,
    keywords: [
      'categories',
      'fashion',
      'clothing',
      'shop by category',
      'style',
      'ecommerce',
      ...categories.map((cat: any) => cat.name.toLowerCase()),
    ],
    type: 'website',
    url: 'https://lightstore.vercel.app/categories',
  })
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  // Generate structured data
  const structuredData = generateStructuredData({
    type: 'website',
    title: 'All Categories - Light Store',
    description: `Explore all our fashion categories including ${categories.map((cat: any) => cat.name).join(', ')}.`,
    url: 'https://lightstore.vercel.app/categories',
    breadcrumbs: [
      { name: 'Home', url: 'https://lightstore.vercel.app' },
      { name: 'Categories', url: 'https://lightstore.vercel.app/categories' },
    ],
  })

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
        {/* Header */}
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                Collections
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight mb-4">
              All Categories
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our complete collection of fashion categories and find your perfect style
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {categories.map((cat: Category, index: number) => {
              const bgImage = categoryImages[cat.id]
              const imageClass = imageStyles[cat.id] ?? 'object-cover object-center'

              return (
                <Link
                  key={cat.id}
                  href={`/products?categoryId=${cat.id}`}
                  className="group relative w-full h-[420px] overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {bgImage ? (
                    <>
                      <Image
                        src={bgImage}
                        alt={cat.name}
                        fill
                        className={`${imageClass} w-full h-full object-cover object-center`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="eager"
                      />

                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                      <span className="text-4xl font-bold text-primary">{cat.name}</span>
                    </div>
                  )}

                  {/* Content */}
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="space-y-2">
                      <h3 className="text-3xl font-bold uppercase tracking-wider">{cat.name}</h3>
                      <p className="text-sm opacity-90 line-clamp-2">{cat.description}</p>
                      {/* Shop Now Button */}
                      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-bold rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                          Shop Now
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/50 transition-all duration-300" />
                </Link>
              )
            })}
          </div>

          {/* Back to Home */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

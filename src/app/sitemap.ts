import { MetadataRoute } from 'next'
import { getCategories } from '@/lib/getCategories'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://lightstore.vercel.app'

  // Get categories for dynamic URLs
  let categories: any[] = []
  try {
    categories = await getCategories()
  } catch (error) {
    console.error('Failed to fetch categories for sitemap:', error)
  }

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cart`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ]

  // Category pages
  const categoryPages = categories.map(category => ({
    url: `${baseUrl}/products?categoryId=${category.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Combine all pages
  return [...staticPages, ...categoryPages]
}

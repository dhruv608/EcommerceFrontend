import { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'product' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  price?: number
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder'
  rating?: number
  reviewCount?: number
}

export function generateMetadata({
  title = 'Light Store - Premium Fashion & Style',
  description = 'Discover premium clothing and fashion at Light Store. Modern styles, quality materials, and exceptional service for the discerning shopper.',
  keywords = ['fashion', 'clothing', 'premium', 'style', 'ecommerce'],
  image = '/logo.png',
  url = 'https://lightstore.vercel.app',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'Light Store',
}: SEOProps = {}): Metadata {
  const siteName = 'Light Store'
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`

  // Base metadata
  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: author }],
    creator: author,
    publisher: siteName,
    metadataBase: new URL(url),
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: type === 'product' ? 'website' : type,
      locale: 'en_US',
      url,
      title: fullTitle,
      description,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: '@lightstore',
    },
  }

  // Add article specific metadata
  if (type === 'article' && publishedTime) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article' as const,
      publishedTime,
      modifiedTime,
      authors: [author],
    }
  }

  // Add product specific metadata (Note: price/availability are not standard OpenGraph props)
  // These would need custom implementation or different approach

  return metadata
}

// Generate structured data (JSON-LD)
export function generateStructuredData({
  type,
  title,
  description,
  image,
  url,
  price,
  availability,
  rating,
  reviewCount,
  publishedTime,
  author,
  breadcrumbs,
}: SEOProps & {
  breadcrumbs?: { name: string; url: string }[]
}) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type === 'product' ? 'Product' : type === 'article' ? 'Article' : 'WebPage',
    name: title,
    description,
    image,
    url,
    author: {
      '@type': 'Organization',
      name: author || 'Light Store',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Light Store',
      logo: {
        '@type': 'ImageObject',
        url: '/logo.png',
      },
    },
  }

  // Add product-specific fields
  if (type === 'product' && price) {
    Object.assign(baseData, {
      offers: {
        '@type': 'Offer',
        price: price.toString(),
        priceCurrency: 'USD',
        availability: `https://schema.org/${availability || 'InStock'}`,
      },
      aggregateRating:
        rating && reviewCount
          ? {
              '@type': 'AggregateRating',
              ratingValue: rating.toString(),
              reviewCount: reviewCount.toString(),
            }
          : undefined,
    })
  }

  // Add article-specific fields
  if (type === 'article' && publishedTime) {
    Object.assign(baseData, {
      datePublished: publishedTime,
      dateModified: publishedTime,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
    })
  }

  // Add breadcrumbs if provided
  if (breadcrumbs && breadcrumbs.length > 0) {
    const breadcrumbList = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    }
    return [baseData, breadcrumbList]
  }

  return [baseData]
}

import { generateStructuredData } from '@/lib/seo'

interface StructuredDataProps {
  data: ReturnType<typeof generateStructuredData>
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <>
      {data.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item),
          }}
        />
      ))}
    </>
  )
}

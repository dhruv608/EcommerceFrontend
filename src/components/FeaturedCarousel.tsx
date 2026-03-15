'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Autoplay from 'embla-carousel-autoplay'
import { ArrowRight } from 'lucide-react'

// ---- INNER COMPONENT (Slide Logic) ----
function ProductSlideEntry({ product }: { product: any }) {
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0)

  // FIX: Pehle 3 tha, ab 4 kar diya taaki saari photos dikhein
  const thumbnails = product.images.slice(0, 4)

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-12">
      {/* LEFT SIDE: Info */}
      <div className="space-y-4 lg:space-y-8 order-2 lg:order-1 flex flex-col items-start text-left animate-fade-in">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Badge className="badge-premium px-4 py-2 text-xs font-bold uppercase tracking-wider">
              New Collection
            </Badge>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-tight">
              {product.name}
            </h1>
            <p className="text-sm md:text-base text-gray-600 line-clamp-3 max-w-lg font-medium leading-relaxed mt-3">
              {product.description}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl md:text-3xl lg:text-4xl font-black text-primary">
                ₹{product.price}
              </span>
              <span className="text-sm md:text-base text-muted-foreground line-through">
                ₹{Math.floor(product.price * 1.3)}
              </span>
            </div>
            <Badge className="badge-danger px-3 py-1 text-xs font-bold">30% OFF</Badge>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-4 w-full">
          <Link href={`/products/${product.id}`}>
            <Button className="btn-primary px-8 py-3 md:py-4 text-base md:text-lg font-bold rounded-full shadow-premium-xl w-full sm:w-auto">
              Shop Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="/products">
            <Button className="btn-outline px-8 py-3 md:py-4 text-base md:text-lg font-bold rounded-full w-full sm:w-auto">
              Explore Collection
            </Button>
          </Link>
        </div>

        {/* Product Features */}
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold text-primary">Free</div>
            <div className="text-sm text-muted-foreground">Shipping</div>
          </div>
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold text-primary">24/7</div>
            <div className="text-sm text-muted-foreground">Support</div>
          </div>
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold text-primary">30</div>
            <div className="text-sm text-muted-foreground">Days Return</div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Images */}
      <div className="order-1 lg:order-2 flex flex-col items-center gap-4 md:gap-6 w-full max-w-md mx-auto lg:max-w-full">
        {/* Main Image Frame */}
        <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-3xl overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 shadow-premium-xl border border-border">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-50"></div>
          <Image
            src={product.images[selectedImageIndex]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-8 transition-all duration-700 transform hover:scale-105"
            priority
          />

          {/* Floating Badge */}
          <div className="absolute top-6 right-6">
            <Badge className="badge-premium px-3 py-2 text-xs font-bold shadow-premium">
              Limited Stock
            </Badge>
          </div>
        </div>

        {/* Thumbnails */}
        {product.images.length > 1 && (
          <div className="flex items-center justify-center gap-3 p-2 bg-background border border-border rounded-full shadow-premium -translate-y-4">
            {thumbnails.map((img: string, index: number) => (
              <Button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`relative w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                  selectedImageIndex === index
                    ? 'border-primary scale-110 opacity-100 shadow-premium'
                    : 'border-border opacity-60 hover:opacity-100'
                }`}
              >
                <Image src={img} alt="thumb" fill className="object-cover" sizes="240" />
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ---- MAIN COMPONENT ----
export function FeaturedCarousel({ products }: { products: any[] }) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: false }))

  React.useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <section className="w-full bg-gradient-to-br from-background via-secondary/20 to-background py-6 lg:py-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative z-10">
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          className="w-full"
          opts={{ loop: true }}
        >
          <CarouselContent>
            {products.map(product => (
              <CarouselItem key={product.id}>
                <ProductSlideEntry product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Enhanced Navigation */}
        <div className="flex justify-center items-center gap-3 pt-4">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`transition-all duration-500 rounded-full ${
                current === index
                  ? 'w-12 h-2 bg-primary shadow-premium'
                  : 'w-2 h-2 bg-border hover:bg-primary/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

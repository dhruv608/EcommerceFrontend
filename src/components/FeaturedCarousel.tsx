"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Autoplay from "embla-carousel-autoplay"
import { ArrowRight } from "lucide-react"

// ---- INNER COMPONENT (Slide Logic) ----
function ProductSlideEntry({ product }: { product: any }) {
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  
  // FIX: Pehle 3 tha, ab 4 kar diya taaki saari photos dikhein
  const thumbnails = product.images.slice(0, 4); 

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center px-4 py-6 md:py-10">
                  
      {/* LEFT SIDE: Info */}
      <div className="space-y-4 lg:space-y-6 order-2 lg:order-1 flex flex-col items-start text-left">
        <div className="space-y-3">
          <Badge variant="secondary" className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] bg-zinc-100 text-zinc-900 border-0 rounded-sm">
            New Collection
          </Badge>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-zinc-900 leading-[1.1]">
            {product.name}
          </h2>
          <p className="text-sm md:text-base text-zinc-500 line-clamp-3 max-w-md font-medium">
            {product.description}
          </p>
        </div>

        {/* Price & Action */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2 w-full">
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900">₹{product.price}</div>
          <Link href={`/products/${product.id}`}>
            <Button className="rounded-full px-6 md:px-8 h-10 md:h-12 text-sm font-bold bg-zinc-900 text-white hover:bg-zinc-800 hover:scale-105 transition-all shadow-xl">
              Buy Now <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* RIGHT SIDE: Images */}
      <div className="order-1 lg:order-2 flex flex-col items-center gap-4 w-full max-w-md mx-auto lg:max-w-full">
        
        {/* Main Image Frame (Compact Height) */}
        <div className="relative w-full h-75 md:h-112 rounded-[2rem] overflow-hidden bg-zinc-50 shadow-sm border border-zinc-100">
          <Image
            src={product.images[selectedImageIndex]}
            alt={product.name}
            fill
            sizes="240"
            className="object-contain p-2 transition-all duration-500" 
            priority
          />
        </div>

        {/* Thumbnails (Ab 4 tak dikhenge) */}
        {product.images.length > 1 && (
          <div className="flex items-center gap-2 p-1 bg-white border border-zinc-100 rounded-full shadow-sm">
            {thumbnails.map((img: string, index: number) => (
              <Button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                  selectedImageIndex === index 
                    ? "border-zinc-900 scale-110 opacity-100" 
                    : "border-transparent opacity-60 hover:opacity-100 grayscale hover:grayscale-0"
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

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  )

  React.useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <section className="w-full bg-white py-2 relative">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full"
        opts={{ loop: true }}
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id}>
              <ProductSlideEntry product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* DASH NAVIGATION */}
      <div className="flex justify-center items-center gap-2 pb-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`transition-all duration-500 rounded-full ${
              current === index 
                ? "w-8 h-1 bg-zinc-900" 
                : "w-1.5 h-1.5 bg-zinc-300 hover:bg-zinc-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Star, ShoppingBag } from "lucide-react";
import CategorySection from "@/components/CategorySection";

// Mock categories data for About page
const mockCategories = [
  { id: 1, name: "Mens", description: "Stylish menswear collection" },
  { id: 2, name: "Womens", description: "Elegant womens fashion" },
  { id: 7, name: "Bags", description: "Premium bags and accessories" }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Brand Hero Section */}
      <section className="relative py-24 px-6 text-center bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-5xl mx-auto">
          {/* Logo + Brand Name */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-[#ACAC49]/20 rounded-full blur-xl"></div>
              <Image 
                src="/logo.svg" 
                alt="Light Store Logo" 
                width={64}
                height={64}
                className="relative h-16 w-auto transition-transform hover:scale-110"
              />
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight">
              About Light <span className="text-[#ACAC49]">Store</span>
            </h1>
          </div>
          
          {/* Tagline */}
          <p className="text-2xl md:text-3xl text-gray-700 font-semibold mb-6">
            Modern fashion for everyday confidence.
          </p>
          
          {/* Description */}
          <p className="text-gray-600 text-xl max-w-4xl mx-auto leading-relaxed">
            Light Store is your destination for contemporary fashion that combines style, comfort, and quality. 
            We curate collections that empower you to express yourself through clothing that feels as good as it looks.
          </p>
          
          {/* Decorative Elements */}
          <div className="mt-12 flex items-center justify-center gap-8">
            <div className="h-px bg-gradient-to-r from-transparent to-[#ACAC49] w-20"></div>
            <div className="w-2 h-2 bg-[#ACAC49] rounded-full"></div>
            <div className="h-px bg-gradient-to-l from-transparent to-[#ACAC49] w-20"></div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-5 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Side - Story Text */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                  Our Story
                </h2>
                <div className="h-1 w-20 bg-[#ACAC49] rounded-full"></div>
              </div>
              
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Light Store began with a simple vision: to create a space where fashion meets accessibility without compromising on quality or style.
                </p>
                <p>
                  We believe that great clothing should be available to everyone. Our team carefully selects each piece in our collection, 
                  ensuring it meets our standards for comfort, durability, and contemporary design.
                </p>
                <p>
                  From everyday essentials to statement pieces, Light Store is here to make your fashion journey effortless and enjoyable.
                </p>
              </div>
              
              {/* Brand Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-black text-[#ACAC49]">1000+</div>
                  <div className="text-sm text-gray-600 mt-1">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-[#ACAC49]">50+</div>
                  <div className="text-sm text-gray-600 mt-1">Brands</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-[#ACAC49]">24/7</div>
                  <div className="text-sm text-gray-600 mt-1">Support</div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Image */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
                  alt="Fashion boutique interior"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#ACAC49]/10 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-[#ACAC49]" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Premium Quality</div>
                    <div className="text-sm text-gray-600">Guaranteed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 px-5 md:px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
              Why Choose Light Store
            </h2>
            <div className="h-1 w-24 bg-[#ACAC49] rounded-full mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing you with the best shopping experience and products that exceed your expectations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Quality Materials */}
            <div className="group bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 p-8 hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#ACAC49]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#ACAC49]/20 transition-colors">
                <CheckCircle className="w-8 h-8 text-[#ACAC49]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Quality Materials
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                We source premium fabrics and materials to ensure every piece meets the highest standards of comfort and durability.
              </p>
            </div>

            {/* Modern Designs */}
            <div className="group bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 p-8 hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#ACAC49]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#ACAC49]/20 transition-colors">
                <Star className="w-8 h-8 text-[#ACAC49]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Modern Designs
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Our collections feature contemporary styles that keep you on-trend while maintaining timeless appeal for lasting wardrobe value.
              </p>
            </div>

            {/* Comfort First */}
            <div className="group bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 p-8 hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#ACAC49]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#ACAC49]/20 transition-colors">
                <ShoppingBag className="w-8 h-8 text-[#ACAC49]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Comfort First
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Every piece is designed with your comfort in mind, ensuring you look great and feel confident throughout your day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Highlight - Reusing CategorySection */}
      <CategorySection categories={mockCategories} />

      {/* Call To Action */}
      <section className="py-24 px-5 md:px-6 bg-gradient-to-br from-[#ACAC49]/5 to-white">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-12 md:p-16 border border-gray-100">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
              Find Your Style
            </h2>
            <div className="h-1 w-24 bg-[#ACAC49] rounded-full mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Explore our latest collection of stylish clothing designed for everyday life.
              Discover pieces that match your personality and elevate your wardrobe.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-3 bg-[#ACAC49] hover:bg-[#96963f] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Browse All Products
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-3 border-2 border-gray-300 hover:border-[#ACAC49] text-gray-700 hover:text-[#ACAC49] px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
              >
                Learn More
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

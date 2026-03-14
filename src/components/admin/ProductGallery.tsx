"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(images[0]);

  return (
    <div className="bg-white p-6">
      {/* Mobile Layout */}
      <div className="flex flex-col lg:hidden">
        {/* Main Image */}
        <div className="relative w-full h-80 bg-gray-50 rounded-xl p-2 mb-4">
          <Image
            src={active}
            alt="Product image"
            fill
            sizes="100vw"
            className="object-contain rounded-lg"
            priority
          />
        </div>

        {/* Horizontal Thumbnails */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => setActive(img)}
              className={`relative h-20 w-20 rounded-lg overflow-hidden cursor-pointer border-2 transition flex-shrink-0
                ${
                  active === img
                    ? "border-[#acac49]"
                    : "border-gray-200"
                }`}
            >
              <Image
                src={img}
                alt="Product thumbnail"
                fill
                sizes="80px"
                className="object-cover hover:opacity-90 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:grid-cols-[90px_1fr] gap-4">
        {/* LEFT: Thumbnails (vertical) */}
        <div className="flex flex-col gap-3">
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => setActive(img)}
              className={`relative h-20 w-20 rounded-md cursor-pointer border transition
                ${
                  active === img
                    ? "border-[#acac49] ring-2 ring-[#acac49]/20"
                    : "border-gray-200 hover:border-gray-400"
                }`}
            >
              <Image
                src={img}
                alt="Product thumbnail"
                fill
                sizes="60"
                className="object-cover rounded-md"
              />
            </div>
          ))}
        </div>

        {/* RIGHT: Main Image */}
        <div className="relative w-full h-115 bg-gray-50 rounded-xl p-2">
          <Image
            src={active}
            alt="Product image"
            fill
            sizes="60"
            className="object-contain rounded-lg"
            priority
          />
        </div>
      </div>
    </div>
  );
}

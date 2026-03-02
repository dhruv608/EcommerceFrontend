"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(images[0]);

  return (
    <div className="bg-white p-6 rounded border">
      <h2 className="font-medium mb-4">Product Gallery</h2>

      {/* Vertical Layout */}
      <div className="grid grid-cols-[90px_1fr] gap-4">
        
        {/* LEFT: Thumbnails (vertical) */}
        <div className="flex flex-col gap-3">
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => setActive(img)}
              className={`relative h-20 w-20 rounded-md cursor-pointer border transition
                ${
                  active === img
                    ? "border-emerald-500 ring-2 ring-emerald-200"
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
        <div className="relative w-full h-115 bg-gray-100 rounded-lg">
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

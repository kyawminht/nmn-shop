import { useRef, useState } from "react"
import { Search, SlidersHorizontal } from 'lucide-react'
import { ProductCard } from "./product-card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import Imag1 from "../assets/images/1.jfif"
import Imag2 from "../assets/images/2.jfif"
import Imag3 from "../assets/images/3.jfif"
import Imag4 from "../assets/images/7.jfif"
import Imag5 from "../assets/images/5.jfif"
import Imag6 from "../assets/images/9.jfif"
import Imag7 from "../assets/images/8.jfif"
import Imag8 from "../assets/images/10.jfif"
import Imag9 from "../assets/images/11.jfif"
import Imag10 from "../assets/images/12.jfif"
import Imag11 from "../assets/images/13.jfif"
import Imag12 from "../assets/images/14.jfif"
import Imag13 from "../assets/images/15.jfif"
import Imag14 from "../assets/images/16.jfif"
import Imag15 from "../assets/images/17.jfif"
import Imag16 from "../assets/images/18.jfif"
import Imag17 from "../assets/images/19.jfif"

import G1 from "../assets/images/g1 (1).jfif"
import G2 from "../assets/images/g1 (2).jfif"
import G3 from "../assets/images/g1 (3).jfif"
import G4 from "../assets/images/g1 (4).jfif"
import G5 from "../assets/images/g1 (5).jfif"
import G6 from "../assets/images/g1 (6).jfif"
import G7 from "../assets/images/g1 (7).jfif"
import G8 from "../assets/images/g1 (8).jfif"
import G9 from "../assets/images/g1 (9).jfif"
import G10 from "../assets/images/g1 (10).jfif"
import G11 from "../assets/images/g1 (11).jfif"
import G12 from "../assets/images/g1 (12).jfif"
const products = [
  {
    id: 1,
    name: "Summer Dress",
    price: "၂ သောင်း",
    images:[
      Imag1,
      Imag9,
      Imag10,
    ],
    description: "Light and comfortable summer dress, perfect for hot days.",
  },
  {
    id: 2,
    name: "Casual Jeans",
    price: "၂ သောင်း ၅ ထောင်",
     images:[
      Imag2,
      Imag11,
      Imag12,
    ],
    description: "Classic blue jeans with a modern fit.",
  },
  {
    id: 3,
    name: "Graphic T-Shirt",
    price: "၂ သောင်း ၅ ထောင်",
    images:[
      Imag3,
      Imag13,
      Imag14,
    ],
    description: "Cotton t-shirt with unique graphic design.",
  },
  {
    id: 4,
    name: "Floral Blouse",
    price: "၂ သောင်း ၅ ထောင်",
     images:[
      Imag4,
      Imag14,
      Imag15,
    ],
    description: "Elegant floral pattern blouse for any occasion.",
  },
  {
    id: 5,
    name: "Denim Jacket",
    price: "၂ သောင်း ၅ ထောင်",
    images:[
      Imag5,
      Imag16,
      Imag17,
    ],
    description: "Classic denim jacket that never goes out of style.",
  },
  {
    id: 6,
    name: "Denim Jacket",
    price: "၂ သောင်း ၅ ထောင်",
     images:[
      Imag6,
      Imag9,
      Imag14,
    ],
    description: "Classic denim jacket that never goes out of style.",
  },
  {
    id: 7,
    name: "Denim Jacket",
    price: "၂ သောင်း ၅ ထောင်",
    image: Imag7,
    description: "Classic denim jacket that never goes out of style.",
  },
   {
    id: 8,
    name: "Denim Jacket",
    price: "၂၀၀ k",
    image: G1,
    description: "Classic denim jacket that never goes out of style.",
  },
   {
    id: 9,
    name: "Denim Jacket",
    price: "၂၀၀ k",
    image: G2,
    description: "Classic denim jacket that never goes out of style.",
  },
   {
    id: 10,
    name: "Denim Jacket",
    price: "၂၂၀၀ k",
    images:[G3, G11, G12], 
    description: "Classic denim jacket that never goes out of style.",
  },
   {
    id: 11,
    name: "Denim Jacket",
    price: "၂၀၀ k",
    images:[G4, G10],
    description: "Classic denim jacket that never goes out of style.",
  },
   {
    id: 12,
    name: "Denim Jacket",
    price: "၂၀၀ k",
    images: [G5, G8, G9],
    description: "Classic denim jacket that never goes out of style.",
  },

   {
    id: 13,
    name: "Denim Jacket",
    price: "၂၀၀ k",
    images:[
      G6,
      G7,
      G8,
    ],
    description: "Classic denim jacket that never goes out of style.",
  },
]

export function ProductFeed() {
  const feedRef = useRef(null)
  const [showSearch, setShowSearch] = useState(false)

  return (
    <div>
      <div className="sticky top-0 z-10 mb-4 bg-white/80 backdrop-blur-sm rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
            Trending Now
          </h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full bg-white">
              <SlidersHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {showSearch && (
          <div className="py-2 animate-in fade-in slide-in-from-top-4 duration-300">
            <Input
              placeholder="Search products..."
              className="bg-white/90 border-pink-200 focus-visible:ring-pink-500"
            />
          </div>
        )}
      </div>

      <div ref={feedRef} className="space-y-6">
        {products.map((product) => (
          <div key={product.id} className="snap-start animate-in fade-in slide-in-from-bottom-4 duration-300">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}
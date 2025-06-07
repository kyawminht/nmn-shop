import { useState, useRef, useEffect } from "react"
import { Heart, Download, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { useShop } from "../context/ShopContext"
import { FaViber } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa6";

export function ProductCard({ product }) {
  const { addToCart } = useShop()
  const [liked, setLiked] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const imageContainerRef = useRef(null)

  // Handle multiple images - if product has images array, use it, otherwise create array from single image
  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.image || "https://placehold.co/400x500"]

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    }
    if (isRightSwipe && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index) => {
    setCurrentImageIndex(index)
  }

  // Enhanced download function for mobile/Capacitor compatibility
  const handleDownloadImage = async () => {
    try {
      const currentImage = images[currentImageIndex]
      
      // Check if running in Capacitor (mobile app)
      if (window.Capacitor) {
        // For Capacitor apps, use the Capacitor Filesystem plugin
        const { Capacitor } = window
        const { Filesystem, Directory } = await import('@capacitor/filesystem')
        
        try {
          // Fetch the image
          const response = await fetch(currentImage)
          const blob = await response.blob()
          
          // Convert blob to base64
          const reader = new FileReader()
          reader.onload = async () => {
            const base64Data = reader.result.split(',')[1]
            const fileName = `${product.name.replace(/\s+/g, '_')}_${currentImageIndex + 1}.jpg`
            
            try {
              await Filesystem.writeFile({
                path: fileName,
                data: base64Data,
                directory: Directory.Documents,
              })
              
              // Show success message
              if (window.Capacitor.Plugins.Toast) {
                window.Capacitor.Plugins.Toast.show({
                  text: 'Image saved to Documents folder!'
                })
              } else {
                alert('Image saved successfully!')
              }
            } catch (writeError) {
              console.error('Error saving file:', writeError)
              alert('Error saving image. Please try again.')
            }
          }
          reader.readAsDataURL(blob)
        } catch (error) {
          console.error('Error in Capacitor download:', error)
          // Fallback to opening image
          window.open(currentImage, '_blank')
        }
      } else {
        // For web browsers, use traditional download
        const response = await fetch(currentImage)
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `${product.name.replace(/\s+/g, '_')}_${currentImageIndex + 1}.jpg`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error('Error downloading image:', error)
      // Ultimate fallback: open image in new tab
      window.open(images[currentImageIndex], '_blank')
    }
  }

  return (
    <Card className="w-full overflow-hidden border-none shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="relative w-full pt-[125%]">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100/50 to-purple-100/50"></div>
        
        {/* Image Container with Swipe */}
        <div 
          ref={imageContainerRef}
          className="absolute inset-0 overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div 
            className="flex transition-transform duration-300 ease-out h-full"
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <img 
                key={index}
                src={image || "/placeholder.svg"} 
                alt={`${product.name} - Image ${index + 1}`} 
                className="w-full h-full object-cover flex-shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Navigation Arrows (only show if multiple images) */}
        {images.length > 1 && (
          <>
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-1 bg-white/80 rounded-full shadow-md transition-all duration-200 hover:bg-white"
              onClick={prevImage}
              style={{ display: currentImageIndex === 0 ? 'none' : 'block' }}
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-1 bg-white/80 rounded-full shadow-md transition-all duration-200 hover:bg-white"
              onClick={nextImage}
              style={{ display: currentImageIndex === images.length - 1 ? 'none' : 'block' }}
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </>
        )}

        {/* Heart Icon */}
        <button
          className="absolute top-3 right-3 z-10 p-2 bg-white/80 rounded-full shadow-md transition-all duration-200 hover:bg-white hover:scale-110"
          onClick={() => setLiked(!liked)}
        >
          <Heart className={`w-5 h-5 ${liked ? "fill-pink-500 text-pink-500" : "text-gray-400"}`} />
        </button>

        {/* Download/Save Icon */}
        <button
          className="absolute top-16 right-3 z-10 p-2 bg-white/80 rounded-full shadow-md transition-all duration-200 hover:bg-white hover:scale-110"
          onClick={handleDownloadImage}
          title="Save image"
        >
          <Download className="w-5 h-5 text-gray-600 hover:text-pink-500" />
        </button>

        {/* Image Indicators (only show if multiple images) */}
        {images.length > 1 && (
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentImageIndex 
                    ? 'bg-white shadow-md' 
                    : 'bg-white/50'
                }`}
                onClick={() => goToImage(index)}
              />
            ))}
          </div>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute top-3 left-3 z-10 px-2 py-1 bg-black/50 rounded-full">
            <span className="text-white text-xs font-medium">
              {currentImageIndex + 1}/{images.length}
            </span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold leading-tight text-white drop-shadow-sm">{product.name}</h3>
            <span className="px-2 py-1 text-lg font-bold text-white bg-pink-500 rounded-full shadow-md">
              MMK {product.price}
            </span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4 bg-gradient-to-br from-white to-pink-50/30">
        <p className="mb-4 text-sm text-gray-600">{product.description}</p>
        <div className="grid grid-cols-2 gap-2">
          <Button
            className="h-12 text-base font-semibold transition-all duration-300 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 hover:shadow-lg text-white"
            onClick={() => window.open("viber://chat?number=+95677933338")}
          >
            <FaViber className="w-5 h-5 mr-2" />
            Viber
          </Button>
          <Button
            className=" text-white h-12 text-base font-semibold transition-all duration-300 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 hover:shadow-lg"
            onClick={() => window.open("https://t.me/kyawMinHtw")}
          >
            <FaTelegram className="w-5 h-5 mr-2" />
            Telegram
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
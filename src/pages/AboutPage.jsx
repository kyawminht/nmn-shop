import { Card, CardContent } from "../components/ui/card"
import { Heart, ShieldCheck, Truck } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="container px-4 py-4 mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
          About StyleHub
        </h1>
        <p className="text-gray-600">Our story and mission</p>
      </div>

      <div className="relative w-full h-48 mb-6 overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400/70 to-purple-600/70 z-10"></div>
        <img 
          src="https://placehold.co/800x400" 
          alt="StyleHub store" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <h2 className="text-3xl font-bold text-white drop-shadow-md">Fashion For Everyone</h2>
        </div>
      </div>

      <div className="mb-8 space-y-4">
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
          Our Story
        </h2>
        <p className="text-base leading-relaxed">
          StyleHub was founded in 2022 with a simple mission: to make fashion accessible to everyone. We believe that
          everyone deserves to look and feel their best, regardless of budget or location.
        </p>
        <p className="text-base leading-relaxed">
          Our team carefully selects each item in our collection to ensure quality, style, and affordability. We work
          directly with manufacturers to bring you the latest trends without the markup.
        </p>
      </div>

      <div className="grid gap-4 mb-8">
        <Card className="border-none shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-50 to-pink-100 opacity-50"></div>
          <CardContent className="flex items-center gap-4 p-4 relative">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-pink-600">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Fast Delivery</h3>
              <p className="text-gray-500">We deliver to your doorstep within 2-3 business days</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-purple-100 opacity-50"></div>
          <CardContent className="flex items-center gap-4 p-4 relative">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-purple-600">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Quality Guarantee</h3>
              <p className="text-gray-500">All our products are carefully inspected before shipping</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-50 to-purple-50 opacity-50"></div>
          <CardContent className="flex items-center gap-4 p-4 relative">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-purple-600">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Customer Satisfaction</h3>
              <p className="text-gray-500">Your happiness is our priority - easy returns and exchanges</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
          Contact Information
        </h2>
        <Card className="border-none shadow-md overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-purple-50 opacity-50"></div>
          <CardContent className="p-4 relative space-y-2">
            <p className="text-base">
              <strong>Address:</strong> 123 Fashion Street, Style City
            </p>
            <p className="text-base">
              <strong>Phone:</strong> +1 234 567 890
            </p>
            <p className="text-base">
              <strong>Email:</strong> contact@stylehub.com
            </p>
            <p className="text-base">
              <strong>Hours:</strong> Monday-Saturday, 9am-6pm
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
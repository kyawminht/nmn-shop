import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { MessageCircle, Phone, Mail } from 'lucide-react'

// Create a simple Textarea component since we don't have it
function Textarea({ className, ...props }) {
  return (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}

export default function ContactPage() {
  return (
    <div className="container px-4 py-4 mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
          Contact Us
        </h1>
        <p className="text-gray-600">We'd love to hear from you</p>
      </div>

      <div className="grid gap-6">
        <Card className="border-none shadow-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 opacity-50"></div>
          <CardHeader className="pb-2 relative">
            <CardTitle className="text-xl">Send us a message</CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Name</label>
                <Input type="text" placeholder="Enter your name" className="h-12 text-base bg-white/80" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <Input type="tel" placeholder="Enter your phone number" className="h-12 text-base bg-white/80" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea placeholder="How can we help you?" className="min-h-[120px] text-base bg-white/80" />
              </div>
              <Button className="w-full h-12 text-base font-semibold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 border-none">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card className="border-none shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-50 to-pink-100 opacity-50"></div>
            <CardContent className="flex items-center gap-4 p-4 relative">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-pink-600">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-medium">Call Us</h3>
                <p className="text-lg">+1 234 567 890</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-purple-100 opacity-50"></div>
            <CardContent className="flex items-center gap-4 p-4 relative">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-purple-600">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-medium">Email Us</h3>
                <p className="text-lg">contact@stylehub.com</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-50 to-purple-50 opacity-50"></div>
            <CardContent className="flex items-center gap-4 p-4 relative">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-purple-600">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-medium">Chat with Us</h3>
                <div className="flex gap-2 mt-1">
                  <Button variant="outline" className="flex-1 gap-2 bg-white/80">
                    Viber
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2 bg-white/80">
                    Telegram
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
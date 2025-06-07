import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Home, Grid3X3, Phone, Info } from 'lucide-react'

const navItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Categories",
    href: "/categories",
    icon: Grid3X3,
  },
  {
    name: "Contact",
    href: "/contact",
    icon: Phone,
  },
  {
    name: "About",
    href: "/about",
    icon: Info,
  },
]

export function BottomNavigation() {
  const location = useLocation()
  const [pathname, setPathname] = useState(location.pathname)
  
  useEffect(() => {
    setPathname(location.pathname)
  }, [location])

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around w-full h-16 bg-white border-t shadow-lg">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link key={item.name} to={item.href} className="flex flex-col items-center justify-center w-full h-full">
            <div
              className={`flex flex-col items-center justify-center transition-all duration-300 ${
                isActive
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 scale-110"
                  : "text-gray-500 hover:text-pink-500"
              }`}
            >
              <item.icon className={`w-6 h-6 ${isActive ? "stroke-[2.5px]" : ""}`} />
              <span className={`mt-1 text-xs font-medium ${isActive ? "font-bold" : ""}`}>{item.name}</span>
              {isActive && (
                <span className="absolute bottom-0 w-10 h-1 rounded-t-full bg-gradient-to-r from-pink-500 to-purple-600"></span>
              )}
            </div>
          </Link>
        )
      })}
    </div>
  )
}
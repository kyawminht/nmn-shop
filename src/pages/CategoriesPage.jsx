import { Card, CardContent } from "../components/ui/card"
import { Link } from "react-router-dom"

const categories = [
  {
    id: 1,
    name: "Women's Fashion",
    image: "https://placehold.co/200x200",
    count: 42,
    color: "from-pink-400 to-pink-600",
  },
  {
    id: 2,
    name: "Men's Fashion",
    image: "https://placehold.co/200x200",
    count: 36,
    color: "from-blue-400 to-blue-600",
  },
  {
    id: 3,
    name: "Accessories",
    image: "https://placehold.co/200x200",
    count: 28,
    color: "from-purple-400 to-purple-600",
  },
  {
    id: 4,
    name: "Shoes",
    image: "https://placehold.co/200x200",
    count: 24,
    color: "from-amber-400 to-amber-600",
  },
  {
    id: 5,
    name: "Bags",
    image: "https://placehold.co/200x200",
    count: 18,
    color: "from-emerald-400 to-emerald-600",
  },
]

export default function CategoriesPage() {
  return (
    <div className="container px-4 py-4 mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
          Categories
        </h1>
        <p className="text-gray-600">Find what you love</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <Link key={category.id} to={`/categories/${category.id}`}>
            <Card className="overflow-hidden transition-all duration-300 border-none shadow-md hover:shadow-xl hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="relative w-full pt-[100%]">
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80`}></div>
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
                  />
                </div>
                <div className="p-3 text-center">
                  <h3 className="text-lg font-bold">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count} items</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
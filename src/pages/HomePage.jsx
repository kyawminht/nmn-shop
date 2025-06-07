import { ProductFeed } from "../components/product-feed"

export default function HomePage() {
  return (
    <div className="container px-4 py-4 mx-auto mb-[200px]">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
          NMN Fashion Store
        </h1>
        <p className="text-gray-600">Discover the latest trends</p>
      </div>
      <ProductFeed />
    </div>
  )
}
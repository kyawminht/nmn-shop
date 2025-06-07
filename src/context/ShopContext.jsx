import { createContext, useContext, useState } from "react"

const ShopContext = createContext(undefined)

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id)

      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }

      return [...prevCart, { product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0)

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  }

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export function useShop() {
  const context = useContext(ShopContext)
  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider")
  }
  return context
}
"use client"

import { useState } from "react"
import Hero from "./components/hero"
import ProductGrid from "./components/product-grid"
import Catalog from "./components/catalog"
import Checkout from "./components/checkout"
import Navigation from "./components/navigation"
import WhatsAppButton from "./components/whatsapp-button"

export default function App() {
  const [currentView, setCurrentView] = useState("home")
  const [cart, setCart] = useState([])

  const addToCart = (product, customization = null) => {
    setCart((prev) => {
      const itemKey = customization ? `${product.id}-custom` : product.id
      const existing = prev.find((item) => item.id === product.id && item.customization === customization)

      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.customization === customization
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
          customization,
          itemKey,
        },
      ]
    })
  }

  const removeFromCart = (itemKey) => {
    setCart((prev) => prev.filter((item) => item.itemKey !== itemKey))
  }

  const updateQuantity = (itemKey, quantity) => {
    if (quantity === 0) {
      removeFromCart(itemKey)
      return
    }
    setCart((prev) => prev.map((item) => (item.itemKey === itemKey ? { ...item, quantity } : item)))
  }

  const renderView = () => {
    switch (currentView) {
      case "home":
        return (
          <>
            <Hero onViewProducts={() => setCurrentView("catalog")} />
            <ProductGrid onAddToCart={addToCart} />
          </>
        )
      case "catalog":
        return <Catalog onAddToCart={addToCart} />
      case "checkout":
        return <Checkout cart={cart} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#E8D5B7]">
      <Navigation
        currentView={currentView}
        onNavigate={setCurrentView}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
      />
      {renderView()}
      <WhatsAppButton cart={cart} />
    </div>
  )
}

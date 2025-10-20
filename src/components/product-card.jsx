"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { formatPrice } from "../lib/utils"

export default function ProductCard({ product, onAddToCart }) {
  const [showCustomization, setShowCustomization] = useState(false)
  const [customText, setCustomText] = useState("")

  const handleAddToCart = () => {
    if (product.customizable && showCustomization && customText.trim()) {
      onAddToCart(product, customText.trim())
      setCustomText("")
      setShowCustomization(false)
    } else {
      onAddToCart(product, null)
    }
  }

  return (
    <Card className="overflow-hidden bg-[#D4C4A8] border-[#C4B49A] hover:shadow-lg transition-shadow">
      <div className="aspect-square overflow-hidden bg-[#C4B49A]">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg text-[#3D5A3C] mb-2">{product.name}</h3>
        <p className="text-sm text-[#5A7A58] mb-3">{product.description}</p>
        <p className="text-xl font-bold text-[#3D5A3C]">{formatPrice(product.price)}</p>

        {product.customizable && (
          <div className="mt-3">
            <button
              onClick={() => setShowCustomization(!showCustomization)}
              className="text-sm text-[#3D5A3C] underline hover:text-[#2D4A2C]"
            >
              {showCustomization ? "Cancelar personalización" : "Personalizar con grabado (+$800)"}
            </button>

            {showCustomization && (
              <div className="mt-3 space-y-2">
                <Label htmlFor={`custom-${product.id}`} className="text-[#3D5A3C] text-xs">
                  Texto para grabar (máx. 20 caracteres)
                </Label>
                <Input
                  id={`custom-${product.id}`}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value.slice(0, 20))}
                  placeholder="Ej: Juan 2024"
                  maxLength={20}
                  className="bg-[#E8D5B7] border-[#C4B49A] text-[#3D5A3C]"
                />
                <p className="text-xs text-[#5A7A58]">{customText.length}/20 caracteres</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-[#3D5A3C] hover:bg-[#2D4A2C] text-[#E8D5B7]"
          disabled={showCustomization && !customText.trim()}
        >
          Agregar al carrito
        </Button>
      </CardFooter>
    </Card>
  )
}

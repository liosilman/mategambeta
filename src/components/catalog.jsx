"use client"

import { useState } from "react"
import { ALL_PRODUCTS, CATEGORIES } from "../lib/products"
import ProductCard from "./product-card"
import { Button } from "./ui/button"

export default function Catalog({ onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredProducts =
    selectedCategory === "all" ? ALL_PRODUCTS : ALL_PRODUCTS.filter((p) => p.category === selectedCategory)

  return (
    <section className="py-16 bg-[#E8D5B7] min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[#3D5A3C] mb-8 text-center">Catálogo</h1>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <Button
            onClick={() => setSelectedCategory("all")}
            variant={selectedCategory === "all" ? "default" : "outline"}
            className={
              selectedCategory === "all"
                ? "bg-[#3D5A3C] text-[#E8D5B7] hover:bg-[#2D4A2C]"
                : "bg-[#D4C4A8] text-[#3D5A3C] hover:bg-[#C4B49A] border-[#C4B49A]"
            }
          >
            Todos
          </Button>
          {CATEGORIES.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={
                selectedCategory === category.id
                  ? "bg-[#3D5A3C] text-[#E8D5B7] hover:bg-[#2D4A2C]"
                  : "bg-[#D4C4A8] text-[#3D5A3C] hover:bg-[#C4B49A] border-[#C4B49A]"
              }
            >
              {category.name}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  )
}

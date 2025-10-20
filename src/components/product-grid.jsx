import { FEATURED_PRODUCTS } from "../lib/products"
import ProductCard from "./product-card"

export default function ProductGrid({ onAddToCart }) {
  return (
    <section className="py-16 bg-[#E8D5B7]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-[#3D5A3C] mb-12 text-center">Productos destacados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "./ui/button"

export default function Navigation({ currentView, onNavigate, cartCount }) {
  const navItems = [
    { id: "home", label: "Inicio" },
    { id: "catalog", label: "Productos" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-[#3D5A3C] text-[#E8D5B7] shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate("home")}>
            <img src="/logo.png" alt="Mate y Gambeta" className="h-12 w-12 rounded-full" />
            <span className="font-bold text-xl hidden sm:inline">Mate y Gambeta</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`hover:text-[#D4C4A8] transition-colors ${
                  currentView === item.id ? "font-bold border-b-2 border-[#E8D5B7]" : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <Button
            onClick={() => onNavigate("checkout")}
            variant="outline"
            size="sm"
            className="relative bg-[#E8D5B7] text-[#3D5A3C] hover:bg-[#D4C4A8] border-[#C4B49A]"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#3D5A3C] text-[#E8D5B7] text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </nav>
  )
}

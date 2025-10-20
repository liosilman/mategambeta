"use client"

import { Button } from "./ui/button"

export default function Hero({ onViewProducts }) {
  return (
    <section className="relative bg-[#E8D5B7] py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <img src="/logo.png" alt="Mate y Gambeta" className="h-32 w-32 md:h-40 md:w-40" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-[#3D5A3C] leading-tight">Pasión, yerba y potrero</h1>
            <p className="text-lg md:text-xl text-[#5A7A58]">
              Mates artesanales para los verdaderos amantes de la tradición
            </p>
            <Button
              onClick={onViewProducts}
              size="lg"
              className="bg-[#3D5A3C] hover:bg-[#2D4A2C] text-[#E8D5B7] font-bold text-lg px-8 py-6"
            >
              VER PRODUCTOS
            </Button>
          </div>

          <div className="flex items-center justify-center">
            <img
              src="/mate-gourd-with-straw-illustration-vintage-style.jpg"
              alt="Mate y pelota de fútbol"
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

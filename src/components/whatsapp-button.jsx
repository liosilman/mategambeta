"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "./ui/button"
import { formatPrice, calculateItemPrice } from "../lib/utils"

export default function WhatsAppButton({ cart }) {
  const handleWhatsAppClick = () => {
    const phoneNumber = "5491157685990"

    let message = "¡Hola! Quiero hacer un pedido:\n\n"

    if (cart.length > 0) {
      cart.forEach((item) => {
        const itemTotal = calculateItemPrice(item)
        message += `• ${item.name} x${item.quantity}`
        if (item.customization) {
          message += ` (Grabado: "${item.customization}")`
        }
        message += ` - ${formatPrice(itemTotal)}\n`
      })
      const total = cart.reduce((sum, item) => sum + calculateItemPrice(item), 0)
      message += `\nTotal: ${formatPrice(total)}`
    } else {
      message += "Me gustaría consultar sobre sus productos."
    }

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <>
      <Button
        onClick={handleWhatsAppClick}
        size="lg"
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl bg-[#25D366] hover:bg-[#20BA5A] text-white z-50 hover:scale-110 transition-transform duration-200 animate-pulse"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="h-8 w-8" />
      </Button>
      {cart.length > 0 && (
        <div className="fixed bottom-24 right-6 bg-[#3D5A3C] text-[#E8D5B7] px-3 py-1 rounded-full text-sm font-bold shadow-lg z-50">
          {cart.length} {cart.length === 1 ? "producto" : "productos"}
        </div>
      )}
    </>
  )
}

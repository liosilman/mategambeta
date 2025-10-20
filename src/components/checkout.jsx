"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Input } from "./ui/input"
import { Minus, Plus, Trash2, Package, Home, CreditCard } from "lucide-react"
import { formatPrice, calculateItemPrice } from "../lib/utils"

const SHIPPING_COST = 1500

export default function Checkout({ cart, onUpdateQuantity, onRemove }) {
  const [shippingMethod, setShippingMethod] = useState("pickup")
  const [paymentMethod, setPaymentMethod] = useState("mercadopago")
  const [shippingAddress, setShippingAddress] = useState("")

  const subtotal = cart.reduce((sum, item) => sum + calculateItemPrice(item), 0)
  const shippingCost = shippingMethod === "delivery" ? SHIPPING_COST : 0
  const total = subtotal + shippingCost

  const handleCheckout = () => {
    if (shippingMethod === "delivery" && !shippingAddress.trim()) {
      alert("Por favor ingresa tu dirección de envío")
      return
    }

    const phoneNumber = "5491157685990"
    let message = "¡Hola! Quiero confirmar mi pedido:\n\n"

    message += "📦 PRODUCTOS:\n"
    cart.forEach((item) => {
      const itemTotal = calculateItemPrice(item)
      message += `• ${item.name} x${item.quantity}`
      if (item.customization) {
        message += ` (Grabado: "${item.customization}")`
      }
      message += ` - ${formatPrice(itemTotal)}\n`
    })

    message += `\n💰 Subtotal: ${formatPrice(subtotal)}\n`

    message += `\n🚚 ENVÍO: ${shippingMethod === "delivery" ? "Envío a domicilio" : "Retiro en local"}\n`
    if (shippingMethod === "delivery") {
      message += `📍 Dirección: ${shippingAddress}\n`
      message += `Costo de envío: ${formatPrice(shippingCost)}\n`
    } else {
      message += `Sin costo adicional\n`
    }

    message += `\n💳 MÉTODO DE PAGO: ${paymentMethod === "mercadopago" ? "Mercado Pago" : "Efectivo"}\n`
    message += `\n✅ TOTAL: ${formatPrice(total)}`

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  if (cart.length === 0) {
    return (
      <section className="py-16 bg-[#E8D5B7] min-h-screen">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto bg-[#D4C4A8] border-[#C4B49A]">
            <CardContent className="p-12 text-center">
              <h2 className="text-2xl font-bold text-[#3D5A3C] mb-4">Tu carrito está vacío</h2>
              <p className="text-[#5A7A58]">Agrega productos para comenzar tu pedido</p>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-[#E8D5B7] min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[#3D5A3C] mb-8 text-center">Checkout</h1>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Productos en el carrito */}
          <div className="space-y-4">
            {cart.map((item) => (
              <Card key={item.itemKey} className="bg-[#D4C4A8] border-[#C4B49A]">
                <CardContent className="p-4">
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded bg-[#C4B49A]"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-[#3D5A3C]">{item.name}</h3>
                      <p className="text-sm text-[#5A7A58]">{formatPrice(item.price)}</p>
                      {item.customization && (
                        <p className="text-xs text-[#3D5A3C] mt-1 font-medium">
                          Grabado: "{item.customization}" (+{formatPrice(item.customizationPrice)})
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => onUpdateQuantity(item.itemKey, item.quantity - 1)}
                        className="h-8 w-8 bg-[#E8D5B7] border-[#C4B49A] text-[#3D5A3C]"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-bold text-[#3D5A3C]">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => onUpdateQuantity(item.itemKey, item.quantity + 1)}
                        className="h-8 w-8 bg-[#E8D5B7] border-[#C4B49A] text-[#3D5A3C]"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="font-bold text-[#3D5A3C] w-24 text-right">{formatPrice(calculateItemPrice(item))}</p>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onRemove(item.itemKey)}
                      className="text-[#3D5A3C] hover:bg-[#C4B49A]"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-[#D4C4A8] border-[#C4B49A]">
            <CardHeader>
              <CardTitle className="text-[#3D5A3C] flex items-center gap-2">
                <Package className="h-5 w-5" />
                Método de entrega
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                <div className="flex items-center space-x-2 p-3 rounded-lg bg-[#E8D5B7] cursor-pointer">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4 text-[#3D5A3C]" />
                        <span className="font-medium text-[#3D5A3C]">Retiro en local</span>
                      </div>
                      <span className="text-[#3D5A3C] font-bold">Gratis</span>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg bg-[#E8D5B7] cursor-pointer">
                  <RadioGroupItem value="delivery" id="delivery" />
                  <Label htmlFor="delivery" className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-[#3D5A3C]" />
                        <span className="font-medium text-[#3D5A3C]">Envío a domicilio</span>
                      </div>
                      <span className="text-[#3D5A3C] font-bold">{formatPrice(SHIPPING_COST)}</span>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              {shippingMethod === "delivery" && (
                <div className="space-y-2 pt-2">
                  <Label htmlFor="address" className="text-[#3D5A3C]">
                    Dirección de envío
                  </Label>
                  <Input
                    id="address"
                    placeholder="Calle, número, piso, depto, localidad"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="bg-[#E8D5B7] border-[#C4B49A] text-[#3D5A3C]"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-[#D4C4A8] border-[#C4B49A]">
            <CardHeader>
              <CardTitle className="text-[#3D5A3C] flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Método de pago
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 p-3 rounded-lg bg-[#E8D5B7] cursor-pointer">
                  <RadioGroupItem value="mercadopago" id="mercadopago" />
                  <Label htmlFor="mercadopago" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[#3D5A3C]">💳 Mercado Pago</span>
                      <span className="text-xs text-[#5A7A58]">(Tarjeta, débito, crédito)</span>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg bg-[#E8D5B7] cursor-pointer">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="flex-1 cursor-pointer">
                    <span className="font-medium text-[#3D5A3C]">💵 Efectivo</span>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Resumen del pedido */}
          <Card className="bg-[#D4C4A8] border-[#C4B49A]">
            <CardHeader>
              <CardTitle className="text-[#3D5A3C]">Resumen del pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-[#3D5A3C]">
                <span>Subtotal</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#3D5A3C]">
                <span>Envío</span>
                <span className="font-semibold">
                  {shippingMethod === "delivery" ? formatPrice(shippingCost) : "Gratis"}
                </span>
              </div>
              <div className="border-t border-[#C4B49A] pt-3 flex justify-between text-[#3D5A3C]">
                <span className="text-lg font-bold">Total</span>
                <span className="font-bold text-2xl">{formatPrice(total)}</span>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-3">
              <Button
                onClick={handleCheckout}
                className="w-full bg-[#3D5A3C] hover:bg-[#2D4A2C] text-[#E8D5B7] font-bold text-lg py-6"
              >
                Confirmar pedido por WhatsApp
              </Button>
              <p className="text-xs text-center text-[#5A7A58]">Serás redirigido a WhatsApp para confirmar tu pedido</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

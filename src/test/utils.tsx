import React from 'react'
import { CartContext } from '../context/CartContext'
import { VisitorContext } from '../context/VisitorContext'
import { VisitorProvider } from '../context/VisitorContext'
import { CartProvider } from '../context/CartContext'

export const withProviders = (children: React.ReactNode) => {
  return (
    <CartProvider>
      <VisitorProvider>{children}</VisitorProvider>
    </CartProvider>
  )
}
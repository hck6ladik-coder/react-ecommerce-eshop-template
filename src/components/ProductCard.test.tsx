import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import { ProductCard } from './ProductCard'
import { CartProvider } from '../context/CartContext'
import { ComparisonProvider } from '../context/ComparisonContext'
import { WishlistProvider } from '../context/WishlistContext'
import { VisitorProvider } from '../context/VisitorContext'
import type { Product } from '../types'

const product: Product = {
  id: 'test-product',
  name: 'Test product',
  category: 'mobily',
  categoryName: 'Mobily',
  brand: 'Test',
  subtitle: '128GB, Black',
  description: 'Test description',
  price: 100,
  rating: 4.5,
  reviewCount: 12,
  image: '/test-product.jpg',
  stock: 3,
  specs: {},
}

const renderProductCard = (stock = product.stock) => renderToString(
  <VisitorProvider>
    <CartProvider>
      <WishlistProvider>
        <ComparisonProvider>
          <ProductCard
            product={{ ...product, stock }}
            onQuickView={() => undefined}
            onShowToast={() => undefined}
          />
        </ComparisonProvider>
      </WishlistProvider>
    </CartProvider>
  </VisitorProvider>
)

describe('ProductCard', () => {
  it('can be imported and has correct structure', () => {
    const html = renderProductCard()
    expect(typeof html).toBe('string')
    expect(html.length).toBeGreaterThan(0)
    expect(html).toContain('Test product')
  })

  it('renders a card for an out-of-stock product', () => {
    const html = renderProductCard(0)
    expect(html).toContain('Do košíku')
  })
})
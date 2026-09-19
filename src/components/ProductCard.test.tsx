import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
// @ts-ignore
import ProductCard from './ProductCard'

describe('ProductCard', () => {
  it('can be imported and has correct structure', () => {
    const html = renderToString(<ProductCard product={{ id: '1', name: 'Test', price: 100, image: '/placeholder.svg', inStock: true }} onQuickView={() => {}} onShowToast={() => {}} />)
    expect(typeof html).toBe('string')
    expect(html.length).toBeGreaterThan(0)
  })

  it('renders disabled style when out of stock', () => {
    const html = renderToString(<ProductCard product={{ id: '2', name: 'Test', price: 100, image: '/placeholder.svg', inStock: false }} onQuickView={() => {}} onShowToast={() => {}} />)
    expect(html).toContain('opacity')
  })
})
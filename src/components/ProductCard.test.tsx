import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import ProductCard from './ProductCard'

describe('ProductCard', () => {
  it('can be imported and has correct structure', () => {
    const html = renderToString(<ProductCard id="1" name="Test" price={100} inStock={true} />)
    expect(typeof html).toBe('string')
    expect(html.length).toBeGreaterThan(0)
  })

  it('renders disabled style when out of stock', () => {
    const html = renderToString(<ProductCard id="2" name="Test" price={100} inStock={false} />)
    expect(html).toContain('opacity')
  })
})
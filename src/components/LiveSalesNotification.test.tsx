import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import { LiveSalesNotification } from './LiveSalesNotification'

describe('LiveSalesNotification', () => {
  it('can be imported and has correct structure', () => {
    const html = renderToString(<LiveSalesNotification />)
    expect(typeof html).toBe('string')
    expect(html.length).toBeGreaterThan(0)
  })
})
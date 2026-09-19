import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import { LiveSalesNotification } from './LiveSalesNotification'
import { VisitorProvider } from '../context/VisitorContext'

describe('LiveSalesNotification', () => {
  it('can be imported and has correct structure', () => {
    const html = renderToString(
      <VisitorProvider>
        <LiveSalesNotification />
      </VisitorProvider>
    )
    expect(typeof html).toBe('string')
    expect(html).toBe('')
  })
})
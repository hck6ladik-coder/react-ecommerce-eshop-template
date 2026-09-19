import React from 'react'

/**
 * Wrapper komponent pro testování s Context providery.
 * Používá se k testování komponent, které potřebují Cart nebo Visitor kontext.
 */
export const withProviders = (children: React.ReactNode) => {
  return (
    <div>
      {children}
    </div>
  )
}

// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { headers } from 'next/headers'

import { cookieToInitialState } from 'wagmi'

import { wagmiConfig } from '@/blockchain/config'
import Web3ModalProvider from '@/context'

export const metadata: Metadata = {
  title: 'Zeto-app',
  description: 'frontend for zeto-app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const initialState = cookieToInitialState(wagmiConfig, headers().get('cookie'))
  return (
    <html lang="en">
      <body>
        <Web3ModalProvider initialState={initialState}>{children}</Web3ModalProvider>
      </body>
    </html>
  )
}
import { Inter } from '@next/font/google'

import { LayoutHome } from '@/components/layouts'

const inter = Inter({ subsets: ['latin'] })

export default function HomePage() {
  return (
    <>
      <LayoutHome>
        <h1>Home profesional</h1>
      </LayoutHome>
    </>
  )
}

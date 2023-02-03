import React from 'react'
import NavbarDashboard from '../ui/NavbarDashboard'

type Props = {
  children: JSX.Element
}

export function LayoutDashboard({ children }: Props) {
  return (
    <>
      <header>
        <NavbarDashboard />
      </header>
      <main>{children}</main>
    </>
  )
}

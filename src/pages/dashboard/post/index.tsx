import { LayoutDashboard } from '@/components/layouts'
import Link from 'next/link'

export default function Post() {
  return (
    <>
      <LayoutDashboard>
        <>
          <h3>Crear Post</h3>
          <br />
          <Link href='/dashboard'>Dashboard Home</Link>
        </>
      </LayoutDashboard>
    </>
  )
}

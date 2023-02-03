import { LayoutDashboard } from '@/components/layouts'
import Link from 'next/link'

export default function DashboardHome() {
  return (
    <LayoutDashboard>
      <>
        <h3>Dashboard Home</h3>
        <br />
        <Link href='/dashboard/post'>Crear Post</Link>
      </>
    </LayoutDashboard>
  )
}

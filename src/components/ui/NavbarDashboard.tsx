import React from 'react'
import styles from '@/styles/ui/NavbarDashboard.module.css'
import Link from 'next/link'
export default function NavbarDashboard() {
  return (
    <nav className={styles.navDashboard}>
      <div className={styles.navLogo}>LOGO</div>
      <div className={styles.navUser}>
        <span>
          Welcome: <strong>Marcos Ortiz</strong>
        </span>
        <span>
          | <Link href='/auth/login'>Logout</Link>
        </span>
      </div>
    </nav>
  )
}

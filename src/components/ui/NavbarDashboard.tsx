import React from 'react'
import styles from '@/styles/ui/NavbarDashboard.module.css'
import Link from 'next/link'
import { useContext } from 'react'
import { AuthContext } from '@/context'
export default function NavbarDashboard() {
  const { onLogout } = useContext(AuthContext)

  return (
    <nav className={styles.navDashboard}>
      <div className={styles.navLogo}>LOGO</div>
      <div className={styles.navUser}>
        <span>
          Welcome: <strong className={styles.userText}>Marcos Ortiz</strong>
        </span>
        <button
          onClick={onLogout}
          style={{ cursor: 'pointer', padding: '0 8px' }}>
          Logout
        </button>
      </div>
    </nav>
  )
}

import { LayoutAuth } from '@/components/layouts'
import Link from 'next/link'
import styles from './Login.module.css'

export default function LoginPage() {
  return (
    <LayoutAuth>
      <div className={styles.boxForm}>
        <form>
          <h2>Login</h2>

          <div className={styles.inputBox}>
            <label htmlFor='correo'>Correo</label>
            <input type='text' id='correo' />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' />
          </div>
          <button>Login</button>

          <div className={styles.signupNow}>
            <p>Not a member?</p> <Link href='/auth/register'>Signup now</Link>
          </div>
          <br />
          <Link href='/dashboard'>Dashboard</Link>
          <br />
          <Link href='/'>Home</Link>
        </form>
      </div>
    </LayoutAuth>
  )
}

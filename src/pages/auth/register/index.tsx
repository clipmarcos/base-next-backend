import { LayoutAuth } from '@/components/layouts'
import Link from 'next/link'
import styles from '../login/Login.module.css'

export default function RegisterPage() {
  return (
    <LayoutAuth>
      <div className={styles.boxForm}>
        <form>
          <h2>Register</h2>

          <div className={styles.inputBox}>
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' />
          </div>

          <div className={styles.inputBox}>
            <label htmlFor='email'>Email</label>
            <input type='text' id='email' />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' />
          </div>
          <button>Register</button>

          <div className={styles.signupNow}>
            <p>go to login ?</p> <Link href='/auth/login'>Login</Link>
          </div>
        </form>
      </div>
    </LayoutAuth>
  )
}

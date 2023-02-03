import { LayoutAuth } from '@/components/layouts'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <LayoutAuth>
      <form>
        <h1>Login</h1>
        <label htmlFor='correo'>Correo</label>
        <input type='text' id='correo' />

        <label htmlFor='password'>Password</label>
        <input type='text' id='password' />

        <button>Submit</button>
        <Link href='/'>Home</Link>
      </form>
    </LayoutAuth>
  )
}

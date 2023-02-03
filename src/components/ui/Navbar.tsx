import Link from 'next/link'

export function Navbar() {
  return (
    <>
      <ul>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/about'>About Us</Link>
        </li>
        <li>
          <Link href='/auth/login'>Login</Link>
        </li>
        <li>
          <Link href='/dashboard'>Dashboard</Link>
        </li>
        <li>
          <Link href='/blog/hello-world'>Blog Post</Link>
        </li>
      </ul>
    </>
  )
}

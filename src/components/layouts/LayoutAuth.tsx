import styles from '@/styles/layouts/LayoutAuth.module.css'
import Head from 'next/head'

type Props = {
  children: JSX.Element
}

export function LayoutAuth({ children }: Props) {
  return (
    <>
      <Head>
        <title>Login | App</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>{children}</div>
      </main>
    </>
  )
}

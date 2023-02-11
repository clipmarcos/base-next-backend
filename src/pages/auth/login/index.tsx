import { useContext, useState } from 'react'
import { LayoutAuth } from '@/components/layouts'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { validations } from '@/utils'
import { setTimeout } from 'timers'
import { AuthContext } from '@/context'
import { useRouter } from 'next/router'
import styles from './Login.module.css'

type FormData = {
  email: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()
  const { loginUser } = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const [showError, setShowError] = useState(false)

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false)

    const isValidLogin = await loginUser(email, password)

    if (!isValidLogin) {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
      return
    }

    // todo: redirigirlo al dashboard
    router.replace('/dashboard')
  }
  return (
    <LayoutAuth>
      <div className={styles.boxForm}>
        <form onSubmit={handleSubmit(onLoginUser)} noValidate>
          <h2>Login</h2>
          <h5
            style={{
              color: ' #ff4d4f',
              textAlign: 'center',
              display: showError ? 'block' : 'none',
            }}>
            Email or Password incorrect
          </h5>
          <div className={styles.inputBox}>
            <label htmlFor='correo'>Correo</label>
            <input
              type='email'
              id='correo'
              {...register('email', {
                required: 'Please enter an email',
                validate: validations.isEmail,
              })}
            />
            {errors.email && <span>{errors.email?.message}</span>}
          </div>
          <div className={styles.inputBox}>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              {...register('password', {
                required: 'Please enter an password',
                minLength: {
                  value: 6,
                  message: 'Minimum must be 6 characters',
                },
              })}
            />
            {errors.password && <span>{errors.password?.message}</span>}
          </div>
          <button type='submit'>Login</button>

          <div className={styles.signupNow}>
            <p>you don't have accounts?</p>{' '}
            <Link href='/auth/register'>Signup now</Link>
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

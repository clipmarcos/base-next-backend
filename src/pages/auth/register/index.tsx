import { useState, useContext } from 'react'
import { LayoutAuth } from '@/components/layouts'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import styles from '../login/Login.module.css'
import { testApi } from '@/api'
import { validations } from '@/utils'
import { useRouter } from 'next/router'
import { AuthContext } from '@/context'

type FormData = {
  name: string
  email: string
  password: string
}

export default function RegisterPage() {
  const router = useRouter()
  const { registerUser } = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  const [showError, setShowError] = useState(false)
  const [showMessageError, setShowMessageError] = useState('')

  const onRegisterUser = async ({ email, password, name }: FormData) => {
    setShowError(false)

    const { hasError, message } = await registerUser(name, email, password)

    if (hasError) {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
      setShowMessageError(message!)
      return
    }

    // todo: redirigirlo al dashboard
    router.replace('/dashboard')
  }

  return (
    <LayoutAuth>
      <div className={styles.boxForm}>
        <form onSubmit={handleSubmit(onRegisterUser)} noValidate>
          <h2>Register</h2>
          <h5
            style={{
              color: ' #ff4d4f',
              textAlign: 'center',
              display: showError ? 'block' : 'none',
            }}>
            {showMessageError}
          </h5>
          <div className={styles.inputBox}>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              {...register('name', {
                required: 'Please enter a name',
              })}
            />
            {errors.name && <span>{errors.name?.message}</span>}
          </div>

          <div className={styles.inputBox}>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
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
          <button type='submit'>Register</button>

          <div className={styles.signupNow}>
            <p>go to login...</p> <Link href='/auth/login'>Login</Link>
          </div>
        </form>
      </div>
    </LayoutAuth>
  )
}

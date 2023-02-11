import { useReducer, ReactNode, useEffect } from 'react'
import { AuthContext, authReducer } from './'
import { IUser } from '@/interfaces'
import { testApi } from '@/api'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useRouter } from 'next/router'

//AuthState: luce parecido al contexto pero no son iguales
//AuthState: hace referecia al estado propiamente que yo voy a utilizar para almacenar
export interface AuthState {
  isLoggedIn: boolean
  user?: IUser
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
}

interface Props {
  children: ReactNode
}
export const AuthProvider = ({ children }: Props) => {
  const router = useRouter()
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)

  useEffect(() => {
    checkToken()
  }, [])

  const checkToken = async () => {
    //llamar al endPoint
    try {
      const { data } = await testApi.get('/user/validate-token')
      const { token, user } = data

      //save new token en cookie
      Cookies.set('token', token)

      dispatch({ type: '[Auth] - Login', payload: user })
    } catch (error) {
      Cookies.remove('token')
    }
  }

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await testApi.post('/auth/login', { email, password })
      const { token, user } = data

      //save token en cookie
      Cookies.set('token', token)

      //save info user en el estado
      dispatch({ type: '[Auth] - Login', payload: user })

      return true
    } catch (error) {
      return false
    }
  }

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await testApi.post('/auth/register', {
        name,
        email,
        password,
      })
      const { token, user } = data

      //save token en cookie
      Cookies.set('token', token)

      //save info user en el estado
      dispatch({ type: '[Auth] - Login', payload: user })

      return {
        hasError: false,
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        }
      }

      return {
        hasError: true,
        message: 'Failed to create user - Try again',
      }
    }
  }

  const onLogout = () => {
    Cookies.remove('token')
    router.reload()
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,

        // method
        loginUser,
        registerUser,
        onLogout,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

//AuthProvider: es quien va a proveer la informacion a los demas componentes. la informacion que nosotros queramos,
//la informacion que esta almacenada aqui en el proveedor

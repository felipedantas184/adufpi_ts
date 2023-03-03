import ProtectedRoute from '@/components/ProtectedRoutes'
import { AuthContextProvider, useAuth } from '@/context/AuthContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

const noAuthRequired = ['/login', '/signup', '/reset-password']

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  
  const { user } = useAuth()
  console.log(user)

  return (
    <AuthContextProvider>
      {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
    </AuthContextProvider>
  )
}
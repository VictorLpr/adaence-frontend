import { useAuth, UserType } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'


export const useAuthGuard = (requiredUserType?: UserType) => {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return

    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    if (requiredUserType && user?.type !== requiredUserType) {
      switch (user?.type) {
        case 'volunteer':
          router.push('/volunteer/dashboard')
          break
        case 'elder':
          router.push('/elder/dashboard')
          break
        default:
          router.push('/login')
      }
    }
  }, [isAuthenticated, user, requiredUserType, router, isLoading])

  return { 
    user, 
    isAuthenticated, 
    isAuthorized: !requiredUserType || user?.type === requiredUserType,
    isLoading
  }
}


export const useRedirectIfAuthenticated = (autoRedirect: boolean = true) => {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return

    if (autoRedirect && isAuthenticated && user) {
      switch (user.type) {
        case 'volunteer':
          router.push('/volunteer/dashboard')
          break
        case 'elder':
          router.push('/elder/dashboard')
          break
      }
    }
  }, [isAuthenticated, user, router, isLoading, autoRedirect])

  return { isAuthenticated, isLoading, user }
}

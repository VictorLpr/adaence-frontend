'use client'

import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react'
import {useIsHydrated} from '../hooks/useIsHydrated'

export type UserType = 'volunteer' | 'elder' | null

interface User {
  id: string
  name: string
  type: UserType
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (userType: UserType, userId: string, userName: string) => void
  logout: () => void
  checkAuthStatus: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<User | null>(null)
  const isHydrated = useIsHydrated()

  const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null

    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null
    }
    return null
  }

  const setCookie = (name: string, value: string, days: number = 7) => {
    if (typeof document === 'undefined') return

    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`
  }

  const deleteCookie = (name: string) => {
    if (typeof document === 'undefined') return

    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`
  }

  const checkAuthStatus = () => {
    const userType = getCookie('user_type') as UserType
    const userId = getCookie('user_id')
    const userName = getCookie('user_name')

    if (userType && userId && userName) {
      setUser({
        id: userId,
        name: userName,
        type: userType,
      })
    }
  }

  const login = (userType: UserType, userId: string, userName: string) => {
    if (!userType) return

    const userData = {
      id: userId,
      name: userName,
      type: userType,
    }

    setUser(userData)

    setCookie('user_type', userType)
    setCookie('user_id', userId)
    setCookie('user_name', userName)
  }

  const logout = () => {
    setUser(null)

    deleteCookie('user_type')
    deleteCookie('user_id')
    deleteCookie('user_name')
  }

  useEffect(() => {
    if (isHydrated) {
      checkAuthStatus()
    }
  }, [isHydrated])

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user && isHydrated,
    isLoading: !isHydrated,
    login,
    logout,
    checkAuthStatus,
  }

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="mt-2 text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

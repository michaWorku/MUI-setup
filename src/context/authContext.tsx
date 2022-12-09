import React, { createContext, FC, useContext, useState } from "react"

export type AuthType = {
  token?: any,
  access_token?: string,
  refresh_token?: string
} | null

type AuthContextType = {
  auth: AuthType,
  setAuth: (auth: AuthType) => void
}

const AuthContext= createContext<AuthContextType | {}>({})
AuthContext.displayName = 'AuthContext'

const AuthProvider = ({children}:{children: React.ReactNode})=>{

  const [auth, setAuth] = useState<AuthType | {}>({});

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
      throw new Error(`useAuth must be used within a AuthProvider`)
    }
    return context
  }

const isAuthenticated = (authData : AuthType) => {
    return authData !== null && authData !== undefined
}

export {AuthProvider, useAuth, isAuthenticated}
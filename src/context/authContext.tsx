import React, { createContext, Dispatch, FC, SetStateAction, useContext, useState } from "react"

export type AuthType = {
  token?: any,
  accessToken?: string,
  refreshToken?: string
} | null

export type AuthContextType = {
  auth: AuthType,
  setAuth: Dispatch<SetStateAction<AuthType>>
}

const AuthContext= createContext<AuthContextType| null>(null)
AuthContext.displayName = 'AuthContext'

const AuthProvider = ({children}:{children: React.ReactNode})=>{

  const [auth, setAuth] = useState<AuthType | null>(null);

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
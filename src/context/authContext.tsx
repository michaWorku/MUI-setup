import React, { createContext, Dispatch, FC, SetStateAction, useContext, useState } from "react"

export type AuthType = {
  token?: any,
  accessToken?: string,
  refreshToken?: string,
  roles?: any,
  permissions?: {}[]
} | null

export type AuthContextType = {
  auth: AuthType,
  setAuth: Dispatch<SetStateAction<AuthType>>
}

const defaultValue ={
  token: "",
  accessToken: "",
  refreshToken: "",
  roles: {},
  permissions: [{}]
}

const AuthContext= createContext<AuthContextType| null>(null)
AuthContext.displayName = 'AuthContext'

const AuthProvider = ({children}:{children: React.ReactNode})=>{

  const [auth, setAuth] = useState<AuthType | null>(defaultValue);

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

const isAuthorized = (authData : AuthType, permissions: string[]) => {
  return permissions?.every((permission: any) =>{
    return authData?.permissions?.map((permissions: any)=> permissions?.id).includes(permission)
})
}


export {AuthProvider, useAuth, isAuthenticated, isAuthorized}
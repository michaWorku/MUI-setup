import { FC, useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AuthContextType, AuthType, useAuth } from "src/context/authContext";
import { useQuery} from '@tanstack/react-query'
import axios, { axiosPrivate } from "src/lib/axios";

type PrivateRoutesProps ={
    children?: React.ReactNode,
    redirectPath?: string,
    permission?: string[]
}

const PrivateRoutes:FC<PrivateRoutesProps> = ({children, redirectPath='/', permission }) => {
    const authData = useAuth() as AuthContextType
    const location = useLocation();

    //To-do get permision and set auth with permision  and check if user is permited to authorized
    const { status, data, error, isLoading, isFetching, isFetched } = useQuery({
        queryKey: ['permissions'],
        queryFn: async () => {
            const {data} = await axios.get('/permission')
            authData?.setAuth((prev: AuthType) => {
                return { ...prev, permissions: data }
            });
            return data
        },
        onSettled: (data, error) => {
            console.log({error})
        },
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        cacheTime: Infinity
    })

    useEffect(()=>{
        console.log({data, status})
        
        
        const permissions = data?.map((permissions: any)=>{
            return permissions?.name
        })
        const isPermitted = permission?.every((permission: any) =>{
            return data?.map((permissions: any)=> permissions?.id).includes(permission)
        })
        console.log({filter: permissions,isPermitted})
    },[data])

    const isPermitted = permission?.every((permission: any) =>{
        return data?.map((permissions: any)=> permissions?.id).includes(permission)
    })

    if(isFetching) return <span>Fetching...</span>

    if( isFetched && isPermitted ) {
        return (
            <>
             {children? children: <Outlet/>}
            </>
        )
    }
    
    return ( authData?.auth?.token
                ? <Navigate to={redirectPath} state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default PrivateRoutes;
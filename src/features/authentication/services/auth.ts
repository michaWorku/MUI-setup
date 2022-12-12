import axios from "src/lib/axios"

export const signin =async (signinData:any) => {
    const { data } = await axios.post('/auth', signinData)
    return data
} 

export const signup =async (signinData:any) => {
    const { data } = await axios.post('/auth', signinData)
    return data
} 
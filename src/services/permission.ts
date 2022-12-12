import { AuthType } from "src/context/authContext";
import useAxiosPrivate from "src/hooks/useAxiosPrivate";
import axios from "../lib/axios";

export const getPermissions = async () => {
    try {
        const {data} = await axios.get('/permission')
        console.log({permissions: data})
        return data
    } catch (error) {
        return error
    }
}
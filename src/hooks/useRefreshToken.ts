import axios from "src/lib/axios";
import { AuthType, useAuth } from "src/context/authContext";

const useRefreshToken = () => {
    const authProvider = useAuth()

    const refresh = async () => {
        const {data} = await axios.get('/refresh', {
            withCredentials: true
        });

        authProvider?.setAuth((prev: AuthType) => {
            console.log(JSON.stringify(prev));
            console.log(data.accessToken);
            return { ...prev, accessToken: data.accessToken }
        });
        
        return data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
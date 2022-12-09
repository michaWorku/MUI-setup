import axios from "src/api/axios";
import { AuthType, useAuth } from "src/context/authContext";

const useRefreshToken = () => {
    const authProvider = useAuth()

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });

        authProvider?.setAuth((prev: AuthType) => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return { ...prev, accessToken: response.data.accessToken }
        });
        
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
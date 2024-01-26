import axios from "../api/axios";
import useDataContext from "./useDataContext";

const useRefreshToken = () => {
    const { setAuth } = useDataContext()


    const refresh = async () => {
        const response = await axios.get('/refresh')

        await setAuth((prev) => {

            return {
                ...prev,
                user: response.data?.user,
                pwd: response.data?.pwd,
                roles: response.data?.roles,
                accessToken: response.data.accessToken
            }
        })
        return response.data.accessToken
    }
    return refresh
}

export default useRefreshToken
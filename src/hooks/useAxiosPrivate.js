import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useDataContext from "./useDataContext";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken()
    const { auth } = useDataContext()

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
                }
                return config
            }, (error) => Promise.reject(error)
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevReq = error?.config
                if (error?.response?.status === 403 && !prevReq?.sent) {
                    prevReq.sent = true

                    const newAccessToken = await refresh();
                    prevReq.headers['Authorization'] = `Bearer ${newAccessToken}`
                    return axiosPrivate(prevReq)
                }
                return Promise.reject(error)
            }
        )

        return (() => {
            axiosPrivate.interceptors.request.eject(requestIntercept)
            axiosPrivate.interceptors.response.eject(responseIntercept)
        })
    }, [auth, refresh])

    return axiosPrivate
}


export default useAxiosPrivate
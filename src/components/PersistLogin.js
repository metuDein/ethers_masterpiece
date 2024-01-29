import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import useDataContext from "../hooks/useDataContext"
import useRefreshToken from "../hooks/useRefreshToken"
import SpinnerComponent from "./SpinnerComponent"



const PersistLogin = () => {
    const refresh = useRefreshToken()
    const { auth, persist, isLoading, setIsLoading } = useDataContext()
    const [appLoading, setAppLoading] = useState(true)

    useEffect(() => {
        let isMounted = true

        const verifyRefreshToken = async () => {
            try {
                setAppLoading(true)
                await refresh()
            } catch (error) {
                console.error(error)
                setAppLoading(false)
            } finally {
                isMounted && setAppLoading(false)
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setAppLoading(false)

        return () => isMounted = false
    }, [])

    // useEffect(() => {
    //     // console.log(`isLoading : ${isLoading}`)
    //     // console.log(`aT : ${JSON.stringify(auth?.accessToken)}`)
    // }, [isLoading])



    return (
        <>
            {!persist
                ? <Outlet />
                : appLoading
                    ? <SpinnerComponent />
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin
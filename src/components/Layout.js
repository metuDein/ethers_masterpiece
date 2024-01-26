import { Outlet } from "react-router-dom"
import AppHeader from "./headerandfooter/AppHeader"
import AppFooter from "./headerandfooter/AppFooter"
import useDataContext from "../hooks/useDataContext"
import SpinnerComponent from "./SpinnerComponent"
import { useEffect } from "react"
import useRefreshToken from "../hooks/useRefreshToken"

const Layout = () => {
    const { appLoading, setAppLoading, auth } = useDataContext()
    const refresh = useRefreshToken()

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
    }, [auth])

    return (
        appLoading
            ? <SpinnerComponent />
            : (<>
                <AppHeader />
                <Outlet />
                <AppFooter />
            </>)
    )
}

export default Layout
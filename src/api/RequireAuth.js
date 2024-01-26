import { Outlet, Navigate, useLocation, } from "react-router-dom"
import useDataContext from "../hooks/useDataContext"

const RequireAuth = ({ allowedRoles }) => {

    const { auth } = useDataContext();
    const location = useLocation()

    return auth?.roles?.find(role => allowedRoles.includes(role))
        ? <Outlet />
        : auth?.user
            ? <Navigate to={'/unauthorized'} state={{ from: location }} replace />
            : <Navigate to={'/user-authentication-login'} state={{ from: location }} replace />
}

export default RequireAuth
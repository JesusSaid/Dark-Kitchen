import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({children}) =>
{
    const check = window.localStorage.getItem('check');

    if(!check)
    {
        return <Navigate to="/"/>
    }
    return children
}

export default ProtectedRoutes;
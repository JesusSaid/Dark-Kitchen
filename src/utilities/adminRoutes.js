import { Navigate } from "react-router-dom";

export const adminRoutes = ({children}) =>
{
    const check = window.localStorage.getItem('token');

    if(!check)
    {
        return <Navigate to="/"/>
    }
    return children
}

export default ProtectedRoutes;
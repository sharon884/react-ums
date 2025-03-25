import { Navigate ,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProtectedRoute = () =>{

    const user = useSelector((state)=>state.auth);

    if (!user || user.role !== "admin" ) {
        return <Navigate to="/admin-login" replace />
    }
    return <Outlet/>

}

export default AdminProtectedRoute;
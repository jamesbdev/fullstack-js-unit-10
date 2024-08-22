import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Outlet, useNavigate, useLocation, Navigate } from "react-router-dom";

//higher order component for private routes
const PrivateRoute = () => {
    //access authorized user from context
    const { authUser } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    if (!authUser) {
        return <Navigate to="/sign-in" state={{ from: location.pathname }} />;
    }

    //check if user is logged in else navigate to /sign-in page
    return (
        authUser ? <Outlet /> : null
    )

}

export default PrivateRoute;


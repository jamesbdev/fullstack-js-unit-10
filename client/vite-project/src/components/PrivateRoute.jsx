import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Outlet, useNavigate } from "react-router-dom";

//higher order component for private routes
const PrivateRoute = () => {
    //access authorized user from context
    const { authUser } = useContext(UserContext);
    const navigate = useNavigate();

    
    useEffect(() => {
        if (!authUser) {
            navigate("/sign-in");
        }
   
    },[authUser, navigate]);

    //check if user is logged in else navigate to /sign-in page
    return (
        authUser ? <Outlet /> : null
    )


}

export default PrivateRoute;


import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Outlet, useNavigate, useLocation, Navigate } from "react-router-dom";

//higher order component for private routes
const PrivateRoute = () => {
    //access authorized user from context
    const { authUser } = useContext(UserContext);
    const { isLoading } = useContext(UserContext);

    console.log(isLoading);
    const navigate = useNavigate();
    const location = useLocation();

    
    // Check if the app is still loading  the authenticated user from local storage
    if (isLoading) {
      return <h2> Loading... </h2>
    }
    
    //if user is not signed in//show sign in view and store the user location
    if (!authUser) {
      return <Navigate to="/sign-in" state={{ from: location.pathname }} />;
    } 
    
    
    //check if user is logged in else navigate to /sign-in page
      return (
        authUser ? <Outlet /> : navigate("sign-in")
    )
  


   // return children;

}

export default PrivateRoute;


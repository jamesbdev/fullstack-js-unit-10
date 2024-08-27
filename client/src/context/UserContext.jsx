import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

//create user context for authentication
const UserContext = createContext(null);

//main context provider for user authentication
const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    //state of authorized user
    const [authUser, setAuthUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    //check if user has already authenticated
      //if yes set user state to authenticated user
    useEffect(() => {
      //retrieve local storage
      const storedUser = localStorage.getItem('authUser');

      if (storedUser) {
        setAuthUser(JSON.parse(storedUser));
      }

      setIsLoading(false);
      
    }, [])


    //sign in function to pass to UserSignIn component
    const signIn = async (credentials) => {
        const encodedCredentials = btoa(
            `${credentials.username}:${credentials.password}`
          );
      
          const fetchOptions = {
            method: "GET",
            headers: {
              Authorization: `Basic ${encodedCredentials}`,
            },
          };
      
        //fetch request to sign in user
       const response = await fetch("http://localhost:5000/api/users", fetchOptions);
      if (response.status === 200) {
        const user = await response.json();
        user.user.password = credentials.password;
        setAuthUser(user);
        //store credentials local storage
        localStorage.setItem("authUser", JSON.stringify(user));
        
        return user;
      } else if (response.status === 401) {
        navigate("/forbidden");
        return null;
      } else {
        throw new Error();
      }
      
    }


    //Sign out function to pass to UserSignOut component
    const signOut = () => {
        //remove authenticated user information from the global state
      setAuthUser(null);
      //delete credentials from localstorage
      localStorage.clear();
    };

    return (
        <UserContext.Provider value={{
            authUser, isLoading,
            actions: {
                signIn,
                signOut
            }
            }}>
            {children}
        </UserContext.Provider>
    )
}

UserProvider.prototype = {
  children: PropTypes.object,
}

export { UserProvider, UserContext };



import { createContext, useState } from "react";
import PropTypes from 'prop-types';

//create user context for authentication
const UserContext = createContext(null);

//main context provider for user authentication
const UserProvider = ({children}) => {
    //state of authorized user
    const [authUser, setAuthUser] = useState(null);


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
      
        //fetch request 
       const response = await fetch("http://localhost:5000/api/users", fetchOptions);
      if (response.status === 200) {
        const user = await response.json();
        user.user.password = credentials.password;
        setAuthUser(user);
        return user;
      } else if (response.status === 401) {
        return null;
      } else {
        throw new Error();
      }
      
    }


    //Sign out function to pass to UserSignOut component
    const signOut = () => {
        //remove authenticated user information from the global state
      setAuthUser(null);
    };

    return (
        <UserContext.Provider value={{
            authUser,
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



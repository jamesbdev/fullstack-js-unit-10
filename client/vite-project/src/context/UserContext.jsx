import { createContext, useContext, useState } from "react";

//create user context for authentication
const AuthContext = createContext(null);

//hook to use AuthContext
export const useAuth = () => useContext(AuthContext);


//main context provider for user authentication
const UserContext = ({children}) => {
    //state of authorized user
    const [authUser, setAuthUser] = useState(null);


    //sign in function to pass to UserSignIn component
    const signIn = async (username, password) => {
       setAuthUser({ username, password });
      
    }


    //Sign out function to pass to UserSignOut component
    const signOut = () => {
        //remove authenticated user information from the global state
      setAuthUser(null);
    };

    return (
        <AuthContext.Provider value={{
            authUser,
            actions: {
                signIn,
                signOut
            }
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default UserContext;


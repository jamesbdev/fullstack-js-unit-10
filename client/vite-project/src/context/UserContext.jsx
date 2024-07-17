import { createContext, useState } from "react";

const UserContext = createContext(null);

const UserProvider = (props) => {
    const [authUser, setAuthUser] = useState(null);
    const signIn = async () => {

    }

    const signOut = () => {
      
    }

    return (
        <UserContext.Provider>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider;


import React from "react";
import { createContext } from "react";

const ThemeContext = createContext();


const ThemeProvider = ({children}) => {

    return(
        <ThemeContext.Provider value={"test"}>
            {children}
        </ThemeContext.Provider>
    )

}

export default ThemeProvider;
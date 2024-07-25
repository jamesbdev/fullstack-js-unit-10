import { Link } from "react-router-dom";
import React, { useContext } from "react";




const Header = (props) => {

  //const { user } = useContext(UserContext);
  
  const signOut = () => {
    console.log("Sign Out");
    user.signOut();
  }

  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>
        <nav>
          {/* Check if user is authenticated 
                      - if Yes show welcome message 
                      - Display logout button 
                    - else show sign up and sign in button
                      */}
          { true ? (
            <>
              <ul className="header-signedout">
                <li>
                  <Link to="/sign-up">Sign up</Link>
                </li>
                <li>
                  <Link to="/sign-in">Sign in</Link>
                </li>
              </ul>
            </>
          ) : (
            <ul className="header--signedin">
              <li>Welcome firstName lastName </li>
              <li>
                {/* - onClick call signOut function */}
                <Link to={"/"} onClick={signOut}>Sign out</Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

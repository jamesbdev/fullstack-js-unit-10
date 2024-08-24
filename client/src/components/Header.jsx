import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";


const Header = () => {
  const { actions, authUser } = useContext(UserContext);

  //const { user } = useContext(UserContext);
  
  const signOut = () => {
     actions.signOut();
     console.log("user has been signed out");
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
          { !authUser ? (
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
              <li>Welcome  {authUser.user.firstName } {authUser.user.lastName}</li>
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

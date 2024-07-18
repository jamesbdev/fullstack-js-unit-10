import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
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
                    <ul className="header-signedout">
                        <li>
                            <Link to="/sign-up">Sign up</Link>
                           
                        </li>
                        <li>
                            <Link to="/sign-in">Sign in</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;
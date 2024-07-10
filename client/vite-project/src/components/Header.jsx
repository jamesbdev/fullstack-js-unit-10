import React from "react";

const Header = (props) => {
    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo">
                    <a href="index.html">Courses</a>
                </h1>
                <nav>
                    <ul className="header-signedout">
                        <li>
                            <a href="sign-up.html">Sign up</a>
                        </li>
                        <li>
                            <a href="sign-in.html">Sign in</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;
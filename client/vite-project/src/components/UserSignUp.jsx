import React, { useRef, useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import ThemeContext from '../context/ThemeContext';
//import user authentication context
import AuthContext from '../context/UserContext';

const UserSignUp = () => {
    const navigate = useNavigate();
    const firstName = useRef(null);
    const lastName = useRef(null);
    const emailAddress = useRef(null);
    const password = useRef(null);
    //state for errors
    const [errors, setErrors] = useState([]);
    
    const signIn = useContext(AuthContext);

    console.log(signIn);
    //sign in user
    //useAuth(emailAddress, password);

    /* function to create a user 

    - gets user data from input refs
    - makes a POST request to /api/users 
    - pass in user credentials in body 
    */
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = {
            firstName : firstName.current.value,
            lastName: lastName.current.value,
            emailAddress: emailAddress.current.value,
            password: password.current.value
        }

        console.log(user);
        

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(user),
        }

     
        try {
            const response = await fetch("http://localhost:5000/api/users", fetchOptions);

            if (response.status === 201) {
            //user has been signed up  
              console.log(`${user.emailAddress} is successfully signed up and authenticated`);
              //sign in user
              //use context hook to access sign in function 
              //signInUser(emailAddress, password);
            } else if (response.status === 400) {
                const data = await response.json();
                //set error state 
                setErrors(data.errors)
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log(error);
            navigate("/error");
        }
    
    }

 /* Cancel and return to homepage */

    const handleCancel = (event) => {
      event.preventDefault();
      navigate("/");
    }

    return (
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                { errors ? <h3>{errors}</h3> : null}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input ref={firstName} id="firstName" name="firstName" type="text"/>
                    <label htmlFor="lastName">Last Name</label>
                    <input ref={lastName} id="lastName" name="lastName" type="text"/>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input ref={emailAddress} id="emailAddress" name="emailAddress" type="email"/>
                    <label htmlFor="password">Password</label>
                    <input ref={password} id="password" name="password" type="password"/>
                    <button className="button" type="submit">Sign Up</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
                <p>Already have a user account? Click here to <a href="sign-in.html">sign in</a>!</p>
            </div>
        </main>
            
    )

}

export default UserSignUp;


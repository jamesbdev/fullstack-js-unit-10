import React, { useRef, useState } from "react";

const UserSignUp = () => {
    //state
    const name = useRef(null);
    const username = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([]);
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = {
            name : name.current.value,
            username: username.current.value,
            password: password.current.value
        }

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(user),
        }
    
        const response = await fetch("http://localhost:5000/api/users", fetchOptions);
        console.log(response);
    }


    const handleCancel = (event) => {
      event.preventDefault();
    }

    return (
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                <form>
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" value=""/>
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" value=""/>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" value=""/>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" value=""/>
                    <button className="button" type="submit">Sign Up</button><button className="button button-secondary" onClick="">Cancel</button>
                </form>
                <p>Already have a user account? Click here to <a href="sign-in.html">sign in</a>!</p>
            </div>
        </main>
            
    )

}

export default UserSignUp;


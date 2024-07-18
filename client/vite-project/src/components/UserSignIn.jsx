import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";


const UserSignIn = (credentials) => {
  const navigate = useNavigate();
  const username = useRef(null);
  const password = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const credentials = {
      username: username.current.value,
      password: password.current.value,
    };

    const encodedCredentials = btoa(
      `${credentials.username}:${credentials.password}`
    );

    const fetchOptions = {
      method: "GET",
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
      },
    };

    try {
      //TODO: Get user from UserContext
        //success (user !== null) -> navigate to authenticated route
        //Failure (user == null) -> update errors state 

      const response = await fetch("http://localhost:5000/user", fetchOptions);
      if (response.status === 200) {
        const user = await response.json();
        if (user) {
            navigate("/authenticated")
        } else {
            setErrors(["Sign in was unsuccessful"])
        }
        setAuthUser(user);
        return;
      
      } else if (response.status === 401) {
        return null;
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleCancel = (event) => {
    //prevent form from submitting
    event.preventDefault;
    //go back to home page
    navigate("/");
  };
  //return mark-up
  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="emailAddress">Email Address</label>
          <input ref={username} id="emailAddress" name="emailAddress" type="email" />
          <label htmlFor="password">Password</label>
          <input ref={password} id="password" name="password" type="password"/>
          <button className="button" type="submit">
            Sign In
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </form>
        <p>
          Don't have a user account? Click here to{" "}
          <Link to="/sign-up">sign up</Link>!
        </p>
      </div>
    </main>
  );
};

export default UserSignIn;

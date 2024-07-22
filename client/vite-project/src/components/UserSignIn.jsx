import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from '../context/UserContext';


const UserSignIn = (credentials) => {
  const navigate = useNavigate();
  //ref to get credentials from form inputs
  const username = useRef(null);
  const password = useRef(null);
  //access signIn method from UserContext
  const { signIn } = useAuth();
  //authenticated user state
  const [authUser, setAuthUser] = useState(null);


  //submit user sign in form 
    //gets user credentials from refs
    //puts credentials into encoded format
    //makes GET request to api/users passing in credentials in authorization headers

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
      const response = await fetch("http://localhost:5000/api/users", fetchOptions);
      if (response.status === 200) {
        const user = await response.json();
        if (user) {
            navigate("/authenticated")
        } else {
            setErrors(["Sign in was unsuccessful"])
        }
        //set state of authenticated user
        setAuthUser(user);
        return;
      
      } else if (response.status === 401) {
        //unauthorized
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

import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
//import user authentication context
import { UserContext } from "../context/UserContext";
import ValidationErrors from "./ValidationErrors";

const UserSignUp = () => {
  const navigate = useNavigate();
  const firstName = useRef(null);
  const lastName = useRef(null);
  const emailAddress = useRef(null);
  const password = useRef(null);
  //access UserContext methods
  const { actions } = useContext(UserContext);
  //state for errors
  const [errors, setErrors] = useState(null);

  /* function to create a user 

    - gets user data from input refs
    - makes a POST request to /api/users 
    - pass in user credentials in body 
    */

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      emailAddress: emailAddress.current.value,
      password: password.current.value,
    };

    const credentials = {
      username: emailAddress.current.value,
      password: password.current.value,
    };

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(user),
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users",
        fetchOptions
      );

      if (response.status === 201) {
        //user has been signed up
        console.log(
          `${user.emailAddress} is successfully signed up and authenticated`
        );
        //sign in user
        actions.signIn(credentials);
      } else if (response.status === 400) {
        const data = await response.json();
        //set error state
        setErrors(data.errors);
      }  else if (response.status === 500) { 
        navigate("/error");
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  /* Cancel and return to homepage */

  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign Up</h2>
        {/* check for errors and display errors */}
        {errors ? (
          <ValidationErrors errors />
        ) : null}
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input ref={firstName} id="firstName" name="firstName" type="text" />
          <label htmlFor="lastName">Last Name</label>
          <input ref={lastName} id="lastName" name="lastName" type="text" />
          <label htmlFor="emailAddress">Email Address</label>
          <input
            ref={emailAddress}
            id="emailAddress"
            name="emailAddress"
            type="email"
          />
          <label htmlFor="password">Password</label>
          <input ref={password} id="password" name="password" type="password" />
          <button className="button" type="submit">
            Sign Up
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </form>
        <p>
          Already have a user account? Click here to{" "}
          <a href="sign-in.html">sign in</a>!
        </p>
      </div>
    </main>
  );
};

export default UserSignUp;

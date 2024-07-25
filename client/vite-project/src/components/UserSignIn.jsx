import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import  { UserContext } from "../context/UserContext";


const UserSignIn = (credentials) => {
  //get context from UserContext
  const { actions } = useContext(UserContext);

  const navigate = useNavigate();
  //ref to get credentials from form inputs
  const username = useRef(null);
  const password = useRef(null);

  //authenticated user state
  const [authUser, setAuthUser] = useState(null);
  const [errors, setErrors] = useState(null);

  const handleSubmit = async (event) => {
    //prevent form submitting
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
      const user = await actions.signIn(credentials);
      if (user) {
        navigate("/");
      } else {
        setErrors(["Sign in was unsuccessful"]);
      }
    } catch (error) {
      console.log(error);
      //set error state
      setErrors(error);
      //navigate to /error route
      navigate("/error");
    }
  };

  const handleCancel = (event) => {
    //prevent form from submitting
    event.preventDefault;
    //go back to home page
    navigate("/");
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="emailAddress">Email Address</label>
          <input
            ref={username}
            id="emailAddress"
            name="emailAddress"
            type="email"
          />
          <label htmlFor="password">Password</label>
          <input ref={password} id="password" name="password" type="password" />
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

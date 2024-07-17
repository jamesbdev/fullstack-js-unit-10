import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserSignIn = () => {
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
      const response = await fetch("http://localhost:5000/user", fetchOptions);
      console.log(response);
      if (response.status === 200) {
        const user = await response.json();
        console.log(`Success! ${user.username} is now signed in!`);
        navigate("/authenticated");
      } else if (response.status === 401) {
        setErrors(["Sign in was unsuccessful"]);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleCancel = (event) => {
    event.preventDefault;
    navigate("/");
  };
  return (
    <main>
      <div class="form--centered">
        <h2>Sign In</h2>

        <form>
          <label htmlFor="emailAddress">Email Address</label>
          <input id="emailAddress" name="emailAddress" type="email" value="" />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value="" />
          <button class="button" type="submit">
            Sign In
          </button>
          <button class="button button-secondary" onClick="">
            Cancel
          </button>
        </form>
        <p>
          Don't have a user account? Click here to{" "}
          <a href="sign-up.html">sign up</a>!
        </p>
      </div>
    </main>
  );
};

export default UserSignIn;

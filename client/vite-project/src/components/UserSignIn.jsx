import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import  { UserContext } from "../context/UserContext";


//calls the sign in function from context
//passes the credentials 
const UserSignIn = () => {

  //get sign in function from context
  const { actions } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  //ref to get credentials from form inputs
  const username = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState(null);
  const [redirectTo, setRedirectTo] = useState("/");

  useEffect( () => {
    if (location.state?.from) {
      setRedirectTo(location.state.from);
    }
  }, [location])



  //fetches a User to authenticate, using the sign-in method from Context
  const handleSubmit = async (event) => {
    //prevent form submitting
    event.preventDefault();

    const credentials = {
      username: username.current.value,
      password: password.current.value,
    };

  
    //log in fetch request (GET)
    try {
      const user = await actions.signIn(credentials);
      if (user) {
        //redirect to stored location
        navigate(redirectTo);
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

  //cancel and go back to homepage
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
          Don&apos;t have a user account? Click here to{" "}
          <Link to="/sign-up">sign up</Link>!
        </p>
      </div>
    </main>
  );
};



export default UserSignIn;

import React, { useState, useEffect, useContext } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams, useNavigate } from "react-router-dom";
import { api } from "../utils/apiHelper";
import { UserContext } from "../context/UserContext";

const CourseDetail = (props) => {
  const { id } = useParams();
  //set a state for the course's data
  const [courseDetails, setCourseDetails] = useState(null);
  //get authenticated user from context
  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();


  //GET request to the current course data from API
  // sets the courseDetails state to the course data
  const getCourseInfo = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${id}`);
      const data = await response.json();
      //update the course state
      setCourseDetails(data);
    } catch (error) {
      console.log("Error when fetching course details", error);
    }
  };

  //contains a fetch request to DELETE the current course
  const deleteHandler = async (event) => {
    event.preventDefault();

    const { user } = authUser;
    const userName = user.emailAddress;
    const userPassword = user.password;

    const encodedCredentials = btoa(`${userName}:${userPassword}`);
    //make DELETE request to api
    const fetchOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Basic ${encodedCredentials}`,
      },
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/courses/${id}`,
        fetchOptions
      );

      if (response.status === 204) {
        console.log("Course was deleted");
        //navigate to courses
        navigate("/");
      } else if (response.status === 400) {
        console.log("bad request");
      } else if (response.status === 401) {
        console.log("user not authorized");
      } else {
        throw new Error("failed to delete the course");
      }
    } catch (error) {
      console.log("There was an issue when updating the course", error);
    }
  };
  useEffect(() => {
    getCourseInfo();
  }, [id]);

  //Check if courseDetails exists
  if (!courseDetails) {
    return <h2>Loading...</h2>;
  } else {
    //assign course data to variables
    const { description, materialsNeeded, user, estimatedTime, title } = courseDetails[0];
    //store course's userId
    const courseUserId = user.id;

    const userName = courseDetails[0].user.firstName + " " + courseDetails[0].user.lastName;

    if (authUser) {
      const loggedUserId = authUser.user.id;
      return (
        <>
        <div className="actions--bar">
          <div className="wrap">
            {/* - check authenticated user id 
            - if the user id is same as the course's user ID 
              - show buttons 
            - else hide buttons */}
            { loggedUserId === courseUserId ? (
              <>
         
                <Link className="button" to={`/courses/${id}/update`}>
                  Update Course
                </Link>
                <Link
                  className="button"
                  to={`/courses/${id}delete`}
                  onClick={deleteHandler}
                >
                  Delete Course
                </Link>
                </>
            ) : null }
            <Link className="button button-secondary" to="/">
              Return to List
            </Link>
          </div>
        </div>
        <div className="wrap">
          <h2>Course Detail</h2>
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{title}</h4>
                <p>By {userName}</p>

                <ReactMarkdown>{description}</ReactMarkdown>
              </div>
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>{estimatedTime}</p>

                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                  <ReactMarkdown>{materialsNeeded}</ReactMarkdown>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </>

      ) 
    } else {
      return (
        <>
        <div className="actions--bar">
          <div className="wrap">
            <Link className="button button-secondary" to="/">
              Return to List
            </Link>
          </div>
        </div>
        <div className="wrap">
          <h2>Course Detail</h2>
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{title}</h4>
                <p>By {userName}</p>

                <ReactMarkdown>{description}</ReactMarkdown>
              </div>
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>{estimatedTime}</p>

                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                  <ReactMarkdown>{materialsNeeded}</ReactMarkdown>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </>
      )
    }
  }
};

export default CourseDetail;

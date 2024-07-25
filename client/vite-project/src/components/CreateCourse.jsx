import React, { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const CreateCourse = (props) => {
  //get logged in user from context
  const { authUser } = useContext(UserContext);
  const courseTitle = useRef(null);
  const courseDescription = useRef(null);
  const estimatedTime = useRef(null);
  const materialsNeeded = useRef(null);
  //add error state
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    //prevent form submission
    event.preventDefault();

    console.log('courseTitle:', courseTitle.current.value);
    console.log('courseDescription:', courseDescription.current.value);
    console.log('estimatedTime:', estimatedTime.current.value);
    console.log('materialsNeeded:', materialsNeeded.current.value);
    console.log('authUser:', authUser.user.id);
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
    },
      body: JSON.stringify({
        title: courseTitle.current.value,
        description: courseDescription.current.value,
        estimatedTime: estimatedTime.current.value,
        materialsNeeded: materialsNeeded.current.value,
        userId: authUser.user.id,
      }),
    };

    //POST request to create course
    try {
      const response = await fetch(
        "http://localhost:5000/api/courses",
        fetchOptions
      );
 

      if (response.status === 201) {
        console.log("course was created");
        //redirect to courses page
        navigate("/");
      } else if (response.status === 400 || response.status === 401) {
        const data = await response.json();
        //set error state
        setErrors(data.errors);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log("There was an error creating a course", error);
    }
  };

  //redirect to homepage
  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/");
  };
  return (
    <>
      <main>
        <div className="wrap">
          <h2>Create Course</h2>
          {/* -check for errors, if errors display errors */}
          {errors ? (
            <div className="validation--errors">
              <h3>Validation Errors</h3>
              <ul>
                {/* loop through errors */}
                {errors.map((error, index) => (
                  <li key={index}>{ error }</li>
                ))}
              </ul>
            </div>
          ) : null}

          <form onSubmit={handleSubmit}>
            <div className="main--flex">
              <div>
                <label htmlFor="courseTitle">Course Title</label>
                <input
                  ref={courseTitle}
                  id="courseTitle"
                  name="courseTitle"
                  type="text"
                />
               { authUser ? ( 
                <p> By {authUser.user.firstName} {authUser.user.lastName} </p>
                ) : null }
               

                <label htmlFor="courseDescription">Course Description</label>
                <textarea
                  ref={courseDescription}
                  id="courseDescription"
                  name="courseDescription"
                ></textarea>
              </div>
              <div>
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input
                  ref={estimatedTime}
                  id="estimatedTime"
                  name="estimatedTime"
                  type="text"
                />

                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea
                  ref={materialsNeeded}
                  id="materialsNeeded"
                  name="materialsNeeded"
                ></textarea>
              </div>
            </div>
            <button className="button" type="submit">
              Create Course
            </button>
            <button className="button button-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default CreateCourse;

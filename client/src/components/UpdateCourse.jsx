import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import ValidationErrors from "./ValidationErrors"

const UpdateCourse = () => {
  //get course id from params
  const { id } = useParams();
  const navigate = useNavigate();
  //store authenticated user from context
  const { authUser } = useContext(UserContext);
  //errors state
  const [errors, setErrors] = useState();

  //course state
  const [course, setCourse] = useState(null);
  //set state for textarea 
  const [courseDesc, setCourseDesc] = useState("");
  const [materialsNeeded, setMaterials] = useState("");
  //get values from form
  const title = useRef(null);
  const estimatedTime = useRef(null);
  //get value of authorized user's ID
  const authUserId = authUser.user.id;




  //using hook to update view with course data
  useEffect(() => {

  //makes GET request to /api/courses/:id to get data from the course being updated
  const getCourseData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${id}`);
      const data = await response.json();
      const courseUserId = data[0].userId;
     
      if (response.status === 200 || response.status === 204) {
        //check if the response's data exists
        //if not redirect to not found page
        if (!data || data.length == 0) {
          navigate("/not-found");
        } else if (courseUserId !== authUserId) {
          //checking if the course's user id matches the logged in user id
          //if not redirect to forbidden page
          navigate("/forbidden");
          
        } else {
          setCourse(data[0]);
          setMaterials(data[0].materialsNeeded);
        }
        setCourseDesc(data[0].description);
      } else if (response.status === 401) {
        navigate("/forbidden");
      } else if (response.status === 404) {
        navigate("/notfound");
      } else {
        navigate("/error");
      }
  
    } catch (error) {
      console.log("there was an error fetching the course data", error);
    }
  };
    //GET request
    getCourseData();
  }, [id, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    //pass credentials for authorization

    //store authenticated user credentials
    if (authUser) {
      const { user } = authUser;
      const userName = user.emailAddress;
      const userPassword = user.password;

      const encodedCredentials = btoa(`${userName}:${userPassword}`);

      const fetchOptions = {
        method: "PUT",
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          id,
          title: title.current.value,
          description: courseDesc,
          materialsNeeded,
          estimatedTime: estimatedTime.current.value,
          userId: authUser.user.id,
        }),
      };

      //make PUT request to update the course
      try {
        const response = await fetch(
          `http://localhost:5000/api/courses/${id}`,
          fetchOptions
        );

        if (response.status === 204) {
          //redirect to course details page
          navigate(`/courses/${id}`);
        } else if (response.status === 401) {
          navigate("/forbidden");
        } else if (response.status === 400) {
          
          const data = await response.json();
          //set errors state with errors
          setErrors(data.errors);
        } else if (response.status === 500) { 
          navigate("/error");
        } else {
          throw new Error("failed to update course");
        }
      } catch (error) {
        console.log("There was an error when updating the course", error);
      }
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate(`/courses/${id}`);
  };
  //check if course exists before showing mark up
  if (!course) {
    return <p>loading course...</p>;
  } else {
    return (
      <main>
        <div className="wrap">
          <h2>Update Course</h2>
          {/* check for errors and display validation errors */}
          {errors ? (
            <ValidationErrors errors={errors}/>
          ) : null}

          <form onSubmit={handleSubmit}>
            <div className="main--flex">
              <div>
                <label htmlFor="courseTitle">Course Title</label>
                <input
                  ref={title}
                  id="courseTitle"
                  name="courseTitle"
                  type="text"
                  defaultValue={course.title}
                />

                <p>
                  By {course.user.firstName} {course.user.lastName}
                </p>

                <label htmlFor="courseDescription">Course Description</label>
                <textarea
                  id="courseDescription"
                  name="courseDescription"
                  value={courseDesc}
                  onChange={(event) => setCourseDesc(event.target.value)}
                >
                  {" "}
                  {course.description}
                </textarea>
              </div>
              <div>
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input
                  ref={estimatedTime}
                  id="estimatedTime"
                  name="estimatedTime"
                  type="text"
                  defaultValue={course.estimatedTime}
                />

                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea
                  id="materialsNeeded"
                  name="materialsNeeded"
                  value={materialsNeeded || ""}
                  onChange={(event) => setMaterials(event.target.value)}
                ></textarea>
              </div>
            </div>
            <button className="button" type="submit">
              Update Course
            </button>
            <button className="button button-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </form>
        </div>
      </main>
    );
  }
};

export default UpdateCourse;

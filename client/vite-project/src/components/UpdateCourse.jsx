import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import ValidationErrors from "./ValidationErrors"

const UpdateCourse = () => {
  //get course id from params
  const { id } = useParams();
  console.log("id", id);
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



  //using hook to update view with course data
  useEffect(() => {

  //make GET request to /api/courses/:id to get data from the course being updated
  const getCourseData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${id}`);
      const data = await response.json();
      //set course date to course object
      setCourse(data[0]);
      setMaterials(data[0].materialsNeeded);
      setCourseDesc(data[0].description);

    } catch (error) {
      console.log("there was an error fetching the course data", error);
    }
  };
    //GET request
    getCourseData();
  }, [id]);

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
          console.log("access denied");
        } else if (response.status === 400) {
          
          const data = await response.json();
          //set errors state with errors
          setErrors(data.errors);
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

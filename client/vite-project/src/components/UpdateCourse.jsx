import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const UpdateCourse = () => {
  //get course id from params
  const { id } = useParams();
  const navigate = useNavigate();
  const context = useContext(UserContext);
  //course state
  const [course, setCourse] = useState(null);
  const [courseDesc, setCourseDesc] = useState(null);
  const [materialsNeeded, setMaterials] = useState(null);

  //make GET request to /api/courses/:id to get data from the course being updated 
  const getCourseData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${id}`);
      const data = await response.json();
      //set course date to course object
      setCourse(data[0]);
      //set state for materials needed
      setMaterials(data[0].materialsNeeded);
      //set state for course description
      setCourseDesc(data[0].description);
      //console.log("course", course);
    } catch (error) {
      console.log("there was an error fetching the course data", error);
    }
 
  }

  //using hook to update view with course data
  useEffect(()=> {
    getCourseData();
  }, [id])

  const handleSubmit = (event) => {
    event.preventDefault;
    console.log("form submitted");

    //fetch options

    //make PUT request to update the course 
  }

  const handleCancel = (event) => {
    event.preventDefault;
    navigate(`/api/courses/${id}`);

  }
//check if course exists before showing mark up
  if (!course) {
     return (
      <p>loading course...</p>
     )
  } else {
  return(
    <main>
    <div className="wrap">
        <h2>Update Course</h2>
        <form onSubmit={handleSubmit}>
            <div className="main--flex">
                <div>
                    <label htmlFor="courseTitle">Course Title</label>
                    <input id="courseTitle" name="courseTitle" type="text" defaultValue={course.title}/>

                    <p>By {course.user.firstName} {course.user.lastName}</p>

                    <label htmlFor="courseDescription">Course Description</label>
                    <textarea id="courseDescription" name="courseDescription" value={course.description} onChange={(event) => setCourseDesc(event.target.value)}></textarea>
                </div>
                <div>
                    <label htmlFor="estimatedTime">Estimated Time</label>
                    <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={course.estimatedTime}/>

                    <label htmlFor="materialsNeeded">Materials Needed</label>
                    <textarea id="materialsNeeded" name="materialsNeeded" value={course.materialsNeeded} onChange={(event) => setMaterials(event.target.value) }></textarea>
                </div>
            </div>
            <button className="button" type="submit">Update Course</button>
            <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
        </form>
    </div>
</main>
  )
}
}

export default UpdateCourse;
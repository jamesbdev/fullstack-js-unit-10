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

  //make GET request to /api/courses/:id to get data from the course being updated 
  const getCourseData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${id}`);
      const data = await response.json();
      //set course date to course object
      setCourse(data[0]);
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

  if (!course) {
     return (
      <p>loading course...</p>
     )
  } else {
  return(
    <main>
    <div class="wrap">
        <h2>Update Course</h2>
        <form onSubmit={handleSubmit}>
            <div class="main--flex">
              {console.log("course", course)}
                <div>
                    <label htmlFor="courseTitle">Course Title</label>
                    <input id="courseTitle" name="courseTitle" type="text" defaultValue={course.title}/>

                    <p>By Joe Smith</p>

                    <label htmlFor="courseDescription">Course Description</label>
                    <textarea id="courseDescription" name="courseDescription">{course.description}</textarea>
                </div>
                <div>
                    <label htmlFor="estimatedTime">Estimated Time</label>
                    <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={course.estimatedTime}/>

                    <label htmlFor="materialsNeeded">Materials Needed</label>
                    <textarea id="materialsNeeded" name="materialsNeeded">* 1/2 x 3/4 inch parting strip&#13;&#13;* 1 x 2 common pine&#13;&#13;* 1 x 4 common pine&#13;&#13;* 1 x 10 common pine&#13;&#13;* 1/4 inch thick lauan plywood&#13;&#13;* Finishing Nails&#13;&#13;* Sandpaper&#13;&#13;* Wood Glue&#13;&#13;* Wood Filler&#13;&#13;* Minwax Oil Based Polyurethane</textarea>
                </div>
            </div>
            <button class="button" type="submit">Update Course</button>
            <button class="button button-secondary" onClick={handleCancel}>Cancel</button>
        </form>
    </div>
</main>
  )
}
}

export default UpdateCourse;
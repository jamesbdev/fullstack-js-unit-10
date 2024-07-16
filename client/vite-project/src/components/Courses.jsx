import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { api } from "../utils/apiHelper";


/* index page component 
 - Shows a list of courses
 - Shows button to create a course
*/

const Courses = (props) => {
  const [courses, setCourses] = useState([]);

  //get data to show courses
  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/courses");
      const courseData = await response.json();
      //change state for courses array
      setCourses(courseData);
    } catch (error) {
      console.log("there was an error getting the list of courses", error);
    }
  };

  useEffect(() => {
    //make fetch request
    fetchCourses();
  },[]);
  
  const coursesItems = courses.map((course, index) => (
    <Link key={index} to={"/courses/" + course.id} className="course--module course--link">
    <h2 className="course--label">Course</h2>
    <h3 className="course--title">{ course.title }</h3>
    </Link>
  ));

  return (
    <main>
      <div className="wrap main--grid">
        {/* List of courses */}
        {coursesItems}
        {/* create course button */}
        <Link
          className="course--module course--add--module"
          to="courses/create"
        >
          <span className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </span>
        </Link>
      </div>
    </main>
  );
};

export default Courses;

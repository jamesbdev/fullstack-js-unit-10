import Header from "./components/Header";
import Courses from "./components/Courses";
import Course from "./components/Course";
import UpdateCourse from "./components/UpdateCourse";
import { Routes, Route, useParams } from "react-router-dom";
import { useEffect, useState } from "react";


function App() {
  const { id } = useParams();
  //add state for courses array
  const [courses, setCourses] = useState([]);
  //add state for course details
  const [courseDetails, setCourseDetails] = useState(null);

  //make fetch requests here
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

  console.log(id);

  const getCourseInfo = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/courses/1`
      );
      const courseData = await response.json();
  
      console.log(courseDetails);
      //update the course state
      setCourseDetails(courseData);
    } catch (error) {
      console.log("Error when fetching course details", error);
    }

  };

  useEffect(() => {
    //get list of courses
    fetchCourses();

    //get course details
    getCourseInfo();
  }, []);
  return (
    <>
      <Header />
      {/* Declare routes */}
      <Routes>
        <Route path="/" element={<Courses courses={courses} />}></Route>
        <Route
          path="/courses/:id"
          element={<Course course={courseDetails} />}
        ></Route>
        <Route path="/courses/:id/update" element={<UpdateCourse />}></Route>
      </Routes>
    </>
  );
}

export default App;

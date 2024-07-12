import Header from "./components/Header";
import Courses from "./components/Courses";
import Course from "./components/Course";
import { Routes, Route, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const { id } = useParams();
  //declare states here
  const [courses, setCourses] = useState([]);
  const [courseDetails, setCourseDetails] = useState({});

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

  const getCourseInfo = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/courses/:${id}`
      );
      const courseData = await response.json();
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
      </Routes>
    </>
  );
}

export default App;

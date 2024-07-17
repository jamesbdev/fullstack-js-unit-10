import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UpdateCourse from "./components/UpdateCourse";
import { Routes, Route, useParams } from "react-router-dom";
import { useContext } from "react";
import NotFound from "./components/NotFound";


function App() {
  const { id } = useParams();


  return (
    <>
      <Header />
      {/* Declare routes */}
      <Routes>
        <Route path="/" element={<Courses/>}></Route>
        <Route
          path="/courses/:id"
          element={<CourseDetail/>}
        ></Route>
        <Route path="/courses/:id/update" element={<UpdateCourse />}></Route>
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </>
  );
}

export default App;

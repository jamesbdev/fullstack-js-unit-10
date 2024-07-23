import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UpdateCourse from "./components/UpdateCourse";
import { Routes, Route, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import NotFound from "./components/NotFound";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import Error from "./components/Error";
import UserContext from "./context/UserContext";
import CreateCourse from "./components/CreateCourse";


function App() {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  
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
        <Route path="/sign-up" element={<UserSignUp/>}></Route>
        <Route path="/sign-in" element={<UserSignIn/>}></Route>
        <Route path="/error" element={<Error/>}></Route>
        <Route path="/create" element={<CreateCourse />}></Route>
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>

     
    </>
  );
}

export default App;

import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UpdateCourse from "./components/UpdateCourse";
import { Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import CreateCourse from "./components/CreateCourse";
import PrivateRoute from "./components/PrivateRoute";
import UnhandledError from "./components/UnhandledError";
import Forbidden from "./components/Forbidden";


function App() {
  return (
    <>
      <Header />
      {/* Declare routes */}
      <Routes>
        <Route path="/" element={<Courses />}></Route>
        <Route path="/courses/:id" element={<CourseDetail />}></Route>

        <Route path="/sign-up" element={<UserSignUp />}></Route>
        <Route path="/sign-in" element={<UserSignIn />}></Route>
        <Route path="/error" element={<UnhandledError/>}></Route>
        <Route path="/notfound" element={<NotFound />}></Route>
        <Route path="/forbidden" element={<Forbidden />}></Route>

        <Route
          exact
          path="/courses/create"
          element={<PrivateRoute />}
        >
          <Route index element={<CreateCourse />}>

          </Route>

        </Route>
        <Route
          path="/courses/:id/update"
          element={<PrivateRoute />}>
          <Route index element={<UpdateCourse />}>
          
          </Route>

        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;

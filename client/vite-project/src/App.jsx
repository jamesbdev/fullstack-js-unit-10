
import Header from "./components/Header";
import Courses from './components/Courses';
import Course from "./components/Course";
import { Routes, Route, useParams } from 'react-router-dom';

function App() {
  const { id } = useParams();
  return (
    <>
        <Header />
        {/* Declare routes */}
        <Routes>
          <Route path="/" element={<Courses />}></Route>
          <Route path="/courses/:id" element={<Course />}></Route>
        </Routes>
    </>

  )
}

export default App

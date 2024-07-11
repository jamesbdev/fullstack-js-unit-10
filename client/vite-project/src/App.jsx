

import Header from "./components/Header";
import Courses from './components/Courses';
import Course from "./components/Course";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
        <Header />
        <Routes>
          <Route path="/" element={<Courses />}></Route>
          <Route path="/course:id" element={<Course />}></Route>
        </Routes>
    </>

  )
}

export default App

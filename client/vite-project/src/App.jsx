
//import CSS files
import "./global.css";
import "./reset.css";
import Header from "./components/Header";
import Courses from './components/Courses';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
        <Header />
        <Routes>
          <Route path="/" element={<Courses />}>
          </Route>
        </Routes>
    </>

  )
}

export default App

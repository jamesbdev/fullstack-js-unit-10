import React from "react";
import { useEffect, useState } from 'react';
import Course from "./Course";
import AddModule from "./AddModule";

/* index page component 
 - Shows a list of courses
 - Shows button to create a course
*/

const Courses = (props) => {
    //declare courses state
    const [courses, setCourses] = useState([]);
 // fetch courses 
    useEffect(() => {
       const fetchCourses = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/courses");
            const courseData = await response.json();
            //change state for courses array
            setCourses(courseData);
        } catch (error) {
            console.log("there was an error getting the list of courses", error);
        }
 
       }
       //call the fetch function
       fetchCourses();
     
    }, [])

    const coursesItems = courses.map((course, index) => <Course key={index} title={course.title}/>);
    //console.log("courses", courses);
    return(
        <div>
            <main>
                <div className="wrap main--grid">
                    {/* List of courses */}
                    {coursesItems}
                    {/* create course button */}
                    <AddModule />
                </div>
            </main>

        </div>
    )
}

export default Courses;
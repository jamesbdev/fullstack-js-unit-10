import React from "react";
import { useEffect, useState } from 'react';

/* index page component 
 - Shows a list of courses
 - Shows button to create a course
*/

const Courses = (props) => {
    //declare courses state
    const [courses, setCourses] = useState([]);
 // fetch courses 
    useEffect(async () => {
       const response = await fetch("http://localhost:5000/api/courses");
       const courseData = await response.json();
       setCourses(courseData);
    })

    const coursesItems = courses.map(course => <Course title={course.title}/>);
    console.log(coursesItems);
    return(
        <div>
            <main>
                <div class="wrap main--grid">
                    {/* List of courses */}
                    {coursesItems}
                </div>
            </main>

        </div>
    )
}

export default Courses;
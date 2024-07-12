import React from "react";
import AddModule from "./AddModule";
import CourseCard from "./CourseCard";

/* index page component 
 - Shows a list of courses
 - Shows button to create a course
*/

const Courses = (props) => {
    //loop through Courses array and create a CourseCard element
    // console.log(props.courses);
    const coursesItems = props.courses.map((course, index) => <CourseCard key={index} title={course.title} id={course.id} author={course.author} />);

    return(
            <main>
                <div className="wrap main--grid">
                    {/* List of courses */}
                    {coursesItems}
                    {/* create course button */}
                    <AddModule />
                </div>
            </main>

        
    )
}

export default Courses;
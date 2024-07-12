import React from "react";
import { useEffect, useState } from "react";


/* Component for course detail view */
const Course = (props) => {
  //create course state
  const [course, setCourse] = useState(null);
  const courseId = props.id;
  console.log(courseId);

  //make request to get data from specific course
  useEffect(() => {
        const getCourseInfo = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/courses/:${props.id}`)
                const courseData = await response.json();
                setCourse(courseData);
            } catch (error) {
              console.log("Error when fetching course details", error);
            }
        
        }

        getCourseInfo();

    }, [])

    console.log(course);
    if (course !== null) {
        return (
            <>
            <div className="actions--bar">
            <div className="wrap">
                <a className="button" href="update-course.html">Update Course</a>
                <a className="button" href="#">Delete Course</a>
                <a className="button button-secondary" href="index.html">Return to List</a>
            </div>
        </div>
         <div className="wrap">
         <h2>Course Detail</h2>
         <form>
             <div className="main--flex">
                 <div>
                     <h3 className="course--detail--title">Course</h3>
                     <h4 className="course--name">Build a Basic Bookcase</h4>
                     <p>By {course.author}</p>
        
                     <p>{course.description}</p>
                     
                    
                 </div>
                 <div>
                     <h3 className="course--detail--title">Estimated Time</h3>
                     <p>{course.duration}</p>
        
                     <h3 className="course--detail--title">Materials Needed</h3>
                     <ul className="course--detail--list">
                         <li>1/2 x 3/4 inch parting strip</li>
                         <li>1 x 2 common pine</li>
                         <li>1 x 4 common pine</li>
                         <li>1 x 10 common pine</li>
                         <li>1/4 inch thick lauan plywood</li>
                         <li>Finishing Nails</li>
                         <li>Sandpaper</li>
                         <li>Wood Glue</li>
                         <li>Wood Filler</li>
                         <li>Minwax Oil Based Polyurethane</li>
                     </ul>
                 </div>
             </div>
         </form>
        </div>
        </>
          );
    }
 
};

export default Course;

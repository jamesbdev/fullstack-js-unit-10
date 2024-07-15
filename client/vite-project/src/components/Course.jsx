import React from "react";
import Markdown from 'react-markdown';
import { Link, useParams } from "react-router-dom";


const Course = (props) => {
    const { id } = useParams();
    const { course } = props;
    console.log("course", course);
    console.log(course[0].title);

    const description = course[0].description;
    const materials = course[0].materials;

    if (!course) {
        return (
            <h2>Loading...</h2>
        )
    } else {
        return (
            <>
            <div className="actions--bar">
            <div className="wrap">
                <Link className="button" to="/courses/:id/update">Update Course</Link>
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
                     <p>By {props.course[0].author}</p>
        
                     <p>{description}</p>
                 </div>
                 <div>
                     <h3 className="course--detail--title">Estimated Time</h3>
                     <p>{props.course[0].duration}</p>
        
                     <h3 className="course--detail--title">Materials Needed</h3>
                     <ul className="course--detail--list">
                        { materials }
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

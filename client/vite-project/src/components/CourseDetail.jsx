import React, { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from "react-router-dom";
import { api } from "../utils/apiHelper";



const CourseDetail = (props) => {
    const { id } = useParams();
    const [courseDetails, setCourseDetails] = useState(null);

    //get data from API
    const getCourseInfo = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/courses/${id}`
          );
          const courseData = await response.json();
      
          //update the course state
          setCourseDetails(courseData);
     
        } catch (error) {
          console.log("Error when fetching course details", error);
        }
    
      };
    //apply useEffect hook to fetch data
    useEffect(() => {
      getCourseInfo();
    },[id]);
    //Check if courseDetails exists 
    if (!courseDetails) {
        return (
            <h2>Loading...</h2>
        );
    } else {
      //assign course data to variables
      const { description, materialsNeeded, author, estimatedTime } = courseDetails[0];
      const userName = courseDetails[0].user.firstName + " " + courseDetails[0].user.lastName;
        return (
            <>
            <div className="actions--bar">
            <div className="wrap">
                <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
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
                     <p>By {userName}</p>
        
                     <ReactMarkdown>{description}</ReactMarkdown>
                 </div>
                 <div>
                     <h3 className="course--detail--title">Estimated Time</h3>
                     <p>{estimatedTime}</p>
        
                     <h3 className="course--detail--title">Materials Needed</h3>
                     <ul className="course--detail--list">
                       <ReactMarkdown>{materialsNeeded}</ReactMarkdown> 
                     </ul>
                 </div>
             </div>
         </form>
        </div>
        </>
          );
        }
 
};

export default CourseDetail;

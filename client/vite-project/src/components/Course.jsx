import React from "react";
import { Link } from "react-router-dom";

/* component for individual course */
const Course = (props) => {
    return (
        <>
        <Link to={"/course:" + props.id} className="course--module course--link">
          <h2 className="course--label">Course</h2>
          <h3 className="course--title">{ props.title }</h3>
        </Link>
        </>
    )

}

export default Course;
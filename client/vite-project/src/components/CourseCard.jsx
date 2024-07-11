import React from "react";
import { Link } from "react-router-dom";

/* course card that links to individual course */
const CourseCard = (props) => {
    return (
        <>
        <Link to={"/courses/" + props.id} className="course--module course--link">
          <h2 className="course--label">Course</h2>
          <h3 className="course--title">{ props.title }</h3>
        </Link>
        </>
    )

}

export default CourseCard;
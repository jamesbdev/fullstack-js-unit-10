import React from "react";

/* component for individual course */
const Course = (props) => {
    return (
        <>
            <a className="course--module course--link" href="course-detail.html">
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{ props.title }</h3>
            </a>
        </>
    )

}

export default Course;
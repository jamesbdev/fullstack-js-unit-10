import React, { useRef, useState } from "react";

const CreateCourse = (props) => {
  
  const courseTitle = useRef(null);
  const courseDescription = useRef(null);
  const estimatedTime = useRef(null);
  const materialsNeeded = useRef(null);
  const errors = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fetchOptions = {
      method: "POST",
      body: {
        courseTitle,
        courseDescription,
        estimatedTime,
        materialsNeeded,
      },
    };

    //make POST request to /api/courses
    //pass in the body of request
    // user id
    // course title
    //description
    //estimated time
    //materials needed
    //redirect to /courses

    try {
      const response = await fetch(
        "http://localhost:5000/api/courses",
        fetchOptions
      );
      const data = response.json();
    } catch (error) {
      console.log("There was an error creating a course", error);
    }

    //redirect to /courses
  };

  const handleCancel = (event) => {
    event.preventDefault();
    //redirect to homepage
  };
  return (
    <>
      <main>
        <div className="wrap">
          <h2>Create Course</h2>
          {/* -check for errors, if errors display errors */}
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
             {/* loop through errors */}
            </ul>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="main--flex">
              <div>
                <label htmlFor="courseTitle">Course Title</label>
                <input
                  ref={courseTitle}
                  id="courseTitle"
                  name="courseTitle"
                  type="text"
                />

                <p>By Joe Smith</p>

                <label htmlFor="courseDescription">Course Description</label>
                <textarea
                  ref={courseDescription}
                  id="courseDescription"
                  name="courseDescription"
                ></textarea>
              </div>
              <div>
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input
                  ref={estimatedTime}
                  id="estimatedTime"
                  name="estimatedTime"
                  type="text"
                />

                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea
                  ref={materialsNeeded}
                  id="materialsNeeded"
                  name="materialsNeeded"
                ></textarea>
              </div>
            </div>
            <button className="button" type="submit">
              Create Course
            </button>
            <button className="button button-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default CreateCourse;

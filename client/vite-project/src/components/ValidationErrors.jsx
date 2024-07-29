import React from "react";

//shows a list of validation errors
const ValidationErrors = (props) => {
  const errors = props.errors;

  return (
    <div className="validation--errors">
      <ul>
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  );
};

export default ValidationErrors;

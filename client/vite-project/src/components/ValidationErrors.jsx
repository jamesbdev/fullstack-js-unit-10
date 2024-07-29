import React from "react";

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
  )
}

export default ValidationErrors;
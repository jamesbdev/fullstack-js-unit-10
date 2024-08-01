
import PropTypes from 'prop-types';

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

ValidationErrors.prototype = {
  errors: PropTypes.object,
}

export default ValidationErrors;

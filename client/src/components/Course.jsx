import PropTypes from 'prop-types';

/* Component for course detail view */
const Course = (props) => {
    const { course } = props;
   
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

Course.propTypes = {
    course: PropTypes.object,

}

export default Course;

import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../Context';


function Courses(){
    //Import Context from Context.js file
    const context = useContext(Context);
    const [courses, setCoursesState ] = useState([]);
    const history = useHistory();

    // Retrieve courses data
    useEffect(() => {
        context.data.getCourses()
            .then((response) => setCoursesState(response.courses))
            .catch(error=>history.push('./error'));
    },[history, context.data]);

    // Map data to page
    const courseList = courses.map(course => {
        return (
            <Link className="course--module course--link" to={`/courses/${course.id}`} key = {course.id}>
                <h2 className="course--label">Course</h2>
                <h3 className="course--title">{course.title}</h3>
            </Link>
        );
        }); 

    return (
        <React.Fragment>
            <div className="wrap main--grid">
                
                {courseList}  {/*Courses to be displayed*/}

                <Link to="/courses/create" className="course--module course--add--module">
                    <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                    </span>
                </Link>
                
            </div>   
        </React.Fragment> 
    );
}

export default Courses;


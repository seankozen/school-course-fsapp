import React, { useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Context } from '../Context';
import Form from './Form';

function CreateCourse () {

    const context = useContext(Context);
    const history = useHistory();
    const location = useLocation();
    const authUser = context.authenticatedUser;

    // Return path after course creation
    const { from } = location.state || { from: { pathname: "/"} }

    // Component state
    const[title, setTitle] = useState('');
    const[description, setDescription] = useState('');
    const[estimatedTime, setEstimatedTime] = useState('');
    const[materialsNeeded, setMaterialsNeeded] = useState('');
    const[errors, setErrors] = useState('');

    // Function to set state on change    
    const change = (event) => {
        if (event.target.name === 'courseTitle') {
            setTitle(event.target.value)
        } else if (event.target.name === 'courseDescription') {
            setDescription(event.target.value)
        } else if (event.target.name === 'estimatedTime') {
            setEstimatedTime(event.target.value)
        } else if (event.target.name === 'materialsNeeded') {
            setMaterialsNeeded(event.target.value)
        } else {
            return;
        }
    }

    // Handle submission of new course data
    const submit = () => {
        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId: authUser.id
        }

        // Post data to create course
        context.data.createCourse(course, authUser.emailAddress, authUser.password)
            .then(errors => {
                if(errors.length) {
                    setErrors(errors);
                } else {
                    console.log("Your course has been created.");
                    history.push("/courses");
                }
            })
            .catch ( err => {
                console.error(errors);
                history.push('/error');  // Push to history stack
            });
    }

    // Cancel button
    const cancel = () => {
        history.push(from);
    }

    return ( 
        <div className="wrap">
            <h2>Create Course</h2>
            <Form
                submitButtonText = "Create Course"
                submit = {submit}
                cancel = {cancel}
                errors = {errors}

                elements = {() => (
                    <React.Fragment>
                        <div className="main--flex">
                            <div>
                                <label htmlFor="courseTitle">Course Title</label>
                                <input 
                                    id="courseTitle"
                                    name="courseTitle"
                                    type="text"
                                    value={title}
                                    onChange={change}
                                    placeholder="Course Title"
                                />
                            
                                <p>By {`${authUser.firstName} ${authUser.lastName}`}</p>

                                <label htmlFor="courseDescription">Course Description</label>
                                <textarea 
                                    id="courseDescription"
                                    name="courseDescription"
                                    value={description}
                                    onChange={change}
                                    placeholder="Course Description"/>
                            </div>
                            <div>
                                <label htmlFor="estimatedTime">Estimated Time</label>
                                <input 
                                    id="estimatedTime"
                                    name="estimatedTime"
                                    type="text"
                                    value={estimatedTime}
                                    onChange={change}
                                    placeholder="Estimated Time"/>  
                                <label htmlFor="materialsNeeded">Materials Needed</label>
                                <textarea 
                                    id="materialsNeeded"
                                    name="materialsNeeded"
                                    value={materialsNeeded}
                                    onChange={change}
                                    placeholder="Materials Needed"/> 
                            </div>
                        </div>
                    </React.Fragment>
                )}/>
        </div> 
    );
}

export default CreateCourse;
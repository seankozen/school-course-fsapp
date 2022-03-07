import React, { useState, useContext, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Form from './Form';
import { Context } from '../Context';

function UpdateCourse() {
    
    const context = useContext(Context);
    const history = useHistory();
    const authUser = context.authenticatedUser;
    const { id } = useParams();

    // Component states
    const[title, setTitle] = useState('');
    const[description, setDescription] = useState('');
    const[estimatedTime, setEstimatedTime] = useState('');
    const[materialsNeeded, setMaterialsNeeded] = useState('');
    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    //const[userId, setUserId] = useState('');
    const[errors, setErrors] = useState('');

    // Get course information to populate update screen
    useEffect(() => {
        context.data.getCourse(id)
            .then (response => {
                    if(response === 404) {
                        history.push('/notfound'); 
                    } else {
                        setTitle(response.course.title);
                        setDescription(response.course.description);
                        setEstimatedTime(response.course.estimatedTime);
                        setMaterialsNeeded(response.course.materialsNeeded);
                        setFirstName(response.course.User.firstName);
                        setLastName(response.course.User.lastName);
                        //setUserId(response.course.userId);
                    }    
                    // Direct to forbidden page if user not authorized to update page
                    if (response.course.userId !== authUser.id){
                        history.push('/forbidden');
                    }
            })
            .catch(error => {
                console.error(error);
                history.push('./error');
            });  
    },[context.data, history, id, authUser.id]);


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

        // Sends updated data to server to update database
        context.data.updateCourse(course, id, authUser.emailAddress, authUser.password) 
            .then(errors => {
                if(errors.length) {
                    setErrors(errors);
                } else {
                    console.log("Your course has been updated.");
                    history.push(`/courses/${id}`);
                }
            })
            .catch ( err => {
                console.error(errors);
                history.push('/error');  // Push to history stack
            });
    }
    
    // Cancel button
    const cancel = () => {
        history.push(`/courses/${id}`);
    }

  
    return (
        <div className="wrap">
            <h2>Update Course</h2>
            <Form
                submitButtonText = "Update Course"
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
                                    onInput={change}/>

                                <p>{firstName} {lastName}</p>

                                <label htmlFor="courseDescription">Course Description</label>
                                <textarea 
                                    id="courseDescription" 
                                    name="courseDescription" 
                                    value={description}   
                                    onChange={change} />   
                            </div>
                            <div>
                                <label htmlFor="estimatedTime">Estimated Time</label>
                                <input 
                                    id="estimatedTime" 
                                    name="estimatedTime" 
                                    type="text" 
                                    value={estimatedTime}
                                    onChange={change} />    
                                <label htmlFor="materialsNeeded">Materials Needed</label>
                                <textarea 
                                    id="materialsNeeded" 
                                    name="materialsNeeded"
                                    value={materialsNeeded}
                                    onChange={change} />   
                            </div>
                        </div>
                    </React.Fragment>
                )}/>
        </div>
    );
    
}

export default UpdateCourse;
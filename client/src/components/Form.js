import React from 'react';

function Form (props) {
    const {
        cancel,
        submit,
        submitButtonText,
        elements,
        errors,
    } = props;


    // Handles submit button event
    function handleSubmit(event) {
        event.preventDefault();
        submit();
    }

    // Handle cancel event
    function handleCancel(event) {
        event.preventDefault();
        cancel();
    }

    return (
        <div>
            <ErrorsDisplay errors={errors} />
            <form onSubmit={handleSubmit}>
                {elements()}
                <div>
                    <button className="button" type="submit">{submitButtonText}</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

// Display validation errors
function ErrorsDisplay({ errors }) {
    let errorsDisplay = null;

    if (errors.length) {
        errorsDisplay = (
            <div className="validation--errors">
                <h3>Validation Errors</h3>
                <ul>
                    {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
            </div>
        );
    }

    return errorsDisplay;
}

export default Form;
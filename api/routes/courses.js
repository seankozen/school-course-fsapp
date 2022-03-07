'use strict';

let express = require('express');
let router = express.Router();
const { User, Course } = require('../models');	//Require User and Course Models
const { authenticateUser } = require('../middleware/auth-user'); //Require authentication middleware
const { asyncHandler } = require('../middleware/async-handler'); //Require async middleware

// Get all courses and the users associated with them 
router.get("/", asyncHandler( async (req, res) => {
	const courses = await Course.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt']},
		include: [
			{
				model: User,
				attributes: ['firstName', 'lastName', 'emailAddress'],
			}
		]
	});
	res.json({courses}).status(200);  
}));

// Gets specific course with the associated user
router.get('/:id', asyncHandler( async(req, res) => {
	const course = await Course.findByPk(req.params.id, {
		attributes: {exclude: ['createdAt', 'updatedAt']},
		include: [
			{
				model: User,
				attributes: ['firstName', 'lastName', 'emailAddress'],
			}
		]
	});

	if (course) {
		res.status(200).json({course});
	} else {
		res.status(404).json({message: "Course does not exist."})
	}
}));

// Create new course with user authentication
router.post('/', authenticateUser, asyncHandler( async(req, res) => {
	try {
		const course = await Course.create(req.body);
		res.status(201).location(`/api/courses/${course.id}`).end();
	} catch (error) {
		console.log('Error:', error.name);
		if(error.name === 'SequelizeValidationError'){
			const errors = error.errors.map(err => err.message);
			res.status(400).json({errors});
		} else {
			throw error;
		}
	}
}));

// Updates a course and includes user authentication  
router.put('/:id', authenticateUser, asyncHandler( async(req, res) => {
	try {
		const user = req.currentUser;
		const course = await Course.findByPk(req.params.id);
		if(course && course.userId === user.id) {
			await course.update(req.body);
			res.status(204).end();
		} else {
			const error = new Error();
			error.message = "You are not authorized to make changes to this course."
			res.status(403).json({message: error.message});
		}		
	} catch (error) {
		console.log('Error:', error.name)
		if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
			const errors = error.errors.map( err => err.message);
			res.status(400).json({errors});	
		} else {
			throw error;
		}
	}
}));

// Deletes a course and includes user authentication  
router.delete('/:id', authenticateUser, asyncHandler( async(req, res) => {
	const user = req.currentUser;
	const course = await Course.findByPk(req.params.id);
	if(course && course.userId === user.id){
		await course.destroy();
		res.status(204).end();
	} else {
		const error = new Error();
		error.message = "You are not authorized to delete this course!";
		res.status(403).json({message: error.message});
	}
}));

module.exports = router;
'use strict';

let express = require('express');
let router = express.Router();
const { User } = require('../models'); //Require User Model
const { authenticateUser } = require('../middleware/auth-user'); //Require authentication middleware
const { asyncHandler } = require('../middleware/async-handler'); //Require async middleware

// Get authenticated user  
router.get("/", authenticateUser, asyncHandler( async (req, res) => {
	const user = req.currentUser;
	res.status(200);
	res.json({
		id:user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		emailAddress: user.emailAddress
	});
}));

// Create a new user
router.post("/", asyncHandler( async (req, res) => {
	try {
		await User.create(req.body);
		res.status(201).location("/").end();
		
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

module.exports = router;
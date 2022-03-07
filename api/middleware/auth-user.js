'use strict'

const bcrypt = require('bcrypt');
const auth = require('basic-auth');
const {User} = require('../models');

// Middleware to authenticate request using Basic Auth
exports.authenticateUser = async (req, res, next) => {
    let message;
    //Parse user's credentials from authorization header
    const credentials = auth(req);
    if(credentials){
       const user = await User.findOne({where: {emailAddress: credentials.name}});
       if (user) {
          const authenticated = bcrypt.compareSync(credentials.pass, user.password);
          if(authenticated) {
            console.log(`Authentication successful for ${user.firstName} ${user.lastName}, email: ${credentials.name}`);
            req.currentUser = user;    
          } else {
              message = `Authentication failed for ${user.firstName} ${user.lastName}, email: ${credentials.name}`
          }
       } else {
           message = `User not found for ${credentials.name}`;
       }
    }else {
        message = `Auth header not found.`;
    }

    if(message) {
        console.warn(message);
        res.status(401).json({ message: 'Access Denied' });
    } else {
        next();
    }  
};
'use strict';

const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');


module.exports = (sequelize) => {
    class User extends Model {}
    User.init({
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notNull: {
                msg: 'A first name is required.'
              },
              notEmpty: {
                msg: 'Please provide a first name.'   
              },  
            },
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notNull: {
                msg: 'A last name is required.'
              },
              notEmpty: {
                msg: 'Please provide a last name.'   
              },  
            },
        },  
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false, 
            unique: {
              msg: 'The email you entered already exists'  
            },
            validate: {
              notNull: {
                msg: 'An email is required.'
              },
              notEmpty: {
                msg: 'Please provide an email address'
              },
              isEmail: {
                msg: 'Please provide a valid email address.'   
              }    
            },   
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notNull: {
                msg: 'A password is required'
              },
              notEmpty: {
                msg: 'Please provide a password.'   
              },  
              set(val) {
                if(val.length >= 8 && val.length <= 18) {
                  const hashedPassword = bcrypt.hashSync(val, 10);
                  this.setDataValue('password', hashedPassword);
                }
                else {
                  throw new Error("Passwords need to be between 8 and 18 characters.");
                }
              }, 
            },
        },
    }, { sequelize });

    //One to many association to course
    User.associate = (models) => {
      User.hasMany(models.Course, {
        foreignKey: {
          fieldName: 'userId',
          allowNull: false,
        },
      });
    }

    return User;

};
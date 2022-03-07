'use strict';

const { Model, DataTypes } = require('sequelize');
//const sequelize = require('sequelize');
//const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
    class Course extends Model{};
    Course.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                  msg: 'A title is required.'
                },
                notEmpty: {
                  msg: 'Please provide a title.'   
                },  
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                  msg: 'A course description is required.'
                },
                notEmpty: {
                  msg: 'Please provide a course description.'   
                },  
            },

        },
        estimatedTime: {
            type: DataTypes.STRING,
        },
        materialsNeeded: {
            type: DataTypes.STRING,
        },
    }, { sequelize });

    // One to one association with user
    Course.associate = (models) => {
        Course.belongsTo(models.User, {
            foreignKey: {
                fieldName: 'userId',
                allowNull: false,
            }
        })    
    };

    return Course;

};
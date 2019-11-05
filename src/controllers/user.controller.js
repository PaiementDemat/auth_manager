const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');



const User = require('../models/user.model');

const {
    MAIL_NOT_FOUND_ERR,
    MAIL_USED_ERR,
    WRONG_PASSWORD_ERR
} = require('../errors')

const create = (user, headers) => {

    return new Promise(async function (resolve, reject) {
        const new_user = new User({
            _id: new mongoose.Types.ObjectId,
            email: user.email,
            password: user.password,
            details: {
                first_name: user.details.first_name,
                last_name: user.details.last_name
            },
            sources: [
                {
                    host: headers['host'],
                    browser: headers['user-agent']
                }
            ],
        })
        
        await new_user.save((err, user_created) => {
            if (err) {
                console.log(err)
                reject(MAIL_USED_ERR);
            }
            if (user) resolve(user_created);
        });
    })
    
}

const checkPassword = user => {
    return new Promise(async function (resolve, reject) {
        await User.findOne({
            email: user.email
        }, (err, user) => {
            if (err)  reject(MAIL_NOT_FOUND_ERR);
    
            if (user) {
                const password = user.password;
    
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) reject(WRONG_PASSWORD_ERR);
                    if (result) resolve();
                })
            }
        });
    })
}

module.exports = {
    create,
    checkPassword
}
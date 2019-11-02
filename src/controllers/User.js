const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');

const {
    MAIL_NOT_FOUND_ERR,
    MAIL_USED_ERR,
    WRONG_PASSWORD_ERR
} = require('../errors')

/*

    Insert new user in mongo

*/
const create = async (req, res, next) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        details: {
            first_name: req.body.details.first_name,
            last_name: req.body.details.last_name
        },
    })
    
    await user.save((err) => {
        if (err) return res.send(MAIL_USED_ERR);
        
    });

    return user;
}

const checkPassword = async (req, res, next) => {
    await User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err)  return false;

        if (user) {
            const password = req.body.password;

            bcrypt.compare(password, user.password, (err, result) => {
                if (err) return false;

                if (result) return true;
            })
        }
    });
}

module.exports = {
    create
}
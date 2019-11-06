
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
                    browser: headers['user-agent'],
                    time: Date.now()
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

const login = (user, headers) => {
    return new Promise(async function (resolve, reject) {
        await User.findOne({
            email: user.email
        }, 
        async (err, user_found) => {
            
            if (err) console.log(err)

            if(!user_found) reject(MAIL_NOT_FOUND_ERR);

            else {
                await bcrypt.compare(user.password, user_found.password, async (err, same) => {
                    if (err) console.error(err);

                    if (!same) {
                        reject(WRONG_PASSWORD_ERR);
                    }

                    else {
                        await user_found.updateOne({
                            '$push': {
                                sources: {
                                    host: headers['host'],
                                    browser: headers['user-agent'],
                                    time: Date.now()
                                }
                            }
                        })
    
                        resolve(user_found);
                    }
                })
            }
        });
    })
}

module.exports = {
    create,
    login
}
const {} = require('mongodb')
const bcrypt = require('bcrypt');

const {
    MAIL_NOT_FOUND_ERR,
    MAIL_USED_ERR,
    WRONG_PASSWORD_ERR
} = require('../errors');

const hashPassword = function (pwd) {
    return bcrypt.hashSync(pwd, 10);
}

const create = req => {

    return new Promise(async function (resolve, reject) {

        const user = req.body.user;
        const headers = req.headers;

        const db = req.app.locals.db;

        const new_user = {
            email: user.email,
            username: user.username,
            password: hashPassword(user.password),
            user_details: {
                first_name: user.details.first_name,
                last_name: user.details.last_name
            },
            source: {
                    host: headers['host'],
                    browser: headers['user-agent'],
                    time: Date.now()
            },

            created_at: new Date(Date.now()).toISOString()
        };

        await db.collection('users').insertOne(new_user, (err, user_created) => {
            if (err) {
                if (err.code == 11000) reject(MAIL_USED_ERR);
                else reject(err)
            }
            if (user_created) resolve(user_created);
        });
    })
}

const login = req => {
    return new Promise(async function (resolve, reject) {

        const user = req.body.user;
        const headers = req.headers;

        const db = req.app.locals.db.payment;

        await db.collection('users').findOne({
                email: user.email
            }, 
            async (err, user_found) => {
                
                if (err) console.log(err)

                if(!user_found) reject(MAIL_NOT_FOUND_ERR);

                else {
                    await bcrypt.compare(user.password, user_found.password, async (err, same) => {
                        if (err) console.log(err);

                        if (!same) {
                            reject(WRONG_PASSWORD_ERR);
                        }

                        else {
                            await db.collection('users').updateOne({
                                email: user.email
                            }, {
                                $set: {
                                    source: {
                                        host: headers['host'],
                                        browser: headers['user-agent'],
                                        time: Date.now()
                                    } 
                                }
                            }
                            );
        
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
const express = require('express');

const User = require('../controllers/user.controller');
const Token = require('../controllers/token.controller')

const signupValidator = require('../validations/signup.validation')

const router = express.Router();

router.post('/', signupValidator, async function (req, res) {
    try {

        User.create(req.body, req.headers).then(

            // On creation success
            () => {
                res.send({
                    status: 'success',
                    msg: 'User succesfully created'
                })
            },

            // On creation failure
            error => {
                res.send(error)
            }
        );

    } catch (error) {
        throw error
    }
})

module.exports = router
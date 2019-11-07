const express = require('express');

const User = require('../controllers/user.controller');
const Token = require('../controllers/token.controller')

const signupValidator = require('../validations/signup.validation')

const router = express.Router();

/**
 * @swagger
 *
 * /signup:
 *   post:
 *     description: Signup
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: Email to use for log in.
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         required: true
 *         type: string
 *       - name: details
 *         type: object,
 *         properties:
 *           first_name: 
 *             type: string
 *     
 *     responses:
 *       200:
 *         description: login
 */

router.post('/', async function (req, res) {
    try {

        User.create(req).then(

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
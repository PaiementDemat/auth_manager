const express = require('express');

const User = require('../controllers/user.controller');
const Token = require('../controllers/token.controller')

const router = express.Router();

/**
 * @swagger
 *
 * /login:
 *      
*   post:
*     description: Login to the application
*     produces:
*       - application/json
*     parameters:
*       - name: email
*         description: Email to use for login.
*         required: true
*         type: string
*       - name: password
*         description: User's password.
*         required: true
*         type: string
*         
*     responses:
*       200:
*         description: login
 */

router.post('/', async function (req, res) {
    try {
        
        User.login(req).then(

            // On creation success
            user => {
                const token = Token.createToken({
                    id: user._id,
                    email: user.email,
                    username: user.username,
                    host: user.source.host
                }, '2h');

                res.send({
                    status: 'success',
                    api_token: token
                });
            },

            // On creation failure
            error => {
                res.send(error)
            }

        )

    } catch (error) {
        throw error
    }
})

module.exports = router;
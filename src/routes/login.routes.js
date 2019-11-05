const express = require('express');

const User = require('../controllers/user.controller');
const Token = require('../controllers/token.controller')

const router = express.Router();

router.post('/', async function (req, res) {
    try {
        
        User.login(req.body, req.headers).then(

            // On creation success
            user => {
                const token = Token.createToken({
                    email: user.email,
                    username: user.username,
                    host: user.sources[0].host
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
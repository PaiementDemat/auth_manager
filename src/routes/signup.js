const express = require('express');

const User = require('../controllers/User');
const Token = require('../controllers/Token')

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const user = await User.create(req, res, next);

        if (user) {
            token = Token.createToken({
                user_id: user._id,
                email: user.email,
            }, 'mysecret', '30min')

            return res.send({
                status: 'success',
                api_token: token
            })
        }

    } catch (error) {
        throw error
    }
})

module.exports = router
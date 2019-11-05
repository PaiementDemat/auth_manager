const router = require('express').Router();

const signup = require('./signup.routes')

router.use('/signup', signup);

module.exports = router;
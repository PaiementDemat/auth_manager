const router = require('express').Router();

const signup = require('./signup.routes');
const login = require('./login.routes')

router.use('/signup', signup);
router.use('/login', login);

module.exports = router;
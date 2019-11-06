const router = require('express').Router();

const swaggerUi = require('swagger-ui-express');
const swaggerjsdoc = require('swagger-jsdoc');

const signup = require('./signup.route');
const login = require('./login.route');
const docs = require('../swagger/swagger_docs')

router.use('/signup', signup);
router.use('/login', login);


docs.apis.push('./src/routes/*.route.js')
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerjsdoc(docs), { explorer: true }));

module.exports = router;
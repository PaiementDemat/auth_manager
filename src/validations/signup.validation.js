const validate = require('validate.js')

const constraints = {
    email: {
        presence: true,
        email: true
    },
    password: {
        presence: true,
        length: {
            minimum: 6,
            message: "must be at least 6 characters"
          }
    },
}

const signupValidation = ( req, res, next ) => {
    validate.async(req.body, constraints, {fullMessages: false}).then(
        () => next(),

        errors => {
            if (errors instanceof Error) {
                console.err("An error ocurred", errors);
            } else {
                res.send({
                    status: 'failed',
                    errors
                })
            }
        }
    );
}

module.exports = signupValidation;
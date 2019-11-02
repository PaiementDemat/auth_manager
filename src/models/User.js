const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const User = new Schema({
    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true
    },

    details: {
        first_name: {
            type: String,
            required: true
        },

        last_name: {
            type: String,
            required: true
        }
    }

}, {
    timestamps: true,
    
});

User.pre('save', function(next) {
    try {
        bcrypt.hash(this.password, 10, (err, hash) => {
            if (err) return next(err);

            this.password = hash;
            next()
        });
    } catch (error) {
        throw error
    }
    
});

module.exports = mongoose.model('users', User);
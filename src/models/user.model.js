const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const config = require('../config/config');

const Schema = mongoose.Schema;

const User = new Schema({
    _id: Schema.Types.ObjectId,

    api_version: {
        type: String,
        default: config.API_VERSION
    },

    email: {
        type: String,
        required: true,
    },

    username: {
        type: String,
    },

    password: {
        type: String,
        required: true
    },

    details: {
        first_name: {
            type: String,
        },

        last_name: {
            type: String,
        },
    },

    sources: [ Schema.Types.Mixed ]
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
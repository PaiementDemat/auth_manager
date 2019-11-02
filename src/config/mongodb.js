const mongoose = require('mongoose');

const { USERSDB_URL } = require('./config')

mongoose.connect(USERSDB_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}, (err, client) => {
    if (err) throw err;

    return client;
})
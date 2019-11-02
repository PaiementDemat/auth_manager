const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    HOST: process.env.IP,
    PORT: process.env.PORT,

    USERSDB_URL: process.env.USERSDB_URL,

    JWT_SECRET: process.env.JWT_SECRET,
}
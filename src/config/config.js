const dotenv = require('dotenv');

const { version } = require('../../package.json')

dotenv.config();

module.exports = {
    API_VERSION: version,

    HOST: process.env.HOST || '0.0.0.0',
    PORT: process.env.PORT || 9999,

    MONGO_URL: process.env.MONGO_URL,

    JWT_SECRET: process.env.JWT_SECRET,
}
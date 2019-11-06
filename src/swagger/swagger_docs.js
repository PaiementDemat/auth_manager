const config = require('../config/config')

const docs = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "Authentification API",
        version: config.API_VERSION,
        description:
          "Sign up and log in endpoint",
        license: {
          name: "MIT",
        },
        contact: {
          name: "Florian Quibel",
          email: "florian.quibel27@gmail.com"
        }
      },
      servers: [
        {
          url: "http://localhost:9001/auth"
        }
      ]
    },
    apis: []
};


module.exports = docs;
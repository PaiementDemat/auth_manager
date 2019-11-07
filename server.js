const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const mongoClient = require('./src/config/mongodb')
const routes = require('./src/routes')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'))

app.use('/auth', routes)

app.listen(9999, '0.0.0.0', err => {
    if (err) throw err;

    console.log('Listening on http://0.0.0.0:9999')
})

process.on('exit', () => {
    mongoClient.connection.close()
})
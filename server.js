const express = require('express');
const bodyParser = require('body-parser');

const { HOST, PORT } = require('./src/config/config')

const mongoClient = require('./src/config/mongodb')
const routes = require('./src/routes')

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/auth', routes)

app.listen(9000, HOST, err => {
    if (err) throw err;

    console.log('Listening on http://' + HOST + ':' + PORT)
})

process.on('exit', code => {
    mongoClient.connection.close()
})
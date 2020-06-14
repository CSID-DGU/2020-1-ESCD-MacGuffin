const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const routes = require('./routes');
const databaseUtils = require('./databaseUtils')
const morgan = require('morgan');

const SERVER_CONFIG = JSON.parse(fs.readFileSync('server.json', 'utf-8'));

const app = express()

/**
 * application/json 형식 body parser
 */
app.use(bodyParser.json());

/**
 * cookie parser
 */
app.use(cookieParser());

/**
 * logger
 */
app.use(morgan('tiny'));

app.use('/api/session', routes.sessionRouter);

databaseUtils.testConnection()
    .then(() => {
        console.log('DB Connection succeed.');
        app.listen(
            SERVER_CONFIG.port,
            SERVER_CONFIG.host,
            () => console.log(`Server listening at http://${SERVER_CONFIG.host}:${SERVER_CONFIG.port}`)
        )
    })
    .catch(error => {
        console.error('DB Connection Failed.');
        console.error(error);
        process.exit(1);
    })

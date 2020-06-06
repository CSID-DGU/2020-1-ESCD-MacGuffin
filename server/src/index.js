const express = require('express')
const mysql = require('mysql2');
const app = express()
const port = 3000

function createConnection() {
    return mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '5688',
        database : 'assetmanager'
      });
}

app.get('/assets', (req, res) => {
    const connection = createConnection();
    connection.connect();

    connection.query('SELECT * FROM assetmanager.asset', (error, rows, fields) => {
        if (error) throw error;
        res.json(rows);
    });

    connection.end();
})

app.get('/assets/:assetId', (req, res) => {
    const assetId = req.params.assetId;

    const connection = createConnection();
    connection.connect();

    connection.query(`SELECT * FROM assetmanager.asset WHERE ID='${assetId}'`, (error, rows, fields) => {
        if (error) throw error;

        if (rows.length === 0) {
            res.status(404).end();
        } else {
            res.json(rows[0]);
        }
    });

    connection.end();
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

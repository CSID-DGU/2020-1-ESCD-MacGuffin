const fs = require('fs');
const mysql = require('mysql2/promise');

const DATABASE_CONFIG = JSON.parse(fs.readFileSync('database.json', 'utf-8'));

async function createConnection() {
    return await mysql.createConnection(DATABASE_CONFIG);
}

async function testConnection() {
    const connection = await createConnection();
    await connection.end();
}

function escape(string) {
    return mysql.escape(string);
}

module.exports = {
    createConnection,
    testConnection,
    escape,
};

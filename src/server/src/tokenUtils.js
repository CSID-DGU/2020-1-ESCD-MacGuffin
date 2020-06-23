const fs = require('fs');
const jwt = require('jsonwebtoken');

const SERVER_CONFIG = JSON.parse(fs.readFileSync('server.json', 'utf-8'));

function generateToken(payload, options) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            SERVER_CONFIG.jwtSecret,
            {
                expiresIn: SERVER_CONFIG.jwtExpireIn,
                ...options
            },
            (error, token) => {
                if (error) {
                    return reject(error);
                }

                resolve(token);
            }
        )
    })
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            SERVER_CONFIG.jwtSecret,
            (error, decoded) => {
                if (error) {
                    return reject(error);
                }

                resolve(decoded);
            }
        );
    })
}

module.exports = {
    generateToken,
    verifyToken,
}
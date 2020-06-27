const express = require('express');
const tokenUtils = require('../tokenUtils');
const databaseUtils = require('../databaseUtils');
const middlewares = require('../middlewares');
const crypto = require('crypto');
const queryUtils = require('../queryUtils');

const router = express.Router();

router.get('/', middlewares.verifyToken, middlewares.asyncHandler(async (req, res) => {
    const session = {
        userId: req.token.userId,
    };

    return res
        .status(200)
        .json(session);
}));

router.post('/', middlewares.validateRequestBody({ userId: 'string', password: 'string' }), middlewares.asyncHandler(async (req, res) => {
    const userId = req.body.userId;
    const password = crypto.createHash('sha512').update(req.body.password).digest('base64');

    const connection = await databaseUtils.createConnection();
    const [ users ] = await connection.query(queryUtils.user.list({ userId: userId, password: password }));
    await connection.end();

    if (users[0]) {
        const token = await tokenUtils.generateToken(
            {
                userId: userId,
            },
            {},
        );

        res.cookie('token', token);

        return res
            .status(201)
            .end();
    } else {
        res.clearCookie('token');

        return res
            .status(401)
            .end();
    }
}));

router.delete('/', middlewares.asyncHandler(async (req, res) => {
    res.clearCookie('token');

    return res
        .status(204)
        .end();
}));

module.exports = router;

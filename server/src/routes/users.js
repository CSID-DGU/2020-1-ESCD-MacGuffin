const express = require('express');
const databaseUtils = require('../databaseUtils');
const crypto = require('crypto');
const middlewares = require('../middlewares');
const queryUtils = require('../queryUtils');

const router = express.Router();

router.get('/', middlewares.verifyToken, async (req, res) => {

    const connection = await databaseUtils.createConnection();
    const [ users ] = await connection.query(queryUtils.user.list());

    return res
        .status(200)
        .json(users)
});

router.get('/:userId', middlewares.verifyToken, async (req, res) => {
    const userId = req.params.userId;

    const connection = await databaseUtils.createConnection();
    const [ users ] = await connection.query(queryUtils.user.list({ userId: userId }));

    if (!users[0]) {
        return res
            .status(404)
            .end();
    }

    return res
        .status(200)
        .json(users[0])
});


router.post('/', middlewares.validateRequestBody({ userId: 'string', password: 'string', userName: 'string' }), async (req, res) => {
    const userId = req.body.userId;
    const password = crypto.createHash('sha512').update(req.body.password).digest('base64');
    const userName = req.body.userName;

    const connection = await databaseUtils.createConnection();
    const [ users ] = await connection.query(queryUtils.user.list({ userId: userId }));

    if (users[0]) {
        return res
            .status(409)
            .end();
    }
    await connection.query(queryUtils.user.insert({ userId: userId, password: password, userName: userName }));

    await connection.end();

    return res
        .status(201)
        .end();
});

router.delete('/:userId', middlewares.verifyToken, async (req, res) => {
    const userId = req.params.userId;
    const connection = await databaseUtils.createConnection();
    await connection.query(queryUtils.user.delete({ userId: userId }));
    await connection.end();

    if (req.token.userId === userId) {
        res.clearCookie('token');
    }

    return res
        .status(204)
        .end();
});

module.exports = router;
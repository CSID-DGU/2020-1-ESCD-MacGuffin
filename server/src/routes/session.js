const express = require('express');
const tokenUtils = require('../tokenUtils');
const databaseUtils = require('../databaseUtils');
const middlewares = require('../middlewares');

const router = express.Router();

router.get('/', middlewares.verifyToken, async (req, res) => {
    const session = {
        userId: req.token.userId,
    }

    return res
        .status(200)
        .json(session);
});

router.post('/', async (req, res) => {
    const userId = req.body.userId;
    const password = req.body.password;

    const connection = await databaseUtils.createConnection();
    const result = await connection.query(`SELECT COUNT(*) AS \`Exists\` FROM \`user\` WHERE \`UserId\`='${escape(userId)}' AND \`PASSWORD\`=PASSWORD('${escape(password)}')`)
    await connection.end();

    if (result[0][0].Exists) {
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
});

router.delete('/', async (req, res) => {
    res.clearCookie('token');

    return res
        .status(204)
        .end();
});

module.exports = router;
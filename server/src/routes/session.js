const express = require('express');
const tokenUtils = require('../tokenUtils');
const databaseUtils = require('../databaseUtils');

const router = express.Router();

router.get('/', async (req, res) => {
    let token;

    try {
        token = await tokenUtils.verifyToken(req.cookies.token);
    } catch (e) {
        return unauthorized(res);
    }

    const session = {
        userId: token.userId,
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
        return unauthorized(res);
    }
});

router.delete('/', async (req, res) => {
    res.clearCookie('token');

    return res
        .status(204)
        .end();
});

function unauthorized(res) {
    res.clearCookie('token');

    return res
        .status(401)
        .end();
}

module.exports = router;
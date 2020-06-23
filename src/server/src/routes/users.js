const express = require('express');
const databaseUtils = require('../databaseUtils');
const crypto = require('crypto');
const middlewares = require('../middlewares');

const router = express.Router();

router.get('/', middlewares.verifyToken, async (req, res) => {

    const connection = await databaseUtils.createConnection();
    const result = await connection.query(`SELECT UserId AS userId, UserName AS userName FROM AssetManager.user`);

    return res
        .status(200)
        .json(result[0])
});

router.get('/:userId', middlewares.verifyToken, async (req, res) => {
    const userId = req.params.userId;

    const connection = await databaseUtils.createConnection();
    const result = await connection.query(`SELECT UserId AS userId, UserName AS userName FROM AssetManager.user WHERE \`UserId\`='${userId}'`);

    if (!result[0][0]) {
        return res
            .status(404)
            .end();
    }

    return res
        .status(200)
        .json(result[0][0])
});


router.post('/', async (req, res) => {
    const userId = req.body.userId;
    const password = crypto.createHash('sha512').update(req.body.password).digest('base64');
    const userName = req.body.userName;

    const connection = await databaseUtils.createConnection();
    const result = await connection.query(`SELECT COUNT(*) AS 'Exists' FROM AssetManager.user WHERE \`UserId\`='${userId}'`)

    if (result[0][0].Exists) {
        return res
            .status(409)
            .end();
    }
    await connection.query(`INSERT INTO \`user\` (\`UserId\`, \`Password\`, \`UserName\`) VALUES ('${userId}', '${password}', '${userName}')`)

    await connection.end();

    return res
        .status(201)
        .end();
});

router.delete('/:userId', middlewares.verifyToken, async (req, res) => {
    const userId = req.params.userId;
    const connection = await databaseUtils.createConnection();
    await connection.query(`DELETE FROM user WHERE \`UserId\`='${userId}'`);
    await connection.end();

    if (req.token.userId === userId) {
        res.clearCookie('token');
    }

    return res
        .status(204)
        .end();
});

module.exports = router;
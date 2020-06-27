const express = require('express');
const databaseUtils = require('../databaseUtils');
const middlewares = require('../middlewares');
const queryUtils = require('../queryUtils');

const router = express.Router();

router.get('/', middlewares.verifyToken, middlewares.asyncHandler(async (req, res) => {
    const userId = req.token.userId;

    const connection = await databaseUtils.createConnection();
    const [ assets ] = await connection.query(`${queryUtils.asset.list()} WHERE userEmail='${userId}' OR managerEmail='${userId}'`);
    await connection.end();

    return res
        .status(200)
        .json(assets);
}));

module.exports = router;

const express = require('express');
const databaseUtils = require('../databaseUtils');
const middlewares = require('../middlewares');
const queryUtils = require('../queryUtils');

const router = express.Router();

router.post('/', middlewares.validateRequestBody({ assetId: 'array', locationId: 'array', status: 'boolean' }), middlewares.asyncHandler(async (req, res) => {
    const assetId = req.body.assetId.join('.');
    const locationId = req.body.locationId.join('.');
    const status = req.body.status;

    const connection = await databaseUtils.createConnection();

    if (status) {
        try {
            await connection.query(queryUtils.stock.insert({ assetId: assetId, locationId: locationId }));
        } catch (e) {
            if (e.errno === 1452) {
                await connection.end();
                return res
                    .status(404)
                    .end();
            }

            if (e.errno === 1062) {
                await connection.end();
                return res
                    .status(409)
                    .end();
            }
        }

        await connection.end();
        return res
            .status(201)
            .end();
    } else {
        await connection.query(`${queryUtils.stock.delete({ assetId: assetId, locationId: locationId })}`);

        await connection.end();
        return res
            .status(204)
            .end();
    }
}));

module.exports = router;

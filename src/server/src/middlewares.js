const tokenUtils = require('./tokenUtils');

async function verifyToken(req, res, next) {
    let token;

    try {
        token = await tokenUtils.verifyToken(req.cookies.token);
        req.token = token;
        next();
    } catch (e) {
        res.clearCookie('token');

        return res
            .status(401)
            .end();
    }
}

module.exports = {
    verifyToken,
}
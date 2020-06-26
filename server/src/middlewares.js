const tokenUtils = require('./tokenUtils');

function validateRequestBody(filters) {
    return (req, res, next) => {
        if (Object.keys(filters).some(key => typeof req.body[key] !== filters[key])) {
            return res
                .status(400)
                .end();
        }

        return next();
    };
}

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
    validateRequestBody,
    verifyToken,
}
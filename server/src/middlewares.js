const tokenUtils = require('./tokenUtils');

function validateRequestBody(filters) {
    return (req, res, next) => {
        const invalidKeys = Object.keys(filters)
            .filter(key => {
                switch (filters[key]) {
                    case 'undefined':
                    case 'object':
                    case 'boolean':
                    case 'number':
                    case 'string':
                        return typeof req.body[key] !== filters[key];
                    case 'array':
                        return !Array.isArray(req.body[key]);
                    default:
                        return true;
                }
            });

        if (invalidKeys.length > 0) {
            return res
                .status(400)
                .json(invalidKeys.map(key => `'${key}' should be ${filters[key]}`));
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

function asyncHandler(fn) {
    return (req, res, next) => {
        return Promise
            .resolve(fn(req, res, next))
            .catch(next);
    };
}

module.exports = {
    asyncHandler,
    validateRequestBody,
    verifyToken,
};

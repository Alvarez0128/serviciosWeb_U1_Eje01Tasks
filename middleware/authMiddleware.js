const authUtils = require('./authUtils');


function authenticate(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({status: 401, message: 'Unauthorized'});
    }

    const decodedToken = authUtils.verifyToken(token);
    if (!decodedToken) {
        return res.status(401).json({status: 401, message: 'Unauthorized'});
    }

    req.user = decodedToken;
    next();
};

module.exports = authenticate;
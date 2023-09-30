const CustomAPIError = require('../errors');
const { isTokenValid } = require('../utils');

const authenticateUser = async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Thanh')) {
        token = authHeader.split(' ')[1];
    } else if (req.cookies.token) {
        token = req.cookies.token;
    }
    if (!token) {
        throw new CustomAPIError.UnauthenticatedError('Authentication invalid');
    }
    try {
        const payload = isTokenValid(token);

        // Attach the user and his permissions to the req object
        req.user = {
            userId: payload.user.userId,
            role: payload.user.role,
        };

        next();
    } catch (error) {
        throw new CustomAPIError.UnauthenticatedError('Authentication invalid');
    }
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new CustomAPIError.UnauthorizedError('Unauthorized to access this route');
        }
        next();
    };
};

module.exports = { authenticateUser, authorizeRoles };

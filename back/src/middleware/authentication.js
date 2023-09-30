const { PrismaClient } = require('@prisma/client');
const CustomAPIError = require('../errors');
const { attachCookiesToResponse, isTokenValid } = require('../utils');

const prisma = new PrismaClient();

const authenticateUser = async (req, res, next) => {
    const { refreshToken, accessToken } = req.signedCookies;

    try {
        if (accessToken) {
            const payload = isTokenValid(accessToken);
            req.user = payload.user;
            return next();
        }
        const payload = isTokenValid(refreshToken);

        const existingToken = await Token.findOne({
            user: payload.user.userId,
            refreshToken: payload.refreshToken,
        });

        if (!existingToken || !existingToken?.isValid) {
            throw new CustomAPIError.UnauthenticatedError('Authentication Invalid');
        }

        attachCookiesToResponse({
            res,
            user: payload.user,
            refreshToken: existingToken.refreshToken,
        });

        req.user = payload.user;
        next();
    } catch (error) {
        throw new CustomAPIError.UnauthenticatedError('Authentication Invalid');
    }
};

const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new CustomAPIError.UnauthorizedError('Unauthorized to access this route');
        }
        next();
    };
};

module.exports = {
    authenticateUser,
    authorizePermissions,
};

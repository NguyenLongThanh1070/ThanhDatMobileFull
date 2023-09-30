const jwt = require('jsonwebtoken')

const createJWT = ({ payload }) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    return token
}

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET)

const attachCookiesToResponse = ({ res, user, RefreshToken }) => {
    const AccessTokenJWT = createJWT({ payload: { user } })
    const RefreshTokenJWT = createJWT({ payload: { user, RefreshToken } })

    const oneDay = 1000 * 60 * 60 * 24
    const longerExp = 1000 * 60 * 60 * 24 * 30

    res.cookie('accessToken', AccessTokenJWT, {
        httpOnly: true,
        secure: true,
        signed: true,
        expires: new Date(Date.now() + oneDay),
    })

    res.cookie('refreshToken', RefreshTokenJWT, {
        httpOnly: true,
        secure: true,
        signed: true,
        expires: new Date(Date.now() + longerExp),
    })
}

module.exports = {
    createJWT,
    isTokenValid,
    attachCookiesToResponse,
}

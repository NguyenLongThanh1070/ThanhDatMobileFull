const CustomAPIError = require('../errors')

const checkPermissions = (requestUser, resourceUserId) => {
    if (requestUser.role === 'admin') return
    if (requestUser.PK_MaKhachHang === resourceUserId) return
    throw new CustomAPIError.UnauthorizedError('Not authorized to access this route')
}

module.exports = checkPermissions

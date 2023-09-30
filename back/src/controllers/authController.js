const { PrismaClient } = require('@prisma/client')
const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('../errors')
const crypto = require('crypto')
const {
    attachCookiesToResponse,
    createTokenUser,
    sendVerificationEmail,
    sendResetPasswordEmail,
    createHash,
} = require('../utils')
const prisma = new PrismaClient()

const register = async (req, res) => {
    let { TenKhachHang, DiaChi, SoDienThoai, Email, TenDangNhap, MatKhau } = req.body
    if (!TenKhachHang || !DiaChi || !SoDienThoai || !Email || !TenDangNhap || !MatKhau) {
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    let KhachHang = await prisma.tblKhachHang.findFirst({
        where: {
            Email: Email,
            TenDangNhap: TenDangNhap,
        },
    })
    if (KhachHang) {
        throw new CustomAPIError.BadRequestError('Tài khoản đã tồn tại')
    }
    const hashedPassword = crypto.createHash('sha256').update(MatKhau).digest('hex')
    const verificationToken = crypto.randomBytes(40).toString('hex')
    await prisma.tblKhachHang.create({
        data: {
            TenKhachHang: TenKhachHang,
            DiaChi: DiaChi,
            SoDienThoai: SoDienThoai,
            Email: Email,
            TenDangNhap: TenDangNhap,
            MatKhau: hashedPassword,
            VerificationToken: verificationToken,
        },
    })
    const origin = 'http://localhost:3000'
    // const newOrigin = 'https://react-node-user-workflow-front-end.netlify.app';

    // const tempOrigin = req.get('origin');
    // const protocol = req.protocol;
    // const host = req.get('host');
    // const forwardedHost = req.get('x-forwarded-host');
    // const forwardedProtocol = req.get('x-forwarded-proto');

    await sendVerificationEmail({
        TenDangNhap: TenDangNhap,
        Email: Email,
        verificationToken: verificationToken,
        origin,
    })
    return res.status(StatusCodes.CREATED).json({ msg: 'Đăng ký thành công, hãy kiểm tra email của bạn' })
}

const verifyEmail = async (req, res) => {
    const { verificationToken, Email } = req.body
    if (!verificationToken || !Email) {
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    const KhachHang = await prisma.tblKhachHang.findFirst({
        where: {
            Email: Email,
        },
    })
    if (KhachHang.length === 0) {
        throw new CustomAPIError.UnauthenticatedError('Không tìm thấy người dùng')
    }
    if (KhachHang[0].VerificationToken !== verificationToken) {
        throw new CustomAPIError.UnauthenticatedError('Không đúng token')
    }
    await prisma.tblKhachHang.update({
        data: {
            IsVerified: true,
            VerifiedDate: Date.now(),
            VerificationToken: '',
        },
        where: {
            Email: KhachHang.Email,
        },
    })
    return res.status(StatusCodes.OK).json({ msg: 'Xác thực email thành công' })
}

const login = async (req, res) => {
    const { TenDangNhap, MatKhau } = req.body
    if (!TenDangNhap || !MatKhau) {
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    let KhachHang = await prisma.tblKhachHang.findFirst({
        where: {
            TenDangNhap: TenDangNhap,
        },
    })
    if (!KhachHang) {
        throw new CustomAPIError.UnauthenticatedError('Tài khoản hoặc mật khẩu sai')
    }
    const hashedPassword = crypto.createHash('sha256').update(MatKhau).digest('hex')
    if (KhachHang[0].MatKhau !== hashedPassword) {
        throw new CustomAPIError.UnauthenticatedError('Sai mật khẩu!')
    }
    if (!KhachHang[0].IsVerified) {
        throw new CustomAPIError.UnauthenticatedError('Chưa xác nhận email')
    }
    const tokenUser = createTokenUser(KhachHang)
    let RefreshToken = ''
    const existingToken = await prisma.tblToken.findFirst({
        where: {
            FK_MaKhachHang: KhachHang.PK_MaKhachHang,
        },
    })
    if (existingToken) {
        const { IsValid } = existingToken
        if (!IsValid) {
            throw new CustomAPIError.UnauthenticatedError('Token không hợp lệ')
        }
        RefreshToken = existingToken.RefreshToken
        attachCookiesToResponse({ res, user: tokenUser, RefreshToken })
        res.status(StatusCodes.OK).json({ user: tokenUser })
        return
    }
    RefreshToken = crypto.randomBytes(40).toString('hex')
    const UserAgent = req.headers['user-agent']
    const IP = req.ip
    const UserToken = { RefreshToken, IP, UserAgent, FK_MaKhachHang: user.PK_MaKhachHang }
    await prisma.tblToken.create({
        data: UserToken,
    })
    attachCookiesToResponse({ res, user: tokenUser, RefreshToken })
    res.status(StatusCodes.OK).json({ user: tokenUser })
}

const logout = async (req, res) => {
    await prisma.tblToken.delete({
        where: {
            FK_MaKhachHang: req.user.PK_MaKhachHang,
        },
    })
    res.cookie('accessToken', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    })
    res.cookie('refreshToken', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    })
    res.status(StatusCodes.OK).json({ msg: 'Đăng xuất' })
}

const forgotPassword = async (req, res) => {
    const { Email } = req.body
    if (!Email) {
        throw new CustomAPIError.BadRequestError('Hãy cung cấp email')
    }
    const KhachHang = await prisma.tblKhachHang.findFirst({
        where: {
            Email: Email,
        },
    })
    if (KhachHang) {
        const passwordToken = crypto.randomBytes(70).toString('hex')
        const origin = 'http://localhost:3000'
        await sendResetPasswordEmail({
            TenDangNhap: KhachHang.TenDangNhap,
            Email: KhachHang.Email,
            Token: passwordToken,
            origin,
        })
        const tenMinutes = 1000 * 60 * 10
        const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes)

        await prisma.tblKhachHang.update({
            data: {
                passwordToken: createHash(passwordToken),
                PasswordTokenExpiration: passwordTokenExpirationDate,
            },
            where: {
                PK_MaKhachHang: KhachHang.PK_MaKhachHang,
            },
        })
    }
    res.status(StatusCodes.OK).json({ msg: 'Kiểm tra email của bạn' })
}

const resetPassword = async (req, res) => {
    const { Token, Email, MatKhau } = req.body
    if (!Token || !Email || !MatKhau) {
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    const KhachHang = prisma.tblKhachHang.findFirst({
        data: {
            Email: Email,
        },
    })
    if (KhachHang) {
        const currentDate = new Date()
        if (KhachHang[0].PasswordToken === createHash(Token) && KhachHang[0].PasswordTokenExpiration > currentDate) {
            await prisma.tblKhachHang.update({
                data: {
                    MatKhau: MatKhau,
                    PasswordToken: null,
                    PasswordTokenExpiration: null,
                },
                where: {
                    Email: Email,
                },
            })
        }
    }
    res.status(StatusCodes.OK).json({ msg: 'Đổi mật khẩu thành công' })
}

module.exports = {
    register,
    verifyEmail,
    login,
    logout,
    forgotPassword,
    resetPassword,
}

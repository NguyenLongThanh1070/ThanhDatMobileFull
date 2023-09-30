const { PrismaClient } = require('@prisma/client')
const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('../errors')
const crypto = require('crypto')

const prisma = new PrismaClient()

const getKhachHang = async (req, res) => {
    console.log(req.user)
    const KhachHang = await prisma.tblKhachHang.findMany({})
    if (!KhachHang) {
        throw new CustomAPIError.NotFoundError('Không tìm thấy người dùng nào!')
    }
    return res.status(StatusCodes.OK).json(KhachHang)
}

const addKhachHang = async (req, res) => {
    let { TenKhachHang, DiaChi, SoDienThoai, Email, TenDangNhap, MatKhau, IsVerified, TinhTrangHoatDong } = req.body
    if (!TenKhachHang || !DiaChi || !SoDienThoai || !Email || !TenDangNhap || !MatKhau) {
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    let checkKhachHang = await prisma.tblKhachHang.findFirst({
        where: {
            TenDangNhap: TenDangNhap,
        },
    })
    const hashedPassword = crypto.createHash('sha256').update(MatKhau).digest('hex')
    IsVerified = !!IsVerified
    TinhTrangHoatDong = !!TinhTrangHoatDong
    if (!checkKhachHang) {
        await prisma.tblKhachHang.create({
            data: {
                TenKhachHang: TenKhachHang,
                DiaChi: DiaChi,
                SoDienThoai: SoDienThoai,
                Email: Email,
                TenDangNhap: TenDangNhap,
                MatKhau: hashedPassword,
                IsVerified: IsVerified,
                TinhTrangHoatDong: TinhTrangHoatDong,
            },
        })
        const KhachHang = await prisma.tblKhachHang.findMany({})
        res.status(StatusCodes.CREATED).json(KhachHang)
    } else {
        throw new CustomAPIError.BadRequestError('Trùng khách')
    }
}

const updateKhachHang = async (req, res) => {
    let { TenKhachHang, DiaChi, SoDienThoai, Email, TenDangNhap, MatKhau, IsVerified, TinhTrangHoatDong } = req.body
    const PK_MaKhachHang = parseInt(req.params.id)
    if (!TenKhachHang || !DiaChi || !SoDienThoai || !Email || !TenDangNhap || !MatKhau) {
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    const hashedPassword = crypto.createHash('sha256').update(MatKhau).digest('hex')
    IsVerified = !!IsVerified
    TinhTrangHoatDong = !!TinhTrangHoatDong
    await prisma.tblKhachHang.update({
        data: {
            TenKhachHang: TenKhachHang,
            DiaChi: DiaChi,
            SoDienThoai: SoDienThoai,
            Email: Email,
            TenDangNhap: TenDangNhap,
            MatKhau: hashedPassword,
            IsVerified: IsVerified,
            TinhTrangHoatDong: TinhTrangHoatDong,
        },
        where: {
            PK_MaKhachHang: PK_MaKhachHang,
        },
    })
    const KhachHang = await prisma.tblKhachHang.findMany({})
    res.status(StatusCodes.OK).json(KhachHang)
}

const deleteKhachHang = async (req, res) => {
    let PK_MaKhachHang = parseInt(req.params.id)
    if (!PK_MaKhachHang) {
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    await prisma.tblKhachHang.delete({
        where: {
            PK_MaKhachHang: PK_MaKhachHang,
        },
    })
    const KhachHang = await prisma.tblKhachHang.findMany({})
    res.status(StatusCodes.OK).json(KhachHang)
}

module.exports = {
    addKhachHang,
    getKhachHang,
    updateKhachHang,
    deleteKhachHang,
}

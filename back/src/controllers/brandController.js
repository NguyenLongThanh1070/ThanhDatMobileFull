const { PrismaClient } = require('@prisma/client')
const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('../errors')

const prisma = new PrismaClient()

const createBrand = async (req, res) => {
    let { TenHang, MoTa } = req.body
    if (!TenHang || !MoTa) {
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    let brand = prisma.tblHang.findFirst({
        where: {
            TenHang: TenHang,
        },
    })
    if (!brand) {
        await prisma.tblHang.create({
            data: {
                TenHang: TenHang,
                MoTa: MoTa,
            },
        })
        res.status(StatusCodes.CREATED).json(brand)
    } else {
        throw new CustomAPIError.BadRequestError('Nhãn hàng đã tồn tại')
    }
}
const getAllBrands = async (req, res) => {
    let brand = prisma.tblHang.findMany({})
    if (!brand) {
        throw new CustomAPIError.NotFoundError('Không tìm thấy hãng nào')
    }
    res.status(StatusCodes.OK).json(brand)
}

const updateBrand = async (req, res) => {
    let PK_MaHang = parseInt(req.params.PK_MaHang)
    if (!PK_MaHang) {
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    let brand = prisma.tblHang.findFirst({
        where: {
            TenHang: TenHang,
        },
    })
    if (brand) {
        await prisma.tblHang.update({
            data: {
                TenHang: TenHang,
                MoTa: MoTa,
            },
            where: {
                PK_MaHang: PK_MaHang,
            },
        })
        res.status(StatusCodes.OK).json(brand)
    } else {
        throw new CustomAPIError.BadRequestError('Không tìm thấy nhãn hàng')
    }
}

const deleteBrand = async (req, res) => {
    let PK_MaHang = parseInt(req.params.PK_MaHang)
    if (!PK_MaHang) {
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    let brand = prisma.tblHang.findFirst({
        where: {
            TenHang: TenHang,
        },
    })
    if (brand) {
        await prisma.tblHang.delete({
            data: {
                TenHang: TenHang,
                MoTa: MoTa,
            },
            where: {
                PK_MaHang: PK_MaHang,
            },
        })
        res.status(StatusCodes.OK).json({ msg: 'Đã xóa thành công' })
    } else {
        throw new CustomAPIError.BadRequestError('Không tìm thấy nhãn hàng')
    }
}

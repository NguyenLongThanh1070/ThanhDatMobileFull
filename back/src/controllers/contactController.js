const { PrismaClient } = require('@prisma/client')
const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('../errors')

const prisma = new PrismaClient()

const getContact = async (req, res) => {
    const contacts = await prisma.tblLienHe.findMany({})
    if (!contacts) {
        throw new CustomAPIError.NotFoundError('Không tìm thấy contacts')
    }
    res.status(StatusCodes.OK).json(contacts)
}

const addContact = async (req, res) => {
    const { TenNguoiGui, Email, SoDienThoai, TinNhan } = req.body
    if (!TenNguoiGui || !Email || !SoDienThoai || !TinNhan) {
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    await prisma.tblLienHe.create({
        data: {
            TenNguoiGui: TenNguoiGui,
            Email: Email,
            SoDienThoai: SoDienThoai,
            TinNhan: TinNhan,
        },
    })
    const contacts = await prisma.tblLienHe.findMany({})
    res.status(StatusCodes.CREATED).json(contacts)
}
const updateContact = async (req, res) => {
    const { TenNguoiGui, Email, SoDienThoai, TinNhan } = req.body
    const PK_MaLienHe = parseInt(req.params.id)
    if (!TenNguoiGui || !Email || !SoDienThoai || !TinNhan) {
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    await prisma.tblLienHe.update({
        data: {
            TenNguoiGui: TenNguoiGui,
            Email: Email,
            SoDienThoai: SoDienThoai,
            TinNhan: TinNhan,
        },
        where: {
            PK_MaLienHe: PK_MaLienHe,
        },
    })
    const contacts = await prisma.tblLienHe.findMany({})
    res.status(StatusCodes.OK).json(contacts)
}

const deleteContact = async (req, res) => {
    const PK_MaLienHe = parseInt(req.params.id)
    if (!PK_MaLienHe) {
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    await prisma.tblLienHe.delete({
        where: {
            PK_MaLienHe: PK_MaLienHe,
        },
    })
    const contacts = await prisma.tblLienHe.findMany({})
    res.status(StatusCodes.OK).json(contacts)
}
module.exports = {
    getContact,
    addContact,
    updateContact,
    deleteContact,
}

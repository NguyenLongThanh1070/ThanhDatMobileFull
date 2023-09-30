const { PrismaClient } = require('@prisma/client')
const { redisGet, redisSet } = require('../utils/redisGetSet')
const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('../errors')
const prisma = new PrismaClient()

const getCart = async (req, res) => {
    const { TenDangNhap } = req.params
    if (!TenDangNhap) {
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    const cart = await prisma.tblGioHang.findMany({
        where: {
            TenDangNhap: TenDangNhap,
            TrangThaiThanhToan: 0,
        },
    })
    res.status(StatusCodes.OK).json(cart)
}

let addToCart = async (req, res) => {
    let { id, images, name, price, quantity, username } = req.body
    id = Number(id)
    quantity = Number(quantity)
    await prisma.tblGioHang.create({
        data: {
            id: id,
            images: images,
            name: name,
            price: price,
            quantity: quantity,
            username: username,
            paid: 'no',
        },
    })
    let products = await redisGet()
    if (products.length == 0) {
        await redisSet()
        products = await redisGet()
    }
    res.status(StatusCodes.OK).json({
        products,
        status: 'Thêm vào giỏ hàng thành công',
        username: req.user.username,
    })
}

let removeFromCart = async (req, res) => {
    let { cartID } = req.body
    cartID = Number(cartID)
    await prisma.carts.delete({
        where: {
            cartID: cartID,
        },
    })
    return res.status(StatusCodes.OK).json({})
}

module.exports = {
    getCart,
    addToCart,
    removeFromCart,
}

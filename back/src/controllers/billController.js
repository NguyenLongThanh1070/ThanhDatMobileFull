const { PrismaClient } = require('@prisma/client')
const { StatusCodes } = require('http-status-codes')
const { redisGet, redisSet } = require('../utils/redisGetSet')
const CustomAPIError = require('../errors')
const { checkPermissions } = require('../utils')

const prisma = new PrismaClient()

let checkOut = async (req, res) => {
    let { TenNguoiNhan, DiaChiGiaoHang, SoDienThoai, FK_MaNguoiDung } = req.body
    if (address == '' || phone == '') {
        return res.redirect('/giohang')
    }
    await prisma.bill.create({
        data: {
            price: price,
            address: address,
            phone: phone,
            username: username,
            paid: 'no',
        },
    })
    let bill = await prisma.bill.findMany({
        where: {
            username: username,
            paid: 'no',
        },
    })
    let cart = await prisma.carts.findMany({
        where: {
            username: username,
            paid: 'no',
        },
    })
    for (let i = 0; i < cart.length; i++) {
        await prisma.billDetails.create({
            data: {
                billID: bill[0].billID,
                productName: cart[i].name,
                quantity: cart[i].quantity,
                price: cart[i].price,
            },
        })
    }
    await prisma.bill.updateMany({
        where: {
            username: username,
            paid: 'no',
        },
        data: {
            paid: 'yes',
        },
    })
    await prisma.carts.updateMany({
        where: {
            username: username,
            paid: 'no',
        },
        data: {
            paid: 'yes',
        },
    })
    let products = await redisGet()
    if (products.length == 0) {
        await redisSet()
        products = await redisGet()
    }
    res.status(StatusCodes.OK).json({
        products,
        username: req.session.username,
        status: 'Cảm ơn bạn đã mua hàng',
    })
}

module.exports = checkOut

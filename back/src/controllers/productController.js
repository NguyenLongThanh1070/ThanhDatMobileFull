const { PrismaClient } = require('@prisma/client')
const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('../errors')
const path = require('path')

const prisma = new PrismaClient()

const createProduct = async (req, res) => {
    let { images, name, price, resolution, os, frontcam, backcam, ram, rom, pin, quantity } = req.body
    if (
        !images ||
        !name ||
        !price ||
        !resolution ||
        !os ||
        !frontcam ||
        !backcam ||
        !ram ||
        !rom ||
        !pin ||
        !quantity
    ) {
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    let product = await prisma.products.findMany({
        where: {
            name: name,
        },
    })
    if (product.length === 0) {
        await prisma.products.create({
            data: {
                images: images,
                name: name,
                price: price,
                resolution: resolution,
                os: os,
                frontcam: frontcam,
                backcam: backcam,
                ram: ram,
                rom: rom,
                pin: pin,
                quantity: quantity,
            },
        })
        res.status(StatusCodes.CREATED).json({ product })
    } else {
        throw new CustomAPIError.BadRequestError('Sản phẩm đã tồn tại')
    }
}

const getAllProducts = async (req, res) => {
    let products = await prisma.tblDienThoai.findMany({})
    if (products.length === 0) {
        throw new CustomAPIError.NotFoundError('Không tìm thấy sản phẩm')
    }
    res.status(StatusCodes.OK).json(products)
}

const getSingleProduct = async (req, res) => {
    const productId = parseInt(req.params.productId)
    const product = await prisma.products.findUnique({
        where: {
            id: productId,
        },
    })
    if (product.length === 0) {
        throw new CustomAPIError.NotFoundError(`Không tìm thấy sản phẩm với id: ${productId}`)
    }
    res.status(StatusCodes.OK).json(product)
}

const updateProduct = async (req, res) => {
    const productId = parseInt(req.params.productId)
    const { images, name, price, resolution, os, frontcam, backcam, ram, rom, pin, quantity } = req.body
    if (
        !id ||
        !images ||
        !name ||
        !price ||
        !resolution ||
        !os ||
        !frontcam ||
        !backcam ||
        !ram ||
        !rom ||
        !pin ||
        !quantity
    ) {
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    const product = await prisma.products.findUnique({
        where: {
            id: productId,
        },
    })
    if (product.length !== 0) {
        await prisma.products.update({
            data: {
                images: images,
                name: name,
                price: price,
                resolution: resolution,
                os: os,
                frontcam: frontcam,
                backcam: backcam,
                ram: ram,
                rom: rom,
                pin: pin,
                quantity: quantity,
            },
            where: {
                id: productId,
            },
        })
        res.status(StatusCodes.OK).json({ product })
    } else {
        throw new CustomAPIError.NotFoundError('Không tìm thấy sản phẩm')
    }
}

const deleteProduct = async (req, res) => {
    const productId = Number(req.params.productId)

    const product = await prisma.products.findUnique({
        where: {
            id: productId,
        },
    })
    if (product.length === 0) {
        throw new CustomAPIError.NotFoundError('Không tìm thấy sản phẩm')
    }
    await prisma.products.delete({
        where: {
            id: productId,
        },
    })
    res.status(StatusCodes.OK).json({ msg: 'Success!' })
}

const uploadImage = async (req, res) => {
    if (!req.files) {
        throw new CustomAPIError.BadRequestError('Chưa upload file')
    }
    const productImage = req.files.image
    if (!productImage.mimetype.startsWith('image')) {
        throw new CustomAPIError.BadRequestError('Chưa upload file')
    }
    const maxSize = 1024 * 1024
    if (productImage.size > maxSize) {
        throw new CustomAPIError.BadRequestError('Kích cỡ ảnh quá lớn')
    }
    const imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`)
    await productImage.mv(imagePath)
    res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` })
}

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
}

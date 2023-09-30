const { PrismaClient } = require('@prisma/client');
const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('../errors');

const prisma = new PrismaClient();

const createFeedback = async (req, res) => {
    const { name, email, phone, message } = req.body;
    await prisma.feedback.create({
        data: {
            name: name,
            email: email,
            phone: phone,
            message: message,
        },
    });
    res.status(StatusCodes.OK).json({ msg: 'create ok' });
};

module.exports = createFeedback;

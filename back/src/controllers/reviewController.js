const { PrismaClient } = require('@prisma/client');
const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('../errors');
const { checkPermissions } = require('../utils');

const prisma = new PrismaClient();

const createReview = async (req, res) => {
    const id = req.body.id;

    const isValidProduct = await prisma.products.findFirst({
        where: {
            id: id,
        },
    });

    if (!isValidProduct) {
        throw new CustomAPIError.NotFoundError(`No product with id : ${id}`);
    }

    const alreadySubmitted = await prisma.reviews.findFirst({
        id: id,
        userid: req.user.userId,
    });

    if (alreadySubmitted) {
        throw new CustomAPIError.BadRequestError('Already submitted review for this product');
    }

    req.body.user = req.user.userId;
    await prisma.reviews.create(req.body);

    res.status(StatusCodes.CREATED).json({ getAllReviews });
};

const getAllReviews = async (req, res) => {
    const id = req.body.id;
    const reviews = await prisma.reviews.findMany({
        where: {
            id: id,
        },
    });
    res.status(StatusCodes.OK).json({ reviews });
};

const updateReview = async (req, res) => {
    const { id: reviewId } = req.params;
    const { rating, title, comment } = req.body;
    const review = await prisma.reviews.findFirst({
        reviewId: reviewId,
    });
    if (review.length === 0) {
        throw new CustomAPIError.NotFoundError(`No review with id ${reviewId}`);
    }
    checkPermissions(req.user, review.userid);
    await prisma.reviews.update({
        data: {
            rating: rating,
            title: title,
            comments: comment,
        },
        where: {
            reviewId: reviewId,
        },
    });
    res.status(StatusCodes.OK).json({ review });
};

const deleteReview = async (req, res) => {
    const { id: reviewId } = req.params;

    const reviews = await prisma.reviews.findFirst({
        reviewId: reviewId,
    });
    if (reviews.length === 0) {
        throw new CustomAPIError.NotFoundError(`No review with id ${reviewId}`);
    }
    checkPermissions(req.user, review.user);
    await prisma.reviews.delete({
        where: {
            reviewId: reviewId,
        },
    });
    res.status(StatusCodes.OK).json({ msg: 'Success! Review removed' });
};

module.exports = {
    createReview,
    getAllReviews,
    updateReview,
    deleteReview,
};

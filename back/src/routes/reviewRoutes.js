const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');

const { createReview, getAllReviews, updateReview, deleteReview } = require('../controllers/reviewController');

router.route('/').post(authenticateUser, createReview).get(getAllReviews);

router.patch('/update-review', authenticateUser, updateReview);
router.delete('/delete-review', authenticateUser, deleteReview);

module.exports = router;

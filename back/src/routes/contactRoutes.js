const express = require('express')
const router = express.Router()
const { getContact, addContact, updateContact, deleteContact } = require('../controllers/contactController')

router.route('/').post(addContact).get(getContact)
router.route('/:id').put(updateContact).delete(deleteContact)

module.exports = router

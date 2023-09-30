const express = require('express')
const router = express.Router()
const { addKhachHang, getKhachHang, updateKhachHang, deleteKhachHang } = require('../controllers/KhachHangController')

router.route('/').post(addKhachHang).get(getKhachHang)

router.route('/:id').put(updateKhachHang).delete(deleteKhachHang)

module.exports = router

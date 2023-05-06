const router = require('express').Router()
const authController = require('../../controllers/authController')

router.post('/change_password', authController.changePassword)

module.exports = router
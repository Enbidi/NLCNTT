const router = require('express').Router()

const authController = require("../../controllers/authController");

router.get('/login/federated/google', authController.oauth2Get)

router.get('/redirect/google', authController.oauth2Redirect)

module.exports = router
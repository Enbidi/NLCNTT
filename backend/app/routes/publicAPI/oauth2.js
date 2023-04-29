const router = require('express').Router()

const authController = require("../../controllers/authController");

router.get('/login/federated/google', authController.oauth2GoogleGet)

router.get('/login/federated/facebook', authController.oauth2FacebookGet)

router.get('/redirect/google', authController.oauth2GoogleRedirect)

router.get('/redirect/facebook', authController.oauth2FacebookRedirect)

module.exports = router
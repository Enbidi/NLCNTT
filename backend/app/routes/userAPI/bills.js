const router = require("express").Router();

const billController = require("../../controllers/billController");

router.post("/add", billController.addBillPost);

module.exports = router;
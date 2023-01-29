const router = require("express").Router();

const billController = require("../../controllers/billController");

const userController = require("../../controllers/userController");

router.get("/", billController.getBillHistory);

router.post("/add", billController.addBillPost);

// router.get("/bill_history", billController.userBillHistory));

module.exports = router;
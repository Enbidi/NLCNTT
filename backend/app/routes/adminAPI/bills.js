const router = require("express").Router();

const billController = require("../../controllers/billController");

router.get("/", billController.billsGet);

router.post("/add", billController.addBillPost);

router.patch("/:id/update", billController.billPatch);

router.delete("/:id/delete", billController.billDelete);

module.exports = router;
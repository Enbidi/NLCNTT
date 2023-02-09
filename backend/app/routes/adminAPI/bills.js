const router = require("express").Router();

const billController = require("../../controllers/billController");

router.get("/", billController.billsGet);

router.post("/add", billController.addBillPost);

router.delete("/delete", billController.deleteBills);

router.patch("/:id/update", billController.billPatch);

router.delete("/:id/delete", billController.billDelete);

router.get("/statistic", billController.getMonthlyStatistic)

router.get("/revenue", billController.getRevenueInCurrentMonth)

module.exports = router;
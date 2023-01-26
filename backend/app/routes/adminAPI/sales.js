const express = require("express");
const router = express.Router();

const saleController = require("../../controllers/saleController");

router.get("/", saleController.salesGet);

router.post("/add", saleController.addSalePost);

router.patch("/:id/update", saleController.salePatch);

router.delete("/:id/delete", saleController.saleDelete);

module.exports = router;
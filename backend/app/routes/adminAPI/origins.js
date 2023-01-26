const express = require("express");
const router = express.Router();

const originController = require("../../controllers/originController");


router.get("/", originController.originsGet);

router.post("/add", originController.addOriginPost);

router.patch("/:id/update", originController.updateOriginPost);

router.delete("/:id/delete", originController.deleteOriginGet);

router.get("/find", originController.findOriginByNameGet);

module.exports = router;
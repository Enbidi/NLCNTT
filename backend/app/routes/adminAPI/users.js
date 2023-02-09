const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");

router.get("/", userController.usersGet);

router.post("/add", userController.addUserPost);

router.patch("/:id/update", userController.userPatch);

router.delete("/:id/delete", userController.userDelete);

router.get("/find", userController.findUserByNameGet);

router.get("/statistic", userController.getMonthlyRegisterdUserStatistic);

router.get("/size", userController.getSize);

module.exports = router;
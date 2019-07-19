const express = require("express");
const router = express.Router();
const controller = require("../controllers/numeroController")();
router.get("/:loteria", controller.get);
router.get("/:loteria/:id", controller.getSingle);
router.get("/:loteria/:id/dados", controller.getDados);
module.exports = router;

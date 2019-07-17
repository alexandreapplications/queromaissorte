const express = require("express");
const router = express.Router();
const Controller = require("../controllers/lotofacilController");
const controller = new Controller();
router.get("/", controller.getList);
router.get("/getInfo", controller.getInfo);
router.get("/:id", controller.getSingle);
router.post("/", controller.uploadFile);
module.exports = router;

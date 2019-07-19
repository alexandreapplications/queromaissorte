const express = require("express");
const router = express.Router();
const lotofacilController = require("../controllers/lotofacilController")();
router.get("/", lotofacilController.getList);
router.get("/getInfo", lotofacilController.getInfo);
router.get("/:id", lotofacilController.getSingle);
router.post("/", lotofacilController.uploadFile);
router.post("/updateStatistics", lotofacilController.updateStatistics);
module.exports = router;

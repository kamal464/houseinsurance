// routes/homeInsuranceRoutes.js
const express = require("express");
const router = express.Router();
const homeInsuranceController = require("../Controllers/homeInsuranceController");


// CRUD routes for home insurance data
router.post("/",  homeInsuranceController.getAll);
router.get("/:id", homeInsuranceController.getOne);
router.post("/add", homeInsuranceController.create);
router.put("/:id", homeInsuranceController.update);
router.delete("/:id", homeInsuranceController.delete);


module.exports = router;

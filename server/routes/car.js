const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");

router.get("/", carController.homepage);
router.get("/add", carController.addCar);
router.post("/add", carController.postCar);
router.get("/edit/:id", carController.editCar);
router.put("/edit/:id", carController.editCarPost);


module.exports = router;

const express = require("express");
const {
  BMIChecker,
  HeartChecker,
  DiabetesChecker,
} = require("../controllers/HealthCheckers.js");

const router = express.Router();

router.post("/bmi", BMIChecker);
router.post("/heart", HeartChecker);
router.post("/diabetes", DiabetesChecker);

module.exports = router;
const axios = require("axios");

const BMIChecker = async (req, res, next) => {
  try {
    const { weight, height } = req.body;
    if (!weight || !height) {
      return res.status(400).json({ error: "Weight and height are required" });
    }

    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (isNaN(w) || isNaN(h) || h <= 0) {
      return res.status(400).json({ error: "Invalid input values" });
    }

    const bmi = w / ((h / 100) ** 2);
    return res.status(200).json({ bmi: bmi.toFixed(2) });
  } catch (error) {
    return next(error);
  }
};

const HeartChecker = async (req, res, next) => {
  try {
    const { age, trestbps, chol, thalach } = req.body;

    // Validate required fields
    if ([age, trestbps, chol, thalach].some(v => v === undefined || v === null)) {
      return res.status(400).json({ error: "All heart parameters are required" });
    }

    // Call ML prediction service
    const response = await axios.post("http://127.0.0.1:5000/predict/heart", {
      age,
      trestbps,
      chol,
      thalach
    });

    // Extract prediction and chance from response
    const { prediction, chance } = response.data;

    if (prediction === 0) {
      return res.status(200).json({ hasDisease: false, chance });
    } else if (prediction === 1) {
      return res.status(200).json({ hasDisease: true, chance });
    } else {
      return res.status(500).json({ error: "Unexpected prediction result" });
    }
  } catch (error) {
    console.error("Prediction error:", error.message);
    return next(error);
  }
};

const DiabetesChecker = async (req, res, next) => {
  try {
    const { Glucose, BloodPressure, BMI, Age } = req.body;

    // Validate required fields
    if ([Glucose, BloodPressure, BMI, Age].some(v => v === undefined || v === null)) {
      return res.status(400).json({ error: "All diabetes parameters are required" });
    }

    // Call ML prediction service
    const response = await axios.post("http://127.0.0.1:5000/predict/diabetes", {
      Glucose,
      BloodPressure,
      BMI,
      Age,
    });

    // Extract prediction and chance from response
    const { prediction, chance } = response.data;

    if (prediction === 0) {
      return res.status(200).json({ hasDiabetes: false, chance });
    } else if (prediction === 1) {
      return res.status(200).json({ hasDiabetes: true, chance });
    } else {
      return res.status(500).json({ error: "Unexpected prediction result" });
    }
  } catch (error) {
    console.error("Prediction error:", error.message);
    return next(error);
  }
};

module.exports = { BMIChecker, HeartChecker, DiabetesChecker };
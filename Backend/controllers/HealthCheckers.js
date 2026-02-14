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
    const { age, gender } = req.body;
    if (!age || !gender) {
      return res.status(400).json({ error: "Age and gender are required" });
    }

    const heartRate = gender === "male" ? 72 : 74;
    return res.status(200).json({ heartRate });
  } catch (error) {
    return next(error);
  }
};

const DiabetesChecker = async (req, res, next) => {
  try {
    const { age, familyHistory } = req.body;
    if (!age || !familyHistory) {
      return res.status(400).json({ error: "Age and family history are required" });
    }

    const riskFactor = familyHistory === "yes" ? 0.8 : 0.2;
    return res.status(200).json({ riskFactor });
  } catch (error) {
    return next(error);
  }
};

module.exports = { BMIChecker, HeartChecker, DiabetesChecker };
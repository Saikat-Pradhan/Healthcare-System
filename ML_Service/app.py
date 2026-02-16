from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# ==============================
# Load Models (runs once)
# ==============================

heart_model = pickle.load(open("heart_disease_model.pkl", "rb"))
diabetes_model = pickle.load(open("diabetes_model.pkl", "rb"))

# ==============================
# Health Check Route (optional)
# ==============================

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "ML Service Running"})

# ==============================
# HEART DISEASE PREDICTION
# ==============================

@app.route("/predict/heart", methods=["POST"])
def predict_heart():
    try:
        data = request.json or {}

        # Safely extract values
        age = float(data.get("age", 0))
        trestbps = float(data.get("trestbps", 0))
        chol = float(data.get("chol", 0))
        thalach = float(data.get("thalach", 0))

        # Basic validation
        if not all([age, trestbps, chol, thalach]):
            return jsonify({
                "success": False,
                "error": "All parameters (age, trestbps, chol, thalach) are required"
            }), 400

        features = np.array([[age, trestbps, chol, thalach]])

        # Get probability instead of just class
        proba = heart_model.predict_proba(features)[0]  # [prob_class0, prob_class1]
        prediction = int(np.argmax(proba))              # 0 or 1
        chance = float(proba[1]) * 100                  # percentage chance of heart disease

        return jsonify({
            "success": True,
            "prediction": prediction,
            "chance": round(chance, 2)  # e.g. 72.45%
        })

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400

# ==============================
# DIABETES PREDICTION
# ==============================

@app.route("/predict/diabetes", methods=["POST"])
def predict_diabetes():
    try:
        data = request.json or {}

        # Safely extract values
        glucose = float(data.get("Glucose", 0))
        bp = float(data.get("BloodPressure", 0))
        bmi = float(data.get("BMI", 0))
        age = float(data.get("Age", 0))

        # Basic validation
        if not all([glucose, bp, bmi, age]):
            return jsonify({
                "success": False,
                "error": "All parameters (Glucose, BloodPressure, BMI, Age) are required"
            }), 400

        features = np.array([[glucose, bp, bmi, age]])

        # Get probability instead of just class
        proba = diabetes_model.predict_proba(features)[0]  # [prob_class0, prob_class1]
        prediction = int(np.argmax(proba))                 # 0 or 1
        chance = float(proba[1]) * 100                     # percentage chance of diabetes

        return jsonify({
            "success": True,
            "prediction": prediction,
            "chance": round(chance, 2)
        })

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400

# ==============================
# RUN SERVER
# ==============================

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { heartDiseasePrediction } from "../services/healthCareServices";

const HeartCheck = () => {
  const [age, setAge] = useState("");
  const [trestbps, setTrestbps] = useState("");
  const [chol, setChol] = useState("");
  const [thalach, setThalach] = useState("");
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await heartDiseasePrediction(age, trestbps, chol, thalach);
      console.log("Prediction result:", result);
      setPrediction(result);
    } catch (error) {
      console.error("Prediction failed:", error);
      setPrediction({ error: "Error occurred while predicting." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center bg-neutral-800 pt-[2cm] h-screen">
      <div className="bg-gradient-to-r from-green-600 via-green-500 to-black p-2 rounded-xl h-fit w-[22rem]">
        <Form onSubmit={handleOnSubmit} className="bg-neutral-900 p-6 rounded-xl text-white">
          <div className="flex justify-center mb-6">
            <h2 className="text-2xl font-bold text-green-400">Heart Disease Prediction</h2>
          </div>

          {/* Age */}
          <Form.Group className="mb-3" controlId="formAge">
            <Form.Label>Age:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="bg-white text-black rounded-sm pl-4 w-full mt-1"
              required
            />
          </Form.Group>

          {/* Resting BP */}
          <Form.Group className="mb-3" controlId="formTrestbps">
            <Form.Label>Resting Blood Pressure (trestbps):</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter resting BP"
              value={trestbps}
              onChange={(e) => setTrestbps(e.target.value)}
              className="bg-white text-black rounded-sm pl-4 w-full mt-1"
              required
            />
          </Form.Group>

          {/* Cholesterol */}
          <Form.Group className="mb-3" controlId="formChol">
            <Form.Label>Cholesterol (chol):</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter cholesterol level"
              value={chol}
              onChange={(e) => setChol(e.target.value)}
              className="bg-white text-black rounded-sm pl-4 w-full mt-1"
              required
            />
          </Form.Group>

          {/* Max Heart Rate */}
          <Form.Group className="mb-3" controlId="formThalach">
            <Form.Label>Maximum Heart Rate (thalach):</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter max heart rate"
              value={thalach}
              onChange={(e) => setThalach(e.target.value)}
              className="bg-white text-black rounded-sm pl-4 w-full mt-1"
              required
            />
          </Form.Group>

          {/* Submit button */}
          <div className="flex justify-center">
            <Button
              style={{ backgroundColor: "#228B22" }}
              className="mt-4 text-white"
              variant="light"
              type="submit"
              disabled={loading}
            >
              {loading ? "Predicting..." : "Predict"}
            </Button>
          </div>

          {/* Prediction result */}
          {prediction && !prediction.error && (
            <div className="flex justify-center mt-6 text-center">
              {prediction.hasDisease ? (
                <h2 className="text-red-400 font-bold">
                  You have heart disease chance of {prediction.chance}%
                </h2>
              ) : (
                <h2 className="text-green-400 font-bold">
                  You do not have heart disease, chance of {prediction.chance}%
                </h2>
              )}
            </div>
          )}

          {/* Error message */}
          {prediction?.error && (
            <div className="flex justify-center mt-6 text-center">
              <h2 className="text-red-400 font-bold">{prediction.error}</h2>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default HeartCheck;
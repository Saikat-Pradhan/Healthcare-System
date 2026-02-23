import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { diabetesPrediction } from "../services/healthCareServices";
import { NavLink } from "react-router-dom";

const DiabetesCheck = () => {
  const [glucose, setGlucose] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [bmi, setBmi] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await diabetesPrediction(glucose, bloodPressure, bmi, age);
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
      <div>
        <div className="bg-gradient-to-r from-green-600 via-green-500 to-black p-2 rounded-xl h-fit w-[22rem]">
          <Form onSubmit={handleOnSubmit} className="bg-neutral-900 p-6 rounded-xl text-white">
            <div className="flex justify-center mb-6">
              <h2 className="text-2xl font-bold text-green-400">Diabetes Prediction</h2>
            </div>

            <Form.Group className="mb-3" controlId="formGlucose">
              <Form.Label>Glucose:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter glucose level"
                value={glucose}
                onChange={(e) => setGlucose(e.target.value)}
                className="bg-white text-black rounded-sm pl-4 w-full mt-1"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBloodPressure">
              <Form.Label>Blood Pressure:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter blood pressure"
                value={bloodPressure}
                onChange={(e) => setBloodPressure(e.target.value)}
                className="bg-white text-black rounded-sm pl-4 w-full mt-1"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBMI">
              <Form.Label>BMI:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter BMI"
                value={bmi}
                onChange={(e) => setBmi(e.target.value)}
                className="bg-white text-black rounded-sm pl-4 w-full mt-1"
                required
              />
            </Form.Group>

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

            {prediction && !prediction.error && (
              <div className="flex justify-center mt-6 text-center">
                {prediction.hasDiabetes ? (
                  <h2 className="text-red-400 font-bold">
                    You have Diabetes (Confidence: {prediction.chance}%)
                  </h2>
                ) : (
                  <h2 className="text-green-400 font-bold">
                    You are Healthy (Confidence: {prediction.chance}%)
                  </h2>
                )}
              </div>
            )}

            {prediction?.error && (
              <div className="flex justify-center mt-6 text-center">
                <h2 className="text-red-400 font-bold">{prediction.error}</h2>
              </div>
            )}
          </Form>
        </div>

        {/* Link to go back to dashboard */}
        <div>
          <p className="mt-4 text-center text-white w-[22rem]">To Check another health condition, <NavLink to="/dashboard"><span className='text-green-500'>click here</span></NavLink> to go back to the dashboard.</p>
        </div>
      </div>
    </div>
  );
};

export default DiabetesCheck;
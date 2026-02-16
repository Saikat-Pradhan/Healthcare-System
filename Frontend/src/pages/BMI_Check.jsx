import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { bmiCalculator } from '../services/healthCareServices';

const BMI_Check = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [loading, setLoading] = useState(false);
  const [bmi, setBmi] = useState(null);
  const [suggestion, setSuggestion] = useState("");
  
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call your service function
      const result = await bmiCalculator(weight, height);
      setBmi(result);
      setSuggestion(getHealthSuggestion(result));
    } catch (error) {
      console.error("BMI calculation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const getHealthSuggestion = (bmi) => {
    if (bmi < 18.5) return "You are underweight. Increase calorie intake with nutrient-rich foods and consult a doctor.";
    if (bmi < 25) return "You are at a healthy weight. Maintain a balanced diet and regular exercise.";
    if (bmi < 30) return "You are overweight. Focus on portion control and increase physical activity.";
    if (bmi < 35) return "You are in Obese Class I. Adopt a structured weight-loss plan and seek medical guidance.";
    if (bmi < 40) return "You are in Obese Class II. Work closely with healthcare professionals for support.";
    return "You are in Obese Class III. Medical supervision is essential for safe weight management.";
  };

  return (
    <div className="flex justify-center bg-neutral-800 pt-[2cm] h-screen">
      <div>
        <div className="bg-gradient-to-r from-green-600 via-green-500 to-black h-[8.38cm] p-1.5 rounded-xl w-[22rem]">
        <Form onSubmit={handleOnSubmit} className="bg-neutral-900 p-6 rounded-xl text-white">
          <div className='flex justify-center mb-6'>
            <h2 className='text-2xl font-bold text-green-500'>BMI Calculator</h2>
          </div>

          <Form.Group className="mb-3" controlId="formWeight">
            <Form.Label>Weight (kg):</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter weight in kg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="bg-white text-black rounded-sm pl-4 w-full mt-1"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formHeight">
            <Form.Label>Height (cm):</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter height in cm"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="bg-white text-black rounded-sm pl-4 w-full mt-1"
              required
            />
          </Form.Group>

          <div className='flex justify-center'>
            <Button
              style={{ backgroundColor: '#228B22' }}
              className='mt-[0.7cm] text-white'
              variant="light"
              type="submit"
              disabled={loading}
            >
              {loading ? "Calculating..." : "Calculate BMI"}
            </Button>
          </div>         
        </Form>
      </div>
      
      {bmi && (
          <div className="mt-4 bg-gradient-to-r from-green-600 via-green-500 to-black h-fit p-1.5 rounded-xl w-[22rem]">
            <div className='bg-neutral-900 p-6 rounded-xl text-white'>
              <h2 className="text-green-500 font-bold">Your BMI: {bmi}</h2>
              <p className="text-white mt-2">{suggestion}</p>
            </div>
          </div>  
        )}
      </div>
    </div>
  );
};

export default BMI_Check;
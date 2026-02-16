import axios from 'axios';

const Backend_URL = "https://healthcare-system-bafs.onrender.com";

// User Authentication Services
export const register = async (name, email, password) => {
  try {
    const response = await axios.post(`${Backend_URL}/user/register`, {
      name,
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Registration failed");
  }
};

export const login = async (email, password, user, setUser) => {
  try {
    if (user) {
      return "Already Logged In";
    }

    const response = await axios.post(`${Backend_URL}/user/login`, {
      email,
      password
    });

    const validUser = response.data.validUser;
    setUser(validUser);

    const expiryTime = Date.now() + 7 * 24 * 60 * 60 * 1000; // 1 week from now

    const userWithExpiry = {
      value: validUser,
      expiry: expiryTime
    };

    localStorage.setItem('user', JSON.stringify(userWithExpiry));
    return "Login Successful!"

  } catch (error) {
    throw new Error(error.response?.data?.error || "Login failed");
  }
};

export const googleAuth = (code) => {
  return axios.post(`${Backend_URL}/user/googleAuth`, { code });
};

export const resetPassword = async (email, newPassword, confirmPassword) => {
  try {
    const response = await axios.post(`${Backend_URL}/user/resetPassword`, {
      email,
      newPassword,
      confirmPassword
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Password updation failed");
  }
};

// Health Services
export const bmiCalculator = async (weight, height) => {
  try {
    const response = await axios.post(`${Backend_URL}/health/bmi`, {
      weight,
      height
    });
    
    return response.data.bmi;
  } catch (error) {
    throw new Error(error.response?.data?.error || "BMI calculation failed");
  }
};

export const heartDiseasePrediction = async (age, trestbps, chol, thalach) => {
  try {
    const response = await axios.post(`${Backend_URL}/health/heart`, {
      age,
      trestbps,
      chol,
      thalach
    });

    // Extract prediction and chance from backend response
    const { hasDisease, chance } = response.data;

    return { hasDisease, chance };
  } catch (error) {
    throw new Error(error.response?.data?.error || "Heart disease prediction failed");
  }
};

export const diabetesPrediction = async (Glucose, BloodPressure, BMI, Age) => {
  try {
    const response = await axios.post(`${Backend_URL}/health/diabetes`, {
      Glucose,
      BloodPressure,
      BMI,
      Age
    });

    // Extract prediction and chance from backend response
    const { hasDiabetes, chance } = response.data;

    return { hasDiabetes, chance };
  } catch (error) {
    throw new Error(error.response?.data?.error || "Diabetes prediction failed");
  }
};
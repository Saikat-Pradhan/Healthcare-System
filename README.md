# 🏥 HealthNova — Smart Healthcare Prediction Platform

HealthNova is a MERN + Machine Learning based healthcare web application where users can 
perform multiple health checks and get intelligent predictions through a unified dashboard.

## The system uses a microservice architecture:

- MERN stack handles the main application flow
- Flask serves Machine Learning models as prediction APIs

---

## 🌐 Live Demo

🔗 HealthNova Live Application: https://healthcare-system-by-saikat-pradhan.onrender.com

---

## 🚀 Features

### 👤 User System

- User Signup & Login
- Secure authentication
- Personalized dashboard

### 🩺 Health Modules

- BMI Calculator with suggestions
- Heart Disease Prediction (ML)
- Diabetes Prediction (ML)

### 📊 Dashboard

- Health check history
- Prediction results
- Clean and interactive UI

---

## 🧱 Tech Stack

### Frontend

- React.js
- Axios

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication

### ML Service

- Python
- Flask
- Scikit-learn
- NumPy
- Pickle (.pkl models)

---

## 🏗️ Architecture

```
React (Frontend) 
        ↓
Node.js + Express (Main Backend)
        ↓
Flask ML Service
        ↓
ML Models (.pkl)
```

## Golden Rule:

- Node.js handles authentication, database, and business logic.
- Flask handles only ML predictions.

---

## 📂 Project Structure

```
healthcare-app/
│
├── frontend/        # React frontend
│
├── backend/         # Node + Express backend
│   ├── routes/
│   ├── controllers/
│   └── models/
│
├── ml-services/     # Flask ML service
│   ├── app.py
│   ├── heart_desease_model.pkl
│   └── diabetes_model.pkl
```
---

## ⚙️ Installation & Setup

1️⃣ Clone Repository

```
git clone https://github.com/Saikat-Pradhan/Healthcare-System.git
cd healthcare-app
```

---

2️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

3️⃣ Backend Setup

```
cd backend
npm install
npm start
```

---

4️⃣ ML Service Setup

```
cd ml-services
pip install flask numpy scikit-learn
python app.py
```

Flask runs on:

```
http://localhost:5000
```

---

## 📈 Future Improvements

- Additional disease prediction modules
- Risk score visualization
- Progress analytics dashboard
- Downloadable health reports

---

## ⚠️ Disclaimer

This project is created for educational purposes only and does not provide real medical advice.

---

⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!

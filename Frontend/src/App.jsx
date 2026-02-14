import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './pages/HomePage';
import BMI_Check from './pages/BMI_Check';
import Dashboard from './pages/Dashboard';
import DiabetesCheck from './pages/DiabetesCheck';
import HeartCheck from './pages/HeartCheck';
import Login from './pages/Login';
import  Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import MainNavigation from './components/MainNavigation';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/bmi", element: <BMI_Check /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/diabetes", element: <DiabetesCheck /> },
      { path: "/heart", element: <HeartCheck /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/resetpassword", element: <ResetPassword /> }
    ]
  }
]);

export default function App() {
  return (
    <GoogleOAuthProvider clientId="1041183813993-j39f5tdihd980oul5f0v7l22elppahjh.apps.googleusercontent.com">
      <ToastContainer position='top-center' autoClose={2000} />
      <RouterProvider
        router={router}
        fallbackElement={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading page...</div>}
      />
    </GoogleOAuthProvider>
  );
}
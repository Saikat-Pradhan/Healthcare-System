import { useState, useEffect, useRef } from 'react';
import { toast } from "react-toastify";
import { NavLink, useNavigate, useLocation } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { register } from '../services/healthCareServices';

const Register = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const toastShown = useRef(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.message && !toastShown.current) {
      toastShown.current = true;
      const { message, type } = location.state;
      type === "success" ? toast.success(message) : toast.error(message);
    }
  }, [location.state, navigate]);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await register(fullName, email, password);
      navigate("/login", {
        state: {
          message: "Registration successful!",
          type: "success"
        }
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center bg-neutral-800 pt-[2cm] h-screen">
      <div className='w-87.5 h-[10.4cm] bg-linear-to-r from-green-600 via-green-500 to-black rounded-xl p-1.5'>
        <Form onSubmit={handleOnSubmit} className="p-6 bg-neutral-900 rounded-xl text-white">
          <div className='flex justify-center mb-6'>
            <h2 className='text-2xl font-bold text-green-500'>Create Your Account</h2>
          </div>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Full Name: </Form.Label>
            <Form.Control type="text" placeholder="Enter full name" onChange={(e) => setFullName(e.target.value)} className='bg-white text-black rounded-sm pl-4 w-full mt-1' required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email Address: </Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} className='bg-white text-black rounded-sm pl-4 w-full mt-1' required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password: </Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
              title="Must contain at least 8 characters, including uppercase, lowercase, number, and special character"
              className='bg-white text-black rounded-sm pl-4 w-full mt-1'
              required
            />
          </Form.Group>

          <div className='flex justify-center text-white'>
            <Button
              style={{ backgroundColor: '#e11d48' }}
              variant="light"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loding data..." : "Register"}
            </Button>
          </div>

          <div className='mt-4'>
            <h2>Already registered? Go to <NavLink to="/login"><h2 className='text-rose-500 inline-block'>login page</h2></NavLink></h2>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
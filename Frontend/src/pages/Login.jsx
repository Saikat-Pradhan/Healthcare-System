import { useContext, useState, useEffect, useRef } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { login } from '../services/healthCareServices.js';
import GoogleLogin from '../components/GoogleLogin.jsx';
import { toast } from 'react-toastify';

const Login = () => {

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const toastShown = useRef(false);
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
      const msg = await login(email, password, user, setUser);
      navigate("/dashboard", { state: { message: msg, type: "success" } });
    } catch (error) {
      if (error.message == "Incorrect Email ID") {
        navigate("/register", {
          state: {
            message: "You haven't registered!! Please complete registration.",
            type: "error"
          }
        });
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center bg-neutral-800 pt-[2cm] h-screen">
      <div className="w-87.5 h-[11.31cm] p-1.5 bg-linear-to-r from-rose-600 via-rose-500 to-black rounded-xl">
        <Form onSubmit={handleOnSubmit} className="p-6 bg-neutral-900 rounded-xl text-white">
          <div className='flex justify-center mb-6'>
            <h2 className='text-2xl text-rose-500 font-bold'>Welcome Back</h2>
          </div>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email Address: </Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} className='bg-white text-black rounded-sm pl-4 w-full mt-1.25' required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <div>
              <Form.Label>Password: </Form.Label>
              <NavLink to={"/resetpassword"}><span className='text-rose-600 ml-[2cm]'>Forgot password?</span></NavLink>
            </div>
            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className='bg-white text-black pl-4 rounded-sm w-full mt-1.25' required />
          </Form.Group>

          <div className='flex justify-center text-white'>
            <Button
              style={{ backgroundColor: '#e11d48' }}
              variant="light"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>

          <div className='flex justify-center mb-4 mt-2'>
            <h2 className='text-xl'>or</h2>
          </div>

          <div className='flex justify-center'>
            <GoogleLogin />
          </div>

          <div className='mt-4'>
            <h2>Not registered? Go to <NavLink to="/register"><span className='text-green-500'>register page</span></NavLink></h2>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Login

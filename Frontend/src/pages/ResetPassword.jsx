import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { resetPassword } from '../services/healthCareServices';
import { toast } from 'react-toastify';

const ResetPassword = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await resetPassword(email, newPassword, confirmPassword);
      navigate('/login', {
        state: {
          message: "Password updated successfully",
          type: "success"
        }
      });
    } catch (error) {
      toast.error(error.message);
    }finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center bg-neutral-800 pt-[2cm] h-screen">
      <div className="bg-linear-to-r from-green-600 via-green-500 to-black h-[11.12cm] p-1.5 rounded-xl w-87.5">
        <Form onSubmit={handleOnSubmit} className="bg-neutral-900 p-6 rounded-xl text-white">
          <div className='flex justify-center mb-6'>
            <h2 className='text-2xl font-bold text-green-500'>Reset Your Password</h2>
          </div>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email Address: </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white text-black rounded-sm pl-4 w-full mt-1"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formNewPassword">
            <Form.Label>New Password: </Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setNewPassword(e.target.value)}
              pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
              title="Must contain at least 8 characters, including uppercase, lowercase, number, and special character"
              className="bg-white text-black rounded-sm pl-4 w-full mt-1"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirm Password: </Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
              title="Must contain at least 8 characters, including uppercase, lowercase, number, and special character"
              className="bg-white text-black rounded-sm pl-4 w-full mt-1"
              required
            />
          </Form.Group>

          <div className='flex justify-center'>
            <Button style={{ backgroundColor: '#228B22' }} className='mt-[0.7cm] text-white' variant="light" type="submit" disabled={loading}>
              {loading ? "Updating..." : "Change Password"}
            </Button>
          </div>

          <div className='mt-4'>
            <h2>Password changed. Go to <NavLink to="/login"><h2 className='text-green-500 inline-block'>login page</h2></NavLink></h2>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
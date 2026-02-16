import { useContext } from "react";
import { UserContext } from '../context/UserContext.jsx';
import Button from "react-bootstrap/esm/Button";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../services/healthCareServices.js";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const GoogleLogin = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const responseGoogle = async (authResult) => {
    try {
      if (authResult.code) {
        const result = await googleAuth(authResult.code);
        const { email, name } = result.data.user;
        const token = result.data.token;

        const loggedInUser = { email, name, token };
        setUser(loggedInUser);

        const expiryTime = Date.now() + 7 * 24 * 60 * 60 * 1000; // 1 week
        const userWithExpiry = {
          value: loggedInUser,
          expiry: expiryTime
        };

        localStorage.setItem('user', JSON.stringify(userWithExpiry));

        navigate("/dashboard", { state: { message: "Login Successful!", type: "success" } });
      } else {
        throw new Error("No auth code returned from Google");
      }
    } catch (e) {
      console.error("Google login error:", e);
      toast.error("Error while Google Login...");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <div>
      <Button
        style={{ backgroundColor: 'white' }}
        className='flex items-center gap-2 text-black'
        onClick={googleLogin}
      >
        <img className='size-[20px] rounded-[50%]' src="google.png" alt="google icon" />
        <span>Sign in with Google</span>
      </Button>
    </div>
  );
};

export default GoogleLogin;
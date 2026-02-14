import { useNavigate, useLocation } from 'react-router-dom';
import { GoArrowRight } from "react-icons/go";
import { useEffect, useRef } from 'react';
import { toast } from "react-toastify";

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const toastShown = useRef(false);

  useEffect(() => {
    if (location.state?.message && !toastShown.current) {
      toastShown.current = true;
      const { message, type } = location.state;
      type === "success" ? toast.success(message) : toast.error(message);
    }
  }, [location.state, navigate]);

  return (
    <div className='h-screen'>
      <div className='flex justify-center pt-[9cm]'>
        <div
          className='flex bg-black text-white p-2 border-[3px] border-green-700  rounded-[9px]'
          onClick={() => navigate('/login')}
        >
          Get Started <GoArrowRight size={25} className='ml-2' />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
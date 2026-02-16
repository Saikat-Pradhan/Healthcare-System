import { useNavigate, useLocation } from 'react-router-dom';
import { GoArrowRight } from "react-icons/go";
import { useEffect, useRef } from 'react';
import { toast } from "react-toastify";
import RippleGrid from '../components/UI/RippleGrid';
import TextType from '../components/UI/TextType';

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
  }, [location.state]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-neutral-900">
      {/* Animated Heading */}
      <div className="text-5xl font-bold text-white mb-10 text-center">
        <TextType
          text={["Welcome to HealthNova", "Check Your Health Conditions!"]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor
          cursorCharacter="_"
          texts={["Welcome to HealthNova", "Check Your Health Conditions!"]}
          deletingSpeed={50}
          variableSpeedEnabled={false}
          variableSpeedMin={60}
          variableSpeedMax={120}
          cursorBlinkDuration={0.5}
        />
      </div>

      {/* Ripple Background */}
      <div className="relative w-full max-w-4xl h-[400px] mb-12">
        <RippleGrid
          enableRainbow={false}
          gridColor="#228B22"
          rippleIntensity={0.05}
          gridSize={8}
          gridThickness={13}
          mouseInteraction={true}
          mouseInteractionRadius={1.2}
          opacity={2.5}
        />
      </div>

      {/* Get Started Button */}
      <div
        className="flex items-center bg-black text-white px-6 py-3 border-4 border-green-700 rounded-lg cursor-pointer hover:px-[0.7cm] hover:py-[0.4cm] hover:border-green-800 transition"
        onClick={() => navigate('/login')}
      >
        Get Started <GoArrowRight size={25} className="ml-2" />
      </div>
    </div>
  );
};

export default HomePage;
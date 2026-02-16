import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle logout
  const handleLogout = async () => {
    try {
      localStorage.removeItem('user');
      setUser(null);
      if (location.pathname === "/") {
        toast.success("Logged out successfully!");
      } else {
        navigate("/", {
          state: { message: "Logged out successfully!", type: "success" }
        });
      }
    } catch (error) {
      toast.error("Logout failed: " + error.message);
    }
  };

  return (
    <nav className='flex justify-between w-screen h-[1.5cm] bg-linear-to-r from-green-900 via-green-700 dark:to-black pr-[0.5cm] pl-[0.5cm]'>
      <ul className='flex gap-3.75'>
        <img src="/icon.jpg" alt="HealthNova Icon" className="w-10 h-10 rounded-full mt-2" />
        <h2 className='mt-2.25 text-white text-3xl font-serif'>HealthNova</h2>
      </ul>
      <ul className='flex gap-4 mt-px items-center'>
        {user && user?.name && (
          <div className='flex items-center gap-3'>
            <h2 className='text-[1rem] text-green-300 ml-4 font-semibold'>
              {user.name.split(" ")[0]}
            </h2>
            <li>
              <div
                onClick={handleLogout}
                className='bg-black px-2 py-1 rounded-lg text-sm md:text-md lg:text-lg text-white font-normal border-none cursor-pointer'
              >
                Logout
              </div>
            </li>
          </div>
        )}
        {!user && (
          <div className='flex items-center gap-3 ml-4'>
            <li>
              <NavLink to="/register"><p className='text-white'>Register</p></NavLink>
            </li>
            <li>
              <NavLink to="/login"><p className='text-white'>Login</p></NavLink>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
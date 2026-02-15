import { useState, useEffect, useRef, useContext } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FiMenu } from "react-icons/fi";
import { toast } from 'react-toastify';

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const { user, setUser } = useContext(UserContext);

  // Apply saved theme on first load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDarkMode = savedTheme === 'dark';

    const html = document.documentElement;
    html.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');

    setIsDark(isDarkMode);
  }, []);

  // Toggle theme
  const toggleDarkMode = () => {
    const html = document.documentElement;
    const newMode = !isDark;

    html.setAttribute('data-theme', newMode ? 'dark' : 'light');
    localStorage.setItem('theme', newMode ? 'dark' : 'light');

    setIsDark(newMode);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      localStorage.removeItem('user');
      setUser(null);
      setMenuOpen(false);
      if (location.pathname == "/") {
        toast.success("Logged out successfully!");
      } else {
        navigate("/", {
          state: {
            message: "Logged out successfully!",
            type: "success"
          }
        });
      }
    } catch (error) {
      toast.error("Logout failed: " + error.message);
    }
  };

  return (
    <div>
      <nav className='flex justify-between w-screen h-[1.5cm] bg-linear-to-r from-green-400 via-green-300 to-neutral-500 dark:bg-linear-to-r dark:from-green-900 dark:via-green-700 dark:to-black pr-[0.5cm] pl-[0.5cm]'>
        <ul className='flex gap-3.75'>
          <img src="/icon.jpg" alt="HealthNova Icon" className="w-10 h-10 rounded-full mt-2" />
          <h2 className='mt-2.25 text-black dark:text-white text-3xl font-serif'>HealthNova</h2>
        </ul>
        <ul className='flex gap-4 mt-px items-center'>
          {user?.name && <h2 className='text-[1.4rem] text-green-600 ml-4 font-bold'>{user.name.split(" ")[0]}</h2>}
              <li className='ml-4 mt-1'><NavLink to="/"><p className='text-white'>Home</p></NavLink></li>
              <li className='ml-4 mt-1'><NavLink to="/menu"><p className='text-white'>Menu</p></NavLink></li>
              {!user && (
                <div className='ml-4'>
                  <li className='mt-1'><NavLink to="/register"><p className='text-white'>Register</p></NavLink></li>
                  <li className='mt-1'><NavLink to="/login"><p className='text-white'>Login</p></NavLink></li>
                </div>
              )}
          <li><NavLink to="/login"><p className='text-black text-sm md:text-md lg:text-lg dark:text-white font-normal'>Login</p></NavLink></li>
          <li><NavLink to="/register"><p className='text-black text-sm md:text-md lg:text-lg dark:text-white font-normal'>Register</p></NavLink></li>
          <li><NavLink to="/profile"><p className='text-black text-sm md:text-md lg:text-lg dark:text-white font-normal'>Profile</p></NavLink></li>
          <li><NavLink to="/logout"><p className='text-black text-sm md:text-md lg:text-lg dark:text-white font-normal'>Logout</p></NavLink></li>
          <li>
            <div onClick={toggleDarkMode} className="bg-white text-black border-2 border-black dark:bg-black dark:text-white dark:border-2 dark:border-white w-[2.7cm] md:w-[3cm] lg:w-[3.7cm] text-sm md:text-md lg:text-lg cursor-pointer rounded-[5px] py-1">
              {isDark ? <div className='flex ml-1 gap-1 dark:items-center md:justify-center lg:justify-center'><MdLightMode/><p>Light Mode</p></div> : <div className='flex ml-1 gap-1 items-center md:justify-center lg:justify-center'><MdDarkMode/><p>Dark Mode</p></div>}
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
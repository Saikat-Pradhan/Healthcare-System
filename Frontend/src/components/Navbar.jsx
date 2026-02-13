import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);

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

  return (
    <div>
      <nav className='flex justify-between w-screen h-[1.5cm] bg-gradient-to-r from-blue-400 via-blue-300 to-neutral-500 dark:bg-gradient-to-r dark:from-blue-900 dark:via-blue-700 dark:to-black pr-[0.5cm] pl-[0.5cm]'>
        <h2 className='mt-[7px] text-black dark:text-white text-3xl font-serif'>Blogify</h2>
        <ul className='flex gap-[1rem] mt-[1px] items-center'>
          <li><NavLink to="/"><p className='text-black text-sm md:text-md lg:text-lg dark:text-white font-normal'>Home</p></NavLink></li>
          <li><NavLink to="/addBlog"><p className='text-black text-sm md:text-md lg:text-lg dark:text-white font-normal'>Add Blog</p></NavLink></li>
          <li>
            <div onClick={toggleDarkMode} className="bg-white text-black border-[2px] border-black dark:bg-black dark:text-white dark:border-[2px] dark:border-white w-[2.7cm] md:w-[3cm] lg:w-[3.7cm] text-sm md:text-md lg:text-lg cursor-pointer rounded-[5px] py-1">
              {isDark ? <div className='flex ml-1 gap-1 dark:items-center md:justify-center lg:justify-center'><MdLightMode/><p>Light Mode</p></div> : <div className='flex ml-1 gap-1 items-center md:justify-center lg:justify-center'><MdDarkMode/><p>Dark Mode</p></div>}
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
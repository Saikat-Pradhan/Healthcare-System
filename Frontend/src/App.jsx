import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './pages/Home';
import MainNavigation from './components/MainNavigation';
import BlogDetails from './pages/BlogDetails';
import AddBlog from './pages/AddBlog';
import { getAllBlogs, getBlog } from './services/blogService';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />,
    children: [
      { path: "/", element: <HomePage />, loader: getAllBlogs },
      { path: "/addBlog", element: <AddBlog /> },
      { path: "/blog/:id", element: <BlogDetails />, loader: getBlog }
    ]
  }
]);

export default function App() {
  return (
    <>
      <ToastContainer position='top-center' autoClose={2000} />
      <RouterProvider router={router} />
    </>
  );
}
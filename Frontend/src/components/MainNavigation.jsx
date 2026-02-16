import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
import { UserProvider } from '../context/UserContext'

export default function MainNavigation() {
  return (
   <UserProvider>
    <Navbar/>
    <Outlet/>
    <Footer/>
   </UserProvider>
  )
}

import './App.css';
import Navbar from "./navbar.jsx";
import Footer from './footer.jsx';
import { Outlet, useLocation } from 'react-router-dom';
import LoadingSpinner from "./Aloader.jsx";
import useAppFetch from "./useFetchItems.js";
import {  useSelector } from "react-redux";

function App() {
const location = useLocation();
const noFooterPaths = ['/bag','/wishlist', '/men', '/women','/login','/beauty','/electronics','/sports','/household','/luggage','/special'];
const showFooter = !noFooterPaths.includes(location.pathname);
const showNavbar = location.pathname !== '/login';
const isLoginPage = location.pathname === '/login';

const fetchStatus = useSelector((store) => store.fetchStatus);
useAppFetch(); 

  return (
    <>
  <div style={{ backgroundColor: isLoginPage ? "#0c0025" : "white", minHeight: "100vh" }}>
      {showNavbar && <Navbar />}
      {fetchStatus.currentlyFetching ? <LoadingSpinner /> : <Outlet />} 
      {showFooter && <Footer />}
      </div>
    </>
  );
}
export default App;

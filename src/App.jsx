import './App.css';
import Navbar from "./navbar.jsx";
import Footer from './footer.jsx';
import { Outlet, useLocation } from 'react-router-dom';
import LoadingSpinner from "./Aloader.jsx";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { browsingitemAction } from "./browsing.js";
import { fetchStatusActions } from "./fetching.js";
import { menitemAction} from "./men.js";
import { womenitemAction} from "./women.js";
import { beautyitemAction} from "./beauty.js";
import { sportsitemAction} from "./sports.js";
import {houseitemAction} from "./house.js";
import {elctronicsitemAction} from "./electronics.js";
import {luggageitemAction} from "./luggage.js";
import {uniqueitemAction} from "./unique.js";
import {featureitemAction} from "./feature.js";
import {itemsAction} from "./items.js";



function App() {
  const location = useLocation();
  const noFooterPaths = ['/bag','/wishlist', '/men', '/women','/login','/beauty','/electronics','/sports','/household','/luggage','/special'];
  const showFooter = !noFooterPaths.includes(location.pathname);
const showNavbar = location.pathname !== '/login';
const isLoginPage = location.pathname === '/login';


const fetchStatus = useSelector((store) => store.fetchStatus);
const dispatch = useDispatch();
useEffect(() => {
  if (fetchStatus.fetchDone) return;
  const controller = new AbortController();
  const signal = controller.signal;

  dispatch(fetchStatusActions.markFetchingStarted());

  fetch("http://localhost:3000/items", { signal })
    .then((res) => res.json())
    .then(({ items }) => {
      dispatch(fetchStatusActions.markFetchingFinished());
      dispatch(browsingitemAction.addInitialItems(items.items));
      dispatch(menitemAction.addInitialItems(items.items2));
      dispatch(womenitemAction.addInitialItems(items.items3));
      dispatch(beautyitemAction.addInitialItems(items.items4));
      dispatch(sportsitemAction.addInitialItems(items.items5));
      dispatch(houseitemAction.addInitialItems(items.items6));
      dispatch(elctronicsitemAction.addInitialItems(items.items7));
      dispatch(luggageitemAction.addInitialItems(items.items8));
      dispatch(uniqueitemAction.addInitialItems(items.items9));
      dispatch(featureitemAction.addInitialItems(items.items10));
      dispatch(itemsAction.addInitialItems(items.itemall));
    })
    .catch((err) => {
      if (err.name === 'AbortError') {
        // Suppress AbortError
        console.log('Fetch aborted due to unmount/navigation');
      } else {
        console.error('Fetch failed:', err);
      }
    });

  return () => {
    controller.abort();
  };
}, []);




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

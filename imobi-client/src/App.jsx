import { useState } from 'react'
import './App.css'

// ============ IMPORT NAVIGATION ================ //
import { RouterProvider, createBrowserRouter} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Product from './components/dashboard/product/products';
import AddProduct from './components/dashboard/addProduct/AddProduct';
import Page from './components/Page/Page';
import CustomerSell from './components/CustomerSell/CustomerSell';
import DetailsPage from './components/DetailsPage/DetailsPage';
import DetailDashboard from './components/dashboard/detailDashboard/DetailsDashboard';
import Calendar from './components/dashboard/calendar/calendar';
import Contact from './components/dashboard/Contact/Contact';
import Profil from './components/dashboard/profil/profil';

function App() {
  const [count, setCount] = useState(0)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>
    },
    {
      path: `${import.meta.env.VITE_API_URL21}`,
      element: <Login/>
    },
    {
      path: `${import.meta.env.VITE_API_URL22}`,
      element: <Product/>
    },
    {
      path: `${import.meta.env.VITE_API_URL23}`,
      element: <AddProduct/>
    },
    {
      path: `${import.meta.env.VITE_API_URL24}`,
      element: <Page/>
    },
    {
      path: `${import.meta.env.VITE_API_URL25}`,
      element: <CustomerSell/>
    },
    {
      path: `${import.meta.env.VITE_API_URL26}`,
      element: <DetailsPage/>
    },
    {
      path: `${import.meta.env.VITE_API_URL27}`,
      element: <DetailDashboard/>
    },
    {
      path: `${import.meta.env.VITE_API_URL28}`,
      element: <Calendar/>
    },
    {
      path: `${import.meta.env.VITE_API_URL29}`,
      element: <Contact/>
    },
    {
      path: `${import.meta.env.VITE_API_URL30}`,
      element: <Profil/>
    }
  ])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App

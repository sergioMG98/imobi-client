import { useState } from 'react'
import './App.css'

// ============ IMPORT NAVIGATION ================ //
import { RouterProvider, createBrowserRouter} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Product from './components/dashboard/product/products';
import AddProduct from './components/dashboard/addProduct/AddProduct';
import Page from './components/Page/Page';
import DetailsPage from './components/DetailsPage/DetailsPage';

function App() {
  const [count, setCount] = useState(0)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/product",
      element: <Product/>
    },
    {
      path: "/addProduct",
      element: <AddProduct/>
    },
    {
      path: "/page",
      element: <Page/>
    },
    {
      path: "/detailsPage",
      element: <DetailsPage/>
    }
  ])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App

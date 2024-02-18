import './App.css';
import{RouterProvider, createBrowserRouter}from "react-router-dom"
import React from 'react';
import CreateProduct from './pages/dashboard/product/CreateProduct';
import { Toaster } from 'react-hot-toast';
import ListProduct from "./pages/dashboard/product/ListProduct";
import DashboardLayout from './layout/Dashboardlayout';
import UpdateProduct from './pages/dashboard/product/Updateproduct';
import Index from './pages';
import SingleProduct from './pages/product/singleProduct';
import Login from './pages/auth/Login';
import Create from './pages/auth/Create';
import ListOrder from './pages/dashboard/order/ListOrder';
import Cart from "./pages/cart";
import MainLayout from './layout/MainLayout';
import CartProvider from './components/context/CartProvider';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element:<MainLayout/>,
      children: [
        {
          path: "/",
          element: <Index />,
        },
        {
          path: "/product/:id",
          element: <SingleProduct />,
        },
      ],
    },
      {
          path: "/cart",
          element: <Cart />
        },
    {
      path: "/auth",
      children: [
        {
          path: "create",
          element: <Create />,
        },
        {
          path: "login",
          element: <Login/>,
        },
      ],
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {
          path: "addProduct",
          element: <CreateProduct />,
        },
        {
          path: "listProduct",
          element: <ListProduct />,
        },
        {
          path: "updateProduct/:id",
          element: <UpdateProduct />,
        },
        {
          path:"listorder",
          element:<ListOrder/>
        }
      ],
    },
  ]);
  return (
    <>
      <CartProvider>
        <RouterProvider router={router} />
        <Toaster />
      </CartProvider>
    </>
  );

}


export default App;

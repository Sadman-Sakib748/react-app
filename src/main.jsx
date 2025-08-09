import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Home from './Components/Home/Home';
import { Toaster } from 'react-hot-toast';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster
                position="top-center" />
    <RouterProvider router={router} />
  </StrictMode>,
)

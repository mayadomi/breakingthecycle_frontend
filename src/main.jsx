import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './components/AuthenticationProvider';
import NavBar from './components/NavBar.jsx';
import Page404 from './components/Page404.jsx'


import HomePage from './pages/HomePage.jsx';
import RiderPage from './pages/RiderPage.jsx';
// Riders page
import LoginPage from './pages/LoginPage.jsx';
import CreateAccountPage from './pages/CreateAccountPage.jsx';
import UpdateAccountPage from './pages/UpdateAccountPage.jsx';
import AccountPage from './pages/AccountPage.jsx'

import CreateRiderPage from './pages/CreateRiderPage.jsx';
import UpdateRiderPage from './pages/UpdateRiderPage.jsx';
import DonationPage from './pages/DonationPage.jsx';
// Delete donation
// About Page


const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/user/:id", element: <AccountPage />},
      { path: "/user/:id/update-user", element: <UpdateAccountPage />},
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <CreateAccountPage /> },
      { path: "/rider/:id", element: <RiderPage />},
      { path: "/rider/create-rider", element: <CreateRiderPage/>},
      { path: "/rider/update-rider/:id", element: <UpdateRiderPage/>},
      { path: "/donate", element: <DonationPage/>},
      { path: "*", element: <Page404 />}
      
    ],
  },
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
  </React.StrictMode>,
)

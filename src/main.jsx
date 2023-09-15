import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.jsx'
//import './index.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import HomePage from './pages/HomePage.jsx';
import RiderPage from './pages/RiderPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import CreateRiderPage from './pages/CreateRiderPage.jsx';
import AccountPage from './pages/AccountPage.jsx'
import NavBar from './components/NavBar.jsx';

const Status = () => {
  const [loggedIn, setLoggedIn] = useState(window.localStorage.getItem("token") != null);
  return (
    <div>
      <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Outlet context={[loggedIn, setLoggedIn]} />
    </div>
  )
}



const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/user/:id", element: <AccountPage />},
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/rider/:id", element: <RiderPage />},
      { path: "/rider/create-rider", element: <CreateRiderPage/>},
      { path: "/donate", element: <CreateRiderPage/>}
      
    ],
  },
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>,
)

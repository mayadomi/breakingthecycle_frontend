import { createContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";



function NavBar() {

    return (
    <div>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/login">Log In</Link>            
            <Link to='/signup'>Sign Up</Link>
            <Link to='/create-rider'>Create Rider</Link>
        </nav><Outlet />
        </div>
        );
    }
export default NavBar;
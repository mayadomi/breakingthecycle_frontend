import { createContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function NavBar(props) {
    const { loggedIn, setLoggedIn } = props;
  
    const navigate = useNavigate();
  
    const handleClick = () => {
      window.localStorage.removeItem("token");
      setLoggedIn(false);
      navigate("/");
    };

    return (
    <div>
        <nav>
            <Link to="/">Home</Link>
            {!loggedIn && (<Link to="/login">Log In</Link>)}            
            {!loggedIn && (<Link to='/signup'>Sign Up</Link>)}
            {loggedIn && (<Link to='/create-rider'>Create Rider</Link>)}
            {loggedIn && (<button onClick={handleClick}>Log Out</button>)}
        </nav><Outlet />
        </div>
        );
    }
export default NavBar;
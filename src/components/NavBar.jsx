import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/use_authentication";
import './NavBar.css'

function NavBar() {

    const {auth, setAuth } = useAuth()
    //const [loggedIn, setLoggedIn] = useState(window.localStorage.getItem("token") != null);

    const navigate = useNavigate();

    const [ismobile, setIsMobile] = useState(false)
  
    const handleClick = () => {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("id");
      setAuth({token: null, id: null});
      navigate("/");
      console.log(auth)
    };



    
    return (
    <div>

        
        <nav className="nav-bar-desktop">



            <Link className="logo-link" to="/">
            <img className="logo-link" src="../assets/logo_square.svg" width="140"></img>
            
            </Link>
        
            <div className="nav-links" >
            <Link to='/donate' >Donate</Link>
                <Link to="/">Home</Link>
                
            {!auth.token && (<Link to='/login'>Log In</Link>)}            
            {!auth.token && (<Link to='/signup'>Sign Up</Link>)}
            {auth.token && (<Link to={`/user/${auth.id}`}>Account</Link>)}
            {auth.token && (<button onClick={handleClick}>Log Out</button>)}
            
            </div>
        </nav><Outlet />


       </div>
        );
    }

export default NavBar;
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/use_authentication";

function NavBar() {

    const {auth, setAuth } = useAuth()
    //const [loggedIn, setLoggedIn] = useState(window.localStorage.getItem("token") != null);

    const navigate = useNavigate();
  
    const handleClick = () => {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("id");
      setAuth({token: null, id: null});
      navigate("/");
      console.log(auth)
    };

    
    return (
    <div>
        <nav>
            <Link to="/">Home</Link>
            {!auth.token && (<Link to='/login'>Log In</Link>)}            
            {!auth.token && (<Link to='/signup'>Sign Up</Link>)}
            {auth.token && (<Link to={`/user/${auth.id}`}>Account</Link>)}
            {auth.token && (<button onClick={handleClick}>Log Out</button>)}

        </nav><Outlet />
        </div>
        );
    }

export default NavBar;
import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import postLogin from "../../api/post-login";
import useAuth from "../hooks/use_authentication";

function LoginForm() {

    
    const navigate = useNavigate();
    const {auth, setAuth} = useAuth()
    
    const [errorMessage, setErrorMessage] = useState("");
    const [formIsInvalid, setFormIsInvalid] = useState("");
   
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    })

    

    const handleChange = (event) => {
        const {id, value} = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }))
    }

    const handleSubmit = (event) => {
        setFormIsInvalid("")
        setErrorMessage("")

        event.preventDefault()

        if(credentials.username && credentials.password) {
            
            postLogin(
                credentials.username,
                credentials.password
            ).then((response) => {
                           
                if (response.token){
                    
                    window.localStorage.setItem("token", response.token);
                    window.localStorage.setItem("id", response.id);

                    // I don't think this is exactly working... consoling out auth after this
                    // returns an empty auth object.
                    setAuth({token: response.token, id: response.id})

                    //console.log("auth", auth)
                    navigate(`../user/${response.id}`)

                }

            }).catch((error) => {
                setErrorMessage(`${[error.message]}`)
            })

        } else {
            
            setFormIsInvalid("Enter a username and password")
        }

    }

    return(
        <div>
        <div className="banner">
                <div className="user-banner">
                <img src="../assets/logo.svg" width="140"></img>
                <h2>Sign In</h2>
                <img src="../assets/lifecycle.jpg" width='150' id='token'/>
                </div>
            </div>
            <div className="user-headers">
                <h3>Enter details below</h3>
            </div>
    <form className="form-update-user">
        <div>
            <label htmlFor="username">Username:</label>
            {/* <input type="text" id ="username" placeholder="Enter username" /> */}
            <input 
                type="text"
                id="username"
                placeholder="Enter username"
                onChange={handleChange}
                />
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            {/* <input type="password" id="password" placeholder="Password" /> */}
            <input type="password" id="password" placeholder="Password" onChange={handleChange} />
        </div> 
        <button  id="update-submit" type="submit" onClick={handleSubmit}>Login</button>
        <div>
            <p>{errorMessage}</p>
            <sub className={errorMessage ? "" : "hidden"}>{formIsInvalid}</sub>

        </div>
    </form></div>
    );
}
export default LoginForm
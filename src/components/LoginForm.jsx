import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import postLogin from "../../api/post-login";
import useAuth from "../hooks/use_authentication";

function LoginForm() {

    const navigate = useNavigate();

    const {auth, setAuth } = useAuth()
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
                if (response.token !== undefined){
                    window.localStorage.setItem("token", response.token);
                    window.localStorage.setItem("id", response.id);
                    setAuth({token: response.token, id: response.id})
                    navigate(`../user/${window.localStorage.getItem("id")}`)
                }
            }).catch((error) => {
                setErrorMessage(`${[error.message]}`)
            })

        } else {
            setFormIsInvalid("Enter a username and password")
        }
    }

    return(
    <form>
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
        <button type="submit" onClick={handleSubmit}>Login</button>
        <div>
            <p>{errorMessage}</p>
            <sub className={errorMessage ? "" : "hidden"}>Please check your username and password.</sub>
            <p>{formIsInvalid}</p>
        </div>
    </form>
    );
}
export default LoginForm
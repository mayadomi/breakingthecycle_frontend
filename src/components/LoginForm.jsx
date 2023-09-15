import { useState } from "react"; 
import postLogin from "../../api/post-login";
import { useNavigate, useOutletContext } from "react-router-dom";


function LoginForm() {

    const [loggedIn,setLoggedIn]  = useOutletContext({})
   
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    })

    const navigate = useNavigate();

    const handleChange = (event) => {
        const {id, value} = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }))
    }

    const handleSubmit = (event) => {

        event.preventDefault()

        if(credentials.username && credentials.password) {
            
            postLogin(
                credentials.username,
                credentials.password
            ).then((response) => {
                if (response.token !== undefined){
                    
                    window.localStorage.setItem("token", response.token);
                    window.localStorage.setItem("id", response.id);
                    const id = response.id;
                    setLoggedIn = true
                    navigate(`user/${id}`)
                } else {
                    setLoggedIn=false
                }
            })

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
    </form>
    );
}
export default LoginForm
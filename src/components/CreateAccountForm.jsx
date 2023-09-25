import { useState } from "react"; 
import { useNavigate} from "react-router-dom";
import postCreateAccount from "../../api/post-create-account";
import postLogin from "../../api/post-login";
import useAuth from "../hooks/use_authentication";


function CreateAccountForm() {

    const navigate = useNavigate();
    const {auth, setAuth } = useAuth()

    const [errorMessage, setErrorMessage] = useState("")
    const [formInvalid, setFormInvalid] = useState("")
    
    const [signupdetails, setSignupDetails] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    })

    const handleChange = (event) => {
        if (!auth.token){
        const {id, value} = event.target;
        setSignupDetails((prevDetails) => ({
            ...prevDetails,
            [id]: value,
        }))
    }   else {
        setFormInvalid("Already signed in")
    }
    }

    const handleSubmit = (event) => {

        event.preventDefault()

        if (!auth.token){
            if(signupdetails.username && signupdetails.password && signupdetails.first_name && signupdetails.last_name && signupdetails.email) {
                postCreateAccount(
                    signupdetails.username,
                    signupdetails.first_name,
                    signupdetails.last_name,
                    signupdetails.email,
                    signupdetails.password
                ).then((response) => {
                    postLogin(signupdetails.username, signupdetails.password).then(
                        (response) => {
                            window.localStorage.setItem("token", response.token)
                            window.localStorage.setItem("id", response.id)
                            navigate(`../user/${window.localStorage.getItem("id")}`)
                            setAuth({token: response.token, id: response.id})
                        }
                        
                    ).catch((error)=>{setErrorMessage(`${[error.message]}`)})
                }).catch((error)=>{setErrorMessage(`${[error.message]}`)})
                
            } else {
                setFormInvalid("Please complete the form")
            }
        } else {
            setFormInvalid("Already signed in")
        }
        }

    return(

        <div>
        <div className="banner">
                <div className="user-banner">
                <img src="../assets/logo.svg" width="140"></img>
                <h2>Create an Account</h2>
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
            <label htmlFor="first_name">First Name:</label>
            <input type="text" id="first_name" placeholder="First Name" onChange={handleChange} />
        </div> 
        <div>
            <label htmlFor="last_name">Last Name:</label>
            <input type="text" id="last_name" placeholder="Last Name" onChange={handleChange} />
        </div> 
        <div>
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" placeholder="Email" onChange={handleChange} />
        </div> 
        <div>
            <label htmlFor="password">Password:</label>
            {/* <input type="password" id="password" placeholder="Password" /> */}
            <input type="password" id="password" placeholder="Password" onChange={handleChange} />
        </div> 
        <button id="update-submit" type="submit" onClick={handleSubmit}>Sign Up</button>
        <div>
            <p>{errorMessage}</p>
            <sub className={errorMessage ? "" : "hidden"}><p>{formInvalid}</p></sub>
            
        </div>
    </form>
    </div>);
}
export default CreateAccountForm   
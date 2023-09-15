import { useState } from "react"; 
import postSignUp from "../../api/post-signup";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";



function SignupForm() {

    const navigate = useNavigate();
    const authToken = window.localStorage.getItem("token")

    // const { id } = useParams()

    const [signupdetails, setSignupDetails] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    })

    // const [userid, setUserID] = useState(Number)

    const handleChange = (event) => {
        const {id, value} = event.target;
        setSignupDetails((prevDetails) => ({
            ...prevDetails,
            [id]: value,
        }))
    }

    const handleSubmit = (event) => {

        event.preventDefault()

        if (!authToken){

            if(signupdetails.username && signupdetails.password && signupdetails.first_name && signupdetails.last_name && signupdetails.email) {
                console.log("here")
                postSignUp(
                    signupdetails.username,
                    signupdetails.first_name,
                    signupdetails.last_name,
                    signupdetails.email,
                    signupdetails.password
                ).then((response) => {
                    console.log(response)
                    // setUserID = response.id
                    // window.localStorage.setItem("token", response.token)
                    navigate("/login")
                })
            } else {
                console.log(signupdetails)
            }
        } else {
            navigate("/account")
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
        <button type="submit" onClick={handleSubmit}>Sign Up</button>
    </form>
    );
}
export default SignupForm   
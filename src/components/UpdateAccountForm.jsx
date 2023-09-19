import { useState } from "react"; 
import putUpdateAccount from "../../api/put-update-account";
import { useNavigate, useParams } from "react-router-dom";


function UpdateAccountForm() {

    const navigate = useNavigate();

    const {id} = useParams()

    const authToken = window.localStorage.getItem("token")

    const [isLoading, setIsLoading] = useState(false)

    const [errorMessage, setErrorMessage] = useState("")

    const [formInvalid, setFormInvalid] = useState("")

    const [userdetails, setUserDetails] = useState({
        first_name: "",
        last_name: "",
        email: "",
        is_active: true
    })

    const handleChange = (event) => {
        if (authToken){
        const {id, value} = event.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [id]: value,
        }))
        }
        else {
            setFormInvalid("Not signed in")
        }
    }

    const handleSubmit = (event) => {
        setIsLoading(true)
        if (authToken) {
        event.preventDefault()
        if(id && userdetails.first_name && userdetails.last_name && userdetails.email && userdetails.is_active) {
            console.log(id)
            console.log(userdetails)
            putUpdateAccount(
                id,
                userdetails.first_name,
                userdetails.last_name,
                userdetails.email,
                userdetails.is_active
            ).then((response) => {
                navigate(`/user/${id}`)
            }).catch((error)=>{
                setErrorMessage(`${[error.message]}`)
                setIsLoading(false)
            })
        } else {
            setFormInvalid("Please complete the form")   
        }
    } else {
        setFormInvalid("Not signed in")
        setIsLoading(false)
        navigate(`/`)

    }
    }

    if(isLoading) {
        return <p>Loading...</p>
    }

    return(
    <form>
        
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
            <label htmlFor="is_active">Active:</label>
            <input type="checkbox" id="is_active" value="true" checked onChange={handleChange} />
        </div> 
    
        <button type="submit" onClick={handleSubmit}>Update Account</button>
        <div>
            <p>{errorMessage}</p>
            <sub className={errorMessage ? "" : "hidden"}><p>{formInvalid}</p></sub>
            
        </div>
    </form>
    );
}
export default UpdateAccountForm   
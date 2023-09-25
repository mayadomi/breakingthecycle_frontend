import { useState } from "react"; 
import postCreateRider from "../../api/post-create-rider";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/use_authentication";


function CreateRiderForm() {

    const {auth, setAuth} = useAuth()
    const navigate = useNavigate();

    const user = localStorage.getItem('id')
    const [errorMessage, setErrorMessage] = useState("");
    const [formInvalid, setFormInvalid] = useState("")

    const [riderdetails, setRiderDetails] = useState({
        team: "",
        bio: "",
        rate: 1,
        kms_ceiling: 0,
    })

    const handleChange = (event) => {
        if (auth.token) {
            const {id, value} = event.target;
            setRiderDetails((prevDetails) => ({
                ...prevDetails,
                [id]: value,
            }))
        } else {
            setFormInvalid("You must be logged in as a user to create a rider")
        }
    }

   

    const handleSubmit = (event) => {

        event.preventDefault()

        if (auth.token) {

        if(riderdetails.team && riderdetails.bio && riderdetails.rate && riderdetails.kms_ceiling) {
            postCreateRider(
                riderdetails.team,
                riderdetails.bio,
                riderdetails.rate,
                riderdetails.kms_ceiling
            ).then((response) => {
                navigate(`/user/${response.rider_user_id}`)
            }).catch((error) => {
                setErrorMessage(`${[error.message]}`)
            })
        }
    } else {
        setFormInvalid("You must be logged in as a user to create a rider")
    }
    }

    return(<div>
        <div className="banner">
                <div className="user-banner">
                <img src="../assets/logo.svg" width="140"></img>
                <h2>Create a rider</h2>
                <img src="../assets/lifecycle.jpg" width='150' id='token'/>
                </div>
            </div>
            <div className="user-headers">
                <h3>Enter rider details below</h3>
            </div>
    <form className="form-update-user">
        <div>
            <label htmlFor="team">Team:</label>
            {/* <input type="text" id ="username" placeholder="Enter username" /> */}
            <input 
                type="text"
                id="team"
                placeholder="Team name"
                onChange={handleChange}
                />
        </div>
        <div>
            <div>
            <label htmlFor="bio">Biography:</label>
            </div>
            <textarea id="bio" wrap="hard" rows="2" cols="20" placeholder="Tell us about yourself as a rider..." onChange={handleChange} />
        </div> 
        <div>
            <label htmlFor="rate">Kms to $ Rate:</label>
            <select name="rate-number" id="rate" onChange={handleChange}>
                <option value="1">1km</option>
                <option value="2">2kms</option>
                <option value="5">5kms</option>
                </select>
        </div> 
        <div>
            <label htmlFor="kms_ceiling">Kms Goal:</label>
            <input type="number" id="kms_ceiling" placeholder="100" onChange={handleChange} />
        </div> 
    
        <button id="update-submit" type="submit" onClick={handleSubmit}>Create Rider</button>
        <div>
            <p>{errorMessage}</p>
            <sub className={errorMessage ? "" : "hidden"}><p>{formInvalid}</p></sub>
        </div>
    </form></div>
    );
}
export default CreateRiderForm   
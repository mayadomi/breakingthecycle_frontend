import { useState } from "react"; 
import putUpdateRider from "../../api/put-update-rider";
import useRider from "../hooks/use-rider";
import { useNavigate, useParams } from "react-router-dom";
import './UpdateRiderForm.css'
import useAuth from "../hooks/use_authentication";

function UpdateRiderForm() {

    const navigate = useNavigate();
    const {id} = useParams()
    const {rider, isLoading, error} = useRider(id)// Need to implement errors
    const {auth, setAuth } = useAuth()
    const [errorMessage, setErrorMessage] = useState("")
    const [formInvalid, setFormInvalid] = useState("")
    const [riderdetails, setRiderDetails] = useState({
        team: "",
        bio: "",
        rate: 1,
        kms_ceiling: 0,
    })

    const handleChange = (event) => {
        if (auth.token){
        const {id, value} = event.target;
        setRiderDetails((prevDetails) => ({
            ...prevDetails,
            [id]: value,
        }))
        }
        else {
            setFormInvalid("You must be logged in as the user to update a rider")
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (auth.token) {
            if(id && riderdetails.team && riderdetails.bio && riderdetails.rate && riderdetails.kms_ceiling) {
                putUpdateRider(
                    id,
                    riderdetails.team,
                    riderdetails.bio,
                    riderdetails.rate,
                    riderdetails.kms_ceiling
                ).then((response) => {
                    
                    navigate(`/user/${rider.rider_user_id}`)
                }).catch((error)=>{
                    setErrorMessage(`${[error.message]}`)
                    setIsLoading(false)
                })
            }
        } else {
         setFormInvalid("You must be logged in as the user to update a rider")
        }
    }

    return(
<div>
        <div className="banner">
            <div className="rider-update-banner">
                <img src="../../assets/logo.svg" width="140"></img>

                <h2>{rider.rider_first_name} {rider.rider_last_name}</h2>
                
                <img src="../../assets/lifecycle.jpg" width='150' id='token'/>
            </div>
            <div className="rider-update-headers">
                <h3>Update Rider</h3>
            </div>

            </div>

    <form className="form-update-rider">
        <div>
            <div>{formInvalid}</div>
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
            <label htmlFor="bio">Biography:</label>
        </div> 
            <textarea id="bio" wrap="hard" rows="2" cols="20" placeholder="Tell us about yourself as a rider..." onChange={handleChange} />
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
    
        <button id="update-rider-submit" type="submit" onClick={handleSubmit}>Update Rider</button>
    </form>
    <div>
            <p>{errorMessage}</p>
            <sub className={errorMessage ? "" : "hidden"}><p>{formInvalid}</p></sub>
            
        </div>
    </div>
    );
}
export default UpdateRiderForm   
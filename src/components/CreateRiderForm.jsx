import { useState } from "react"; 
import postCreateRider from "../../api/post-create-rider";
import { useNavigate } from "react-router-dom";



function CreateRiderForm() {

    const navigate = useNavigate();

    const user = localStorage.getItem('id')

    const [riderdetails, setRiderDetails] = useState({
        team: "",
        bio: "",
        rate: 1,
        kms_ceiling: 0,
    })

    const handleChange = (event) => {
        const {id, value} = event.target;
        setRiderDetails((prevDetails) => ({
            ...prevDetails,
            [id]: value,
        }))
    }

    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (event) => {

        event.preventDefault()

        if(riderdetails.team && riderdetails.bio && riderdetails.rate && riderdetails.kms_ceiling) {

            console.log("here")

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
    }

    return(
    <form>
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
            <label htmlFor="bio">Biography:</label>
            <input type="text" id="bio" placeholder="Tell us about yourself as a rider..." onChange={handleChange} />
        </div> 
        <div>
            <label htmlFor="rate">Kms to $ Rate:</label>
            <input type="number" id="rate" placeholder="2" onChange={handleChange} />
        </div> 
        <div>
            <label htmlFor="kms_ceiling">Kms Goal:</label>
            <input type="number" id="kms_ceiling" placeholder="100" onChange={handleChange} />
        </div> 
    
        <button type="submit" onClick={handleSubmit}>Create Rider</button>
        <div>
            <p>{errorMessage}</p>
            <sub className={errorMessage ? "" : "hidden"}></sub>
        </div>
    </form>
    );
}
export default CreateRiderForm   
import { useState } from "react"; 
import putUpdateRider from "../../api/put-update-rider";
import { useNavigate, useParams } from "react-router-dom";


function UpdateRiderForm() {

    const navigate = useNavigate();
    const {id} = useParams()
    const user = window.localStorage.getItem('id')

    const authToken = window.localStorage.getItem("token")
    const [errorMessage, setErrorMessage] = useState("")
    const [formInvalid, setFormInvalid] = useState("")

    const [riderdetails, setRiderDetails] = useState({
        team: "",
        bio: "",
        rate: 1,
        kms_ceiling: 0,
    })

    const handleChange = (event) => {
        if (authToken){
        const {id, value} = event.target;
        setRiderDetails((prevDetails) => ({
            ...prevDetails,
            [id]: value,
        }))
        }
        else {
            setFormInvalid("Not signed in")
        }
    }

    const handleSubmit = (event) => {

        event.preventDefault()
        if(id && riderdetails.team && riderdetails.bio && riderdetails.rate && riderdetails.kms_ceiling) {
            console.log("here")
            putUpdateRider(
                id,
                riderdetails.team,
                riderdetails.bio,
                riderdetails.rate,
                riderdetails.kms_ceiling
            ).then((response) => {
                console.log(response)
                if (response == "A rider already exists for this account"){
                    navigate(`/${user}`)
                } else {
                // setUserID = response.id
                // window.localStorage.setItem("token", response.token)
                navigate(`/${response.rider_user_id}`)}
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
    
        <button type="submit" onClick={handleSubmit}>Update Rider</button>
    </form>
    );
}
export default UpdateRiderForm   
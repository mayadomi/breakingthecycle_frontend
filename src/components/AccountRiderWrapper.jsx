
import { useEffect } from "react";
import useRider from "../hooks/use-rider";
import RiderCard from "./RiderCard";
import { useNavigate, useNavigation } from "react-router-dom";

function AccountRiderWrapper (props) {
console.log("rider_id ", props.rider_id)
const {rider, isRiderLoading, riderLoadingError } = useRider(props.rider_id)
const navigate = useNavigate()
useEffect(() => {
    if (!props.isUserLoading) {
        // const {rider, isRiderLoading, riderLoadingError } = useRider(rider_id)
    }
}, [props.isUserLoading])

if (isRiderLoading){
    return<div>User information loading...</div>
} 

if (riderLoadingError) {
    return<div>{userLoadingError.message}</div>
}


const createRiderClick =() => {
    navigate('/rider/create-rider')
}

    const updateRiderClick =() => {
        navigate(`/rider/update-rider/${rider.rider_id}`)
    }
return(
    <>
    {rider.rider_id != null ? (
        <div className="account-rider-details"><button className="update-button" onClick={updateRiderClick}>Update rider</button >
<RiderCard riderData={rider}></RiderCard></div>
) : (
<button className="update-button" onClick={createRiderClick}>Create rider</button>
)
}</>)
} 
export default AccountRiderWrapper
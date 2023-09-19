
import { useEffect } from "react";
import useRider from "../hooks/use-rider";
import RiderCard from "./RiderCard";

function AccountRiderWrapper (props) {
console.log("rider_id ", props.rider_id)
const {rider, isRiderLoading, riderLoadingError } = useRider(props.rider_id)

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
    <div>
    {rider.rider_id != null ? (
    <div>
<button onClick={updateRiderClick}>Click to update rider details</button>
<RiderCard riderData={rider}></RiderCard></div>
) : (
<button onClick={createRiderClick}>Create rider</button>
)
}</div>)
} 
export default AccountRiderWrapper
import { useState } from "react";
import useUser from "../hooks/use-user";
import useRider from "../hooks/use-rider";
import useAuth from "../hooks/use_authentication";
import { useNavigate, useParams } from 'react-router-dom';
import RiderCard from "../components/RiderCard";

function AccountPage() {

    const {id} = useParams();

    const navigate = useNavigate();

    const {user, isUserLoading, userLoadingError} = useUser(id)

    const {rider, isRiderLoading, riderLoadingError } = useRider(user.rider)

    if (isUserLoading){
        return<div>User information loading...</div>
    } 

    if (userLoadingError) {
        return<div>{userLoadingError.message}</div>
    }

    if (isRiderLoading){
        return<div>User information loading...</div>
    } 

    if (riderLoadingError) {
        return<div>{userLoadingError.message}</div>
    }

    const updateAccountClick = () => {
        {navigate(`/user/${id}/update-user`)}
    }
    
    const createRiderClick =() => {
        navigate('/rider/create-rider')
    }
    
    const updateRiderClick =() => {
        navigate(`/rider/update-rider/${rider.rider_id}`)
    }


    return(
        <div>
            <h2>{user.first_name} {user.last_name}</h2>
            <h5>Created at: {user.date_joined}</h5>
            <h5>Email: {user.email}</h5>
            <button onClick={updateAccountClick} >Click to update profile</button>
            <h3>Rider: </h3>
            {rider.rider_id != null ? (
                <div>
            <button onClick={updateRiderClick}>Click to update rider details</button>
            <RiderCard riderData={rider}></RiderCard></div>
            ) : (
            <button onClick={createRiderClick}>Create rider</button>
            )
            }
                         
        </div>
    );
}
export default AccountPage
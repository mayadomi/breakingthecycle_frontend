import { useState } from "react";
import useUser from "../hooks/use-user";
import useAuth from "../hooks/use_authentication";
import { useNavigate, useParams } from 'react-router-dom';
import RiderCard from "../components/RiderCard";
import AccountRiderWrapper from "../components/AccountRiderWrapper";

function AccountPage() {

    const {id} = useParams();

    const navigate = useNavigate();

    const {user, isUserLoading, userLoadingError} = useUser(id)


    if (isUserLoading){
        return<div>User information loading...</div>
    } 

    if (userLoadingError) {
        return<div>{userLoadingError.message}</div>
    }


    const updateAccountClick = () => {
        {navigate(`/user/${id}/update-user`)}
    }
 

console.log("user ", user)

    return(
        <div>
            <h2>{user.first_name} {user.last_name}</h2>
            <h5>Created at: {user.date_joined}</h5>
            <h5>Email: {user.email}</h5>
            <button onClick={updateAccountClick} >Click to update profile</button>

            <h3>My donations:</h3>
            
            
            <h3>Rider: </h3>
            <AccountRiderWrapper rider_id={user.rider} isUserLoading={isUserLoading}/>

            
        </div>
    );
}
export default AccountPage
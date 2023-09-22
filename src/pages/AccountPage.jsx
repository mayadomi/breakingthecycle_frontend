import { useState } from "react";
import useUser from "../hooks/use-user";
import useAuth from "../hooks/use_authentication";
import { useNavigate, useParams } from 'react-router-dom';
import RiderCard from "../components/RiderCard";
import AccountRiderWrapper from "../components/AccountRiderWrapper";
import './AccountPage.css'

function AccountPage() {

    const setAuth = useAuth()

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
 
    const formatedDate = new Date(user.date_joined)
    
    console.log(user.donations)

    return(
        <div>

            <div className="banner">
                <div className="user-banner">
                <img src="../assets/logo.svg" width="150"></img>
                <h2>{user.first_name} {user.last_name}</h2>
                <img src="../assets/lifecycle.jpg" width='150' id='token'/>
                </div>
            </div>

            
            <div className="user-headers">
            <h3>My Info</h3>
            </div>

            <div className="user-info">
                <div className="user-details">
                    <h5>Created at: {formatedDate.getDay()}/{formatedDate.getMonth()}/{formatedDate.getFullYear()}</h5>
                    <h5>Email: {user.email}</h5>
                </div>


            <button id="update" onClick={updateAccountClick} >Update profile</button>

            </div>

            <div className="user-headers">
                <div className="self-donations">
                    <h3>My donations:</h3>
                    <ul>
                        {user.donations.map((donationData, key) => {

                            const dateDonated = new Date(donationData.date_donated)
                            const day = dateDonated.getDay()
                            const month = dateDonated.getMonth()
                            const year = dateDonated.getFullYear()

                            return(
                                <li key={key}>
                                    <div>
                                    
                                   <p> ${donationData.amount} on  {day}/{month}/{year}</p>
                                   </div>
                                </li>
                                
                            )
                        })}
                    </ul>
            </div>
            </div>

            <div className="user-headers">

            
            <h3>My Rider: </h3>
            <AccountRiderWrapper rider_id={user.rider} isUserLoading={isUserLoading}/>
            </div>
            
        </div>
    );
}
export default AccountPage
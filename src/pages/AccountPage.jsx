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

    const deleteDonationClick = () => {
        use
    }
 
    const formatedDate = new Date(user.date_joined)

    if(user.donations != []) {
        const donationsExist = true
    } else {
        const donationsExist =  false
    } 
    
    console.log(user.donations)

    return(
        <div>

            <div className="banner">
                <div className="user-banner">
                <img src="../assets/logo.svg" width="140"></img>
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


            <button className="update-button" onClick={updateAccountClick} >Update profile</button>

            </div>

            <div className="user-headers">
                
                    <h3>My donations</h3>
                    <div className="self-donations">
                    <ul>
                        {
                            user.donations?.length > 0 ?
                            user.donations.map((donationData, key) => {
                                const dateDonated = new Date(donationData.date_donated)
                                const day = dateDonated.getDay()
                                const month = dateDonated.getMonth()
                                const year = dateDonated.getFullYear()
                                return(<li key={key}>
                                    <div>
                                        <p> ${donationData.amount} on  {day}/{month}/{year}</p>
                                        <button>Delete this donation</button>
                                    </div>
                                    </li>)
                                }
                                )
                                :<div className="no-donations">No donations made yet</div>
                        }
                    </ul>
            </div>
            <h5>Delete one of my donations</h5>
            </div>

            <div className="user-headers">

            
            <h3>My Rider </h3>
            <div className="account-rider-info">
            <AccountRiderWrapper rider_id={user.rider} isUserLoading={isUserLoading}/>
            </div>
            
        </div>
        </div>
    );
}
export default AccountPage
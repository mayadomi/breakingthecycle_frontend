import { useState } from "react";
import useUser from "../hooks/use-user";
import useAuth from "../hooks/use_authentication";
import deleteDonation from "../../api/delete-donation";
import useDeleteDonation from "../hooks/use-delete-donation";
import { useNavigate, useParams } from 'react-router-dom';
import RiderCard from "../components/RiderCard";
import AccountRiderWrapper from "../components/AccountRiderWrapper";
import './AccountPage.css'
import LoginPage from "./LoginPage";

function AccountPage() {

    const {auth, setAuth } = useAuth()
    const navigate = useNavigate();
    const {id} = useParams();

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
    // Need to get this to update the user component without refreshing whole page.
    const deleteDonationClick = (event) => {
          const donation_id = event.currentTarget.getAttribute('donation_id')
          console.log(donation_id)

          useDeleteDonation(donation_id)
      
          alert("Donation deleted!")          
    }

    const loginClick =() => {
        {navigate(`/login`)}
    }
 
    const formatedDate = new Date(user.date_joined)

    
    if(user.donations != []) {
        const donationsExist = true
    } else {
        const donationsExist =  false
    } 

    return(
        <div>

            <div className="banner">
                <div className="user-banner">
                <img src="../assets/logo.svg" width="140"></img>
                <h2>{user.first_name} {user.last_name}</h2>
                <img src="../assets/lifecycle.jpg" width='150' id='token'/>
                </div>
            </div>

            {auth.token==null ? (<div>
            <div className="user-headers">
                <h3>Must be logged in</h3>
            </div>
            <div className="user-not-loggedin">
            <button onClick={loginClick}>Go to login</button>
        </div></div>
            ):
            (<div>
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
                            <div className="donation-delete">
                                <p> ${donationData.amount} on  {day}/{month}/{year}</p>
                                <button className="delete-donation" donation_id={donationData.id} onClick={deleteDonationClick}>Delete this donation</button>
                            </div>
                            </li>)
                        }
                        )
                        :<div className="no-donations">No donations made yet</div>
                }
            </ul>
            </div>
            </div>
            
            <div className="user-headers">

            
            <h3>My Rider </h3>
            <div className="account-rider-info">
            <AccountRiderWrapper rider_id={user.rider} isUserLoading={isUserLoading}/>
            </div>
            
        </div></div>

            )}

            
           

            

            

        </div>
    );
}
export default AccountPage
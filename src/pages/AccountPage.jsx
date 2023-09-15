import useRider from "../hooks/use-rider";
import { useNavigate, useParams } from 'react-router-dom';

function AccountPage() {
    // return <h1>This is the project pageh1>;
    const navigate = useNavigate();


    const {id} = useParams();
    const {rider, isLoading, error} = useRider(id)
    
    if (isLoading){
        return<div>I'm still loading</div>
    }
    return(
        <div>
            <h2>{rider.rider_user_name}</h2>
            <h5>Created at: {rider.date_created}</h5>
            {/* <h3>{`Status: ${rider.is_active}`}</h3> */}
            <h3>Bio:</h3>
            <h5>{rider.bio}</h5>
            <h3>Kms to ride: {rider.kms_to_ride}kms </h3>
            <h3>Donations</h3>
            <button>Donate now!</button>
            <ul>
                {rider.donations.map((donationData, key) => {
                    return (
                        <li key={key}>
                            ${donationData.amount} from {donationData.donor_first_name}
                        </li>
                    );
                })}
            </ul>
            <h3>Updates</h3>
            <ul>
            {rider.updates.map((updateData, key) => {
                    return (
                        <li key={key}>
                        <div>
                            <img src={updateData.image} width={250}/></div>
                            {rider.rider_first_name} rode {updateData.kms_ridden}kms and says: {updateData.description}
                            
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
export default AccountPage
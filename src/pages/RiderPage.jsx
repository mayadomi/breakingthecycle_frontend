import useRider from "../hooks/use-rider";
import { useParams } from 'react-router-dom';
import DonationForm from'../components/DonationForm'


function RiderPage() {

    const {id} = useParams();

    const {rider, isLoading, error} = useRider(id)
    
    if (isLoading){
        return<div>I'm still loading</div>
    }
    return(
        <div>
            <h2>{rider.rider_user_name}</h2>
            <h5>Created at: {rider.date_created}</h5>
            <h3>Bio:</h3>
            <h5>{rider.bio}</h5>
            <h3>Kms to ride: {rider.kms_to_ride}kms </h3>
            
            <div>
            <h3>Sponsor me</h3>
            <DonationForm></DonationForm>
            </div>

            <h3>Donations</h3>
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
export default RiderPage
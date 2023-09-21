// import { Link } from 'react-router-dom';
// import './RiderCard.css';
import useRider from "../hooks/use-rider";



function DonationCard(props) {
    const { donationData } = props;
    // const {rider, isLoading, error }
        

    return (
        <div class="donation">
            <h4 class="amount">${donationData.amount}</h4>
            <div class="donation-details">
                    <h4 class="from"><strong>{donationData.donor_first_name} </strong>
                     donated to {donationData.rider_first_name} {donationData.rider_last_name}</h4>
            </div>
            {/* <Link to={riderPath} >
                <h3>{riderData.rider_user_name}</h3>
                <img src={riderData.avatar_image} />
                <h4>{riderData.team}</h4>
                <h4>{riderData.bio}</h4>
            </Link> */}
        </div>
    );
}

export default DonationCard;
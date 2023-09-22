// import { Link } from 'react-router-dom';
// import './RiderCard.css';
import useRider from "../hooks/use-rider";



function DonationCard(props) {
    const { donationData } = props;
    // const {rider, isLoading, error }
        

    return (
        <div className="donation">
            <h4 className="amount">${donationData.amount}</h4>
            <div className="donation-details">
                    <h4><span className="from">{donationData.donor_first_name}</span> donated to {donationData.rider_first_name} {donationData.rider_last_name}</h4>
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
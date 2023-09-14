// import { Link } from 'react-router-dom';
// import './RiderCard.css';
import useRider from "../hooks/use-rider";



function DonationCard(props) {
    const { donationData } = props;
    // const {rider, isLoading, error }
        

    return (
        <div className="donation-card">
            <h4>amount:{donationData.amount}</h4>
            <h4>from:{donationData.donor_first_name}</h4>
            <h4>to: {donationData.rider_first_name} {donationData.rider_last_name}</h4>
            <h4>{}</h4>
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
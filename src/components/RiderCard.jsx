import { Link } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import './RiderCard.css';


function RiderCard(props) {
    const { riderData } = props;
    const riderPath = `rider/${riderData.rider_id}`   
    // const {rider, isLoading, error }

    return (
        <div className="rider-card">
            <Link to ={riderPath}>
                <img src={riderData.avatar_image} />
                <h4>{riderData.rider_first_name} {riderData.rider_last_name}</h4>
                
                <h4>${riderData.amount_donated}</h4>
                <h4>{riderData.kms_ridden}</h4>
                <div><ProgressBar bgcolor="#6a1b9a" completed={riderData.amount_donated}/></div>
                </Link>
            {/* <Link to={riderPath} >

            </Link> */}
        </div>
    );
}

export default RiderCard;
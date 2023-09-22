import { Link, useLocation } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import './RiderCard.css';


function RiderCard(props) {

    const location = useLocation()

    const { riderData } = props;

    // This feels hacky/wrong way of doing it - essentially,
    // trying to get the right route/absolute path depending on where
    // user has clicked from - ie from their account vs from the home page
    
    let riderPath = ""

    if (location.pathname.includes(`user`)){

        riderPath = `../../rider/${riderData.rider_id}`

    } else if (location.pathname.includes(`donate`)) {

        riderPath = `../../rider/${riderData.rider_id}`
    }
    
    else {
        riderPath = `rider/${riderData.rider_id}`
    }
   

    return (
        
        <div className="rider-card">
    
            <Link to={riderPath} >
                <img src={riderData.avatar_image} />
                <div className='rider-details'>
                    <h4 id='rider-name'>{riderData.rider_first_name} {riderData.rider_last_name}</h4>
                    <div>{riderData.amount_donated == null ? (<h4 className='raised'>$0 raised</h4>) : (<h4 className='raised'>${riderData.amount_donated} raised</h4>) } </div>
                    
                    {/* <h4>{riderData.kms_to_ride}</h4> */}
                <div className='containerStyles'><ProgressBar completed={riderData.kms_ridden} toComplete={riderData.kms_to_ride}/></div>
                </div>
                
            </Link>
            </div>
    );
}

export default RiderCard;
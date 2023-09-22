import useRider from "../hooks/use-rider";
import { useParams } from 'react-router-dom';
import DonationForm from'../components/DonationForm'
// import '../main.css'
import './RiderPage.css'



function RiderPage() {

    const {id} = useParams();

    const {rider, isLoading, error} = useRider(id)
    
    if (isLoading){
        return<div>I'm still loading</div>
    }

    console.log(rider.date_created)

    const riderDate = new Date(rider.date_created)
    const dateNow = new Date()
    const day = 1000*60*60*24
    const hour =  1000*60*60
    let days
    days = Math.ceil((dateNow.getTime()-riderDate.getTime())/(day))
    // console.log(riderDate.getTime())


    return(
        <div className="rider-main">
            <div className="banner">
                <div className="rider-banner">
                <img src="../assets/logo.svg" width="150"></img>
                <h2>{rider.rider_first_name} {rider.rider_last_name}</h2>
                <img src="../assets/lifecycle.jpg" width='150' id='token'/>
                </div>
            </div>

            <div className="rider-body">
                <img src={rider.avatar_image}/>

                <div id="raised">
                    <h2>${rider.amount_donated}</h2>
                    <h5>Raised</h5>
                </div>

                <div id="ride">
                    <h2>{rider.kms_to_ride}</h2>
                    <h5>Kms to Ride</h5>
                </div>

                <div id="ridden">
                <h2>{rider.kms_ridden}</h2>
                    <h5>Kms Ridden So Far</h5>

                </div>
                <div id="days">
                <h2>{days}</h2>
                <h5>Days since start</h5>

                </div>


            </div>
            <div className="rider-info">
            
            <h3>About me</h3>
            <h5>{rider.bio}</h5>

            </div>
           
            
            <div className="rider-headers">
            <h3>Sponsor me</h3>
            <div className="rider-sponsor">

            <DonationForm props={rider.rate}></DonationForm>
            </div>
            </div>
            <div className="rider-headers">

                <div className="recent-donations">

                <h3>Donations</h3>
                <ul>
                    {rider.donations.sort((a,b) => {
                        return b.id - a.id
                    }).
                        map((donationData, key) => {

                            // This should be utils, like above one too
                            const donationDate = new Date(donationData.date_donated)
                            const dateNow = new Date()
                            const day = 1000*60*60*24
                            const hour =  1000*60*60

                            let days
                            days = Math.ceil((dateNow.getTime()-donationDate.getTime())/(day))

                            let hours
                            hours = Math.ceil((dateNow.getTime()-donationDate.getTime())/(hour))
                            let stringtoshow

        
                            if (hours == 1 ) {
                                stringtoshow = days + " day ago."
                            }else if (hours > 25 ) {
                                stringtoshow = days + " days ago."
                            } else {
                                stringtoshow = hours + " hours ago."
                            }

                            return (
                            <li key={key}>
                                ${donationData.amount} from {donationData.donor_first_name}  {stringtoshow}
                            </li>
                        );
                    })}
                </ul>
                </div>
            </div>
            <div className="rider-headers">

            <div className="recent-donations">
            <h3>Updates</h3>
            <ul>
            {rider.updates.map((updateData, key) => {
                    return (
                        <li key={key}>
                        <div className="update">
                            <img src={updateData.image} width={250}/>
                            <p>{rider.rider_first_name} rode {updateData.kms_ridden}kms and says: {updateData.description}</p>
                            
                            </div>
                        </li>
                    );
                })}
            </ul>
            </div>
            </div>
        </div>
    );
}
export default RiderPage
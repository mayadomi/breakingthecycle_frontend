import useRider from "../hooks/use-rider";
import { useParams } from 'react-router-dom';
import DonationForm from'../components/DonationForm'
// import '../main.css'
import './RiderPage.css'



function RiderPage() {

    const {id} = useParams();

    const {rider, isLoading, error} = useRider(id)
    
    // if (isLoading){
    //     return<div>I'm still loading</
    // }

    console.log(rider.date_created)

    const riderDate = new Date(rider.date_created)
    const dateNow = new Date()
    const day = 1000*60*60*24
    const hour =  1000*60*60
    let days
    days = Math.ceil((dateNow.getTime()-riderDate.getTime())/(day))
    // console.log(riderDate.getTime())


    return(
        <div>
            <div className="banner">
                <div className="rider-banner">
                <img src="../assets/logo.svg" width="140"></img>
                    <div className="holder">
                        <div className="subholder">
                        <h5 className="rider-special">
                            <div className="verticalFlip">
                                <span>Rider</span>
                                <span>Adventurer</span>
                                <span>Goal-kicker</span>
                                <span>Inspiring</span>
                                <span>Legend</span>
                            </div>
                        </h5>
                        </div>
                <h2>{rider.rider_first_name} {rider.rider_last_name}</h2>
                    </div>
                <img src="../assets/lifecycle.jpg" width='150' id='token'/>
                </div>   
            </div>

            <div className="rider-body">
                <img src={rider.avatar_image}/>
                <div class='rider-body-wrap'>
                <div id="raised">
                    {rider.amount_donated == null ?
                    <h2>$0</h2> : <h2>${rider.amount_donated}</h2>}
                    <h5>Raised</h5>
                </div>

                <div id="ride">
                    {rider.kms_to_ride == null ?
                    <h2>0<span className="units">kms</span></h2> : <h2>{rider.kms_to_ride}<span className="units">kms</span></h2>
                    }
                    <h5>To Ride</h5>
                </div>

                <div id="ridden">
                    {rider.kms_ridden == null ?
                    <h2>0<span className="units">kms</span></h2> :<h2>{rider.kms_ridden}<span className="units">kms</span></h2>
                    }
                    <h5>Ridden</h5>

                </div>
                <div id="days">
                    
                <h2>{days}<span className="units">days </span></h2>
                <h5>Into Training</h5>

                </div>
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
                {rider.donations?.length > 0 ?
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
                </ul> : <div className="nothing-yet">No donations yet.</div>
                }
                </div>
            </div>
            <div className="rider-headers">

            <div className="recent-donations">
            <h3>Updates</h3>
            {rider.updates?.length > 0 ? 
            
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
            </ul> : <div className="nothing-yet">No updates yet. </div>
            }

            </div>
            </div>
        </div>
    );
}
export default RiderPage
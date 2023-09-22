import useRiders from "../hooks/use-riders";
import RiderCard from "../components/RiderCard";
import useDonations from "../hooks/use-donations";
import DonationCard from "../components/DonationCard";
import DonationPage from "./DonationPage";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/use_authentication";


import "../main.css"
import "./HomePage.css";


function HomePage() {
    const navigate = useNavigate();
    //const { riders, isRidersLoading, isRidersError } = useRiders();
    const { donations, isDonationLoading, isDonationsError } = useDonations();
    //const { auth } = useAuth()

    const donationSum = donations.reduce((current, donation) => current + donation.amount, 0);
    const recentDonations = donations.slice(-5)

    if (isDonationLoading){
        return<div>Donations incoming</div>
    }
    if (isDonationsError){
        return<div>{isDonationsError.message}</div>
    }

    const handleClick = () => {
        navigate("/donate/")
    }

    return (
        <div>
            <div className="hero">
            
                <div className="bg-image">

                    <div className="blur">

                        <div className="bg-text">

                            <img src="../assets/logo.svg" width="400"></img>
                            <div className="summary">
                                <h3 className="summary-text">On average, one woman a week is murdered by her current or former 
                                        partner and new resrearch shows that women overwhelming experience 
                                        physical assault at home.</h3>
                                
                                <button className="button-hero" onClick={handleClick}>Donate Now</button>
                            </div>
                        </div>
                    
                    </div>
                
                </div>

            </div>

            <div className='targets'>
                          
                <div id="fundraising-target">
                    <h2>$200,000</h2>
                    <h5>Target</h5>
                </div>

                <div id="amount-raised">
                    <h2>${donationSum}</h2>
                    <h5>Raised</h5>
                </div>

            </div>

            <div className="impact-purpose">

                <div className="section-header"><h3>About</h3></div>

                <div className="impact">
                <h4>
                    Every year LifeCycle Cycling Club brings together the cycling and broader community for
                    a cycling criterium race event to:
                </h4>
                    <ul>
                        <li>raise awareness about the endemic and devasting impacts of domestic violence 
                            in local Australian communities
                        </li>
                        <li>
                            fundraise vital funds for organisations on the front line supporting victims and families of
                            domestic violence
                        </li>
                        <li>
                            empower women in learning how to cycle, race and seek pathways to wellbeing and community
                            through grassroots sports
                        </li>
                        <li>
                            providing appropriate pathways/spaces for women to participate in cycling, free from
                            hostile, exclusionary behaviours and practices.
                        </li>
                    </ul>
                </div>

                <div className="section-header"><h3>How</h3></div>
                    <div className="impact">
                        <h4>Each woman who signs up to race in any of the event races has the opportunity to
                        create a Rider profile to fundraise for the event's charity partners.</h4>
                        
                        <h4>For every $ donated to the rider, it adds to the target kms for her to train in preparation
                        for the race.</h4> 

                        <h4>As certain funding and training milestones are completed, LifeCycle Cycling Club will run
                        training and skills sessions for the riders, including: </h4>
                        <ul>
                        <li>How does a criterium race format work
                        </li>
                        <li>
                            Riding safely/confidently in a bunch
                        </li>
                        <li>
                            How sprint for the finish
                        </li>
                        <li>
                            Bicycle handling skills - cornering, slowing, speeding up, stopping, hand signals etc.
                        </li>
                    </ul>
                       <h4>As women sign up, fundraise and train together they start to build the confidence, skills, experience and networks
                        to keep riding long after the event; sustaining engagement, wellbeing and revitalising women's
                        cycling and racing communities and inpsiring younger generations to participate.</h4> 

                    </div>
        

            </div>
                        

           
            <div className="section-header"><h3>Charity Partners</h3></div>
            <div className="donations-container">

                <div className="donations">
                    
                    {recentDonations.map((donationData, key) => {
                    return <DonationCard key={key} donationData={donationData} />
                    })}
                  

                </div>
            </div>

            <div id="charity-partners">
                <a href="https://www.whiteribbon.org.au/" ><img src="../assets/white_ribbon.jpg"></img></a>
                <a href="https://www.beyonddv.org.au/"><img src="../assets/bdv.png"></img></a>
                <a href="https://bdvs.org.au/"><img src="../assets/bdvslogo.png"></img></a>
                <a href="https://www.smallsteps4hannah.com.au/"><img src="../assets/f4h.png"></img></a>
            </div>


            <div className="section-header"><h3>Support our Riders</h3></div>
          
     
            <div id="rider-list">
                <DonationPage />
            </div> 
        </div>
    );
}
export default HomePage;
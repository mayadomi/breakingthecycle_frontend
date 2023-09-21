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
            <div class="hero">
            
                <div class="bg-image">

                    <div class="blur">

                        <div class="bg-text">

                            <img src="../assets/logo.svg" width="400"></img>
                            <div class="summary">
                                <h3 class="summary-text">On average, one woman a week is murdered by her current or former 
                                        partner and new resrearch shows that women overwhelming experience 
                                        physical assault at home.</h3>
                                
                                <button class="button-hero" onClick={handleClick}>Donate Now</button>
                            </div>
                        </div>
                    
                    </div>
                
                </div>

            </div>

            <div class='targets'>
                          
                <div id="fundraising-target">
                    <h2>$200,000</h2>
                    <h5>Target</h5>
                </div>

                <div id="amount-raised">
                    <h2>${donationSum}</h2>
                    <h5>Raised</h5>
                </div>

            </div>

            <div id="impact-purpose">
                <h4>
                    Every year LifeCycle Cycling Club brings together the cycling and broader community for
                    a criterium race event to:
                </h4>
                    <ul>
                        <li>raise awareness of the endemic and devasting impacts of domestic violence currently
                            occurring in Australian local communities
                        </li>
                        <li>
                            fundraise for organisations on the front line supporting victims and families of
                            domestic violence
                        </li>
                        <li>
                            empower women in learning how to cycle and race
                        </li>
                    </ul>

        
            
            </div>
            
            <h3 id="charity-title">Charity Partners</h3>

            <div id="charity-partners">
                <a href="https://www.whiteribbon.org.au/" ><img src="../assets/white_ribbon.jpg"></img></a>
                <a href="https://www.beyonddv.org.au/"><img src="../assets/bdv.png"></img></a>
                <a href="https://bdvs.org.au/"><img src="../assets/bdvslogo.png"></img></a>
                <a href="https://www.smallsteps4hannah.com.au/"><img src="../assets/f4h.png"></img></a>
            </div>
            
            <div class="donations-container">

                <div class="donations">
                    
                    {recentDonations.map((donationData, key) => {
                    return <DonationCard key={key} donationData={donationData} />
                    })}
                  

                </div>
            </div>

            <h3 id="charity-title">Charity Partners</h3>



{/*        
            <div id="rider-list">
                <DonationPage />
            </div> */}

        </div>
    );
}
export default HomePage;
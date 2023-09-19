import useRiders from "../hooks/use-riders";
import RiderCard from "../components/RiderCard";
import useDonations from "../hooks/use-donations";
import DonationCard from "../components/DonationCard";
import DonationPage from "./DonationPage";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/use_authentication";

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
            <h1>Racing to break the cycle of domestic violence</h1>

            <div id="fundraising-target">
                <h1>$200,000</h1>
                <h5>Target</h5>
            </div>

            <div id="amount-raised">
                <h1>${donationSum}</h1>
                <h5>Raised</h5>
            </div>

            <button onClick={handleClick}>Donate Now</button>
       
            <div id="recent-donations">
                {recentDonations.map((donationData, key) => {
                    return <DonationCard key={key} donationData={donationData} />
                })}
            </div>
             
            <div id="rider-list">
                <DonationPage />
                
                {/* {riders.map((riderData, key) => {
                return <RiderCard key={key} riderData={riderData} />;
                 })} */}
            </div>

        </div>
    );
}
export default HomePage;
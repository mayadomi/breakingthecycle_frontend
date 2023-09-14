import useRiders from "../hooks/use-riders";
import RiderCard from "../components/RiderCard";

import "./HomePage.css";
import useDonations from "../hooks/use-donations";
import DonationCard from "../components/DonationCard";

function HomePage() {
    const { riders, isLoading } = useRiders();
    const { donations, isDonationLoading } = useDonations();
    const donationSum = donations.reduce((current, donation) => current + donation.amount, 0);

    const recentDonations = donations.slice(-5)

    // console.log(recentDonations)

    
    if (isLoading){
        return<div>I'm still loading</div>
    }

    if (isDonationLoading){
        return<div>Donations incoming</div>
    }

    return (
        <div>
        <h1>Racing to break the cycle of domestic violence</h1>
        <div id="fundraising-target">
        <h1>$200,000</h1>
        <h5>Target</h5>
        </div>
        <div id="amount-raised">
        <div><h1>${donationSum}</h1></div>
        <h5>Raised</h5>
        </div>
        <div id="recent-donations">

        {recentDonations.map((donationData, key) => {
            return <DonationCard key={key} donationData={donationData} />
        })}
        </div>
        <div id="rider-list">
                {riders.map((riderData, key) => {
                return <RiderCard key={key} riderData={riderData} />;
                // return <div key={key}>{projectData.title}</div>;
            })}
        
        </div>
        </div>
    );
}
export default HomePage;
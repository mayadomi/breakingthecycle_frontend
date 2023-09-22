import { useState, setState, useEffect } from 'react';

import useRiders from '../hooks/use-riders'
import RiderCard from '../components/RiderCard'
import "../components/DonationPage.css"


function DonationPage() {

   const { riders, isRidersLoading, isRidersError } = useRiders(); 

   const [searchTerm, setSearchTerm] = useState("")

   if (isRidersLoading){
        return<div>Riders loading...</div>
    }

    if (isRidersError){
        return<div>{isRidersError.message}</div>
    }

    const handleChange = e => setSearchTerm(e.target.value)

    return (
    <>
        {/* <div className='search-title'>Rider Leaderboard</div> */}
        <div className='board-container'>
        <input className='search-box'
            type='text' 
            value={searchTerm} 
            onChange={handleChange} 
            placeholder='Find a rider'>
        </input>
        
        {/* <p>search Term:{searchTerm}</p> */}

        <div className='leader-board'>
            {riders.sort((a,b) => {
             return b.amount_donated - a.amount_donated 
            }).filter(o => o.rider_first_name.includes(searchTerm)).map((rider, key) => {
                return <RiderCard key={key} riderData={rider}/>
            })}
        </div>
        </div>
        
    </>
    // <div><DonationForm /><div>   
    )

}

export default DonationPage
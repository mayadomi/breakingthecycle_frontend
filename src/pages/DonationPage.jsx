import { useState, setState, useEffect } from 'react';

import useRiders from '../hooks/use-riders'
import RiderCard from '../components/RiderCard'

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
    <div>
        <div>Search for a rider</div>

        <input 
            type='text' 
            value={searchTerm} 
            onChange={handleChange} 
            placeholder='search'>
        </input>
        
        {/* <p>search Term:{searchTerm}</p> */}

        <div>
            {riders.sort((a,b) => {
             return b.amount_donated - a.amount_donated 
            }).filter(o => o.rider_first_name.includes(searchTerm)).map((rider, key) => {
                return <RiderCard key={key} riderData={rider}/>
            })}
        </div>
        
    </div>
    // <div><DonationForm /><div>   
    )

}

export default DonationPage
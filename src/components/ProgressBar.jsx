import React from 'react';
// import getDonations from '../../api/get-donations';
// https://dev.to/ramonak/react-how-to-create-a-custom-progress-bar-component-in-5-minutes-2lcl

import './ProgressBar.css'

const ProgressBar = (props) => {
    const {completed, toComplete} = props;

    let progress = 0
    
    if (completed == null) {
      progress = 0
    } else {
      progress = Math.round((completed / toComplete)*100)
    }
        

    
    return (
            <div className='fillerStyles' style={{width:progress}}>
                <span className='labelStyles'>{`${progress}%`}</span>
            </div>
    );
};

export default ProgressBar;

//     useEffect(() => {
//         getDonations()
//         .then((donation) => {
//             setDonations(donation);
//             setIsLoading(false);
//         })
//         .catch((error) => {
//             setError(error);
//             setIsLoading(false);
//         });
//     }, []);

//     return { donations, isLoading, error };
// }
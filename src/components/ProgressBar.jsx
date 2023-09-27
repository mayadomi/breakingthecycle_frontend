import React from 'react';
// import getDonations from '../../api/get-donations';
// https://dev.to/ramonak/react-how-to-create-a-custom-progress-bar-component-in-5-minutes-2lcl

import './ProgressBar.css'

const ProgressBar = (props) => {
    const {completed, toComplete} = props;

    let progress = 0
    let progressText = ''
    
    if (completed == null) {
      progress = 0
      progressText = "0kms ridden of " + toComplete

    } else if (completed == toComplete) {
      if (window.innerWidth < 650){
        progress= 260
        progressText= completed + "kms ridden of " + toComplete
      } else {
        progress= 375
        progressText= completed + "kms ridden of " + toComplete
      }


    } else if ( completed > toComplete) {

      if (window.innerWidth < 650 ) {
        progress= 260
        progressText = completed + "kms ridden of " + toComplete
      } else {
        progress= 375
        progressText = completed + "kms ridden of " + toComplete
      }


    } else {
      progress = Math.round((completed / toComplete)*100)

      progressText = completed + "kms ridden of " + toComplete
    }

    return (
            <div className='fillerStyles' style={{width:progress}}>
                <div className='labelStyles'>{`${progressText}kms to ride`}</div>
            </div>
    );
};

export default ProgressBar;

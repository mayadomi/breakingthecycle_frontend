import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import postDonation from '../../api/post-donation'
import { useParams } from 'react-router-dom'


function Donate() {

  const navigate = useNavigate()
  const rider_id = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const authToken = window.localStorage.getItem("token")

  const [donationData, setDonationData] = useState({
    rider: rider_id.id,
    amount: 0,
    comment: '',
    anonymous: false
  })

  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (event) => {
    const {id, value} = event.target
    setDonationData((prevDetails) => ({
        ...prevDetails,
        [id]: value,
    }))
  }

  const handleChecked = (event) => {
    setDonationData({
      ...donationData,
      [event.target.id]: event.target.checked
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    setIsLoading(true)
    
    if (authToken){
        postDonation(
            donationData.rider,
            donationData.amount,
            donationData.comment,
            donationData.anonymous
        )
          .then((response) => {
            navigate(`/`)
          })
          .catch((error) => {
            setErrorMessage(`${[error.message]}`)
            setIsLoading(false)
          })
      } else {
        setErrorMessage(`Must be logged in to donate`)
        setIsLoading(false)
      }
    }

  if(isLoading) {
    return <p>Loading...</p>
  }

//   const handleDonationAmount =(e) => {
//     setDonationAmount(e.target.value)
//   }


  return (
    <form onSubmit={handleSubmit}>
{/* 
      <button onClick={handleDonationAmount} value='5'>5</button>
      <button onClick={handleDonationAmount} value='10'>10</button>
      <button onClick={handleDonationAmount} value='20'>20</button>
      <button onClick={handleDonationAmount} value='50'>50</button>
      <button onClick={handleDonationAmount} value='100'>100</button> */}

      <div>
        <label htmlFor="amount">Amount</label>
        <input 
          type="number" 
          id="amount" 
          placeholder='Enter custom amount' 
          onChange={handleChange} 

        />
      </div>
      <div>
        <label htmlFor="comment">Comment</label>
        <input 
          type="text" 
          id="comment" 
          placeholder='Enter a comment' 
          onChange={handleChange} 
        />
      </div>
      <div>
        <label htmlFor='anonymous'>Anonymous Donation</label>
        <input
          type='checkbox'
          id='anonymous'
          onChange={handleChecked}
        />
      </div>
      <input type="submit" value="Donate" />
      <div>
            <p>{errorMessage}</p>
            <sub className={errorMessage ? "" : "hidden"}></sub>
            
        </div>
    </form>
  )
}

export default Donate
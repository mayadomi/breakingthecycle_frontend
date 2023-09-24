import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import useDeleteDonation from '../hooks/use-delete-donation';
import { useParams } from 'react-router-dom'
import useAuth from '../hooks/use_authentication';
import './DeleteDonationForm.css'


function DeleteDonation(props) {
  

  const navigate = useNavigate()
  const donation_id = props
  const [isLoading, setIsLoading] = useState(false)
  const {auth, setAuth } = useAuth()
  const [errorMessage, setErrorMessage] = useState("")
  const [formInvalid, setFormInvalid] = useState("")
 

  const handleChange = (event) => {
    if (auth.token) {
      const {id, value} = event.target
      setDonationData((prevDetails) => ({
          ...prevDetails,
          [id]: value,
      }))

    } else {
      setFormInvalid("You must be logged in as a user in order to donate")
    }
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
    
    if (auth.token){
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

  return (
    <form onSubmit={handleSubmit}>
{/*  Wanted to do fancy buttons, but time.....
      <button onClick={handleDonationAmount} value='5'>5</button>
      <button onClick={handleDonationAmount} value='10'>10</button>
      <button onClick={handleDonationAmount} value='20'>20</button>
      <button onClick={handleDonationAmount} value='50'>50</button>
      <button onClick={handleDonationAmount} value='100'>100</button> */}

      <div className='form-donation'>
        <label htmlFor="amount">Amount</label>
        <input 
          type="number" 
          id="amount" 
          placeholder={rate}
          onChange={handleChange} 

        />
      </div>
      <div className='form-donation'>
        <label htmlFor="comment">Comment</label>
        <input 
          type="text" 
          id="comment" 
          placeholder='Enter a comment' 
          onChange={handleChange} 
        />
      </div>
      <div className='form-donation-special'>
        <label htmlFor='anonymous'>Anonymous?</label>
        <input
          type='checkbox'
          id='anonymous'
          onChange={handleChecked}
        />
      </div>

      <div className='form-donation'>
      <input type="submit" value="Donate" id='submit' />
      <div>
            <p>{errorMessage}</p>
            <sub className={errorMessage ? "" : "hidden"}><p>{formInvalid}</p></sub>
            
        </div>
        </div>
    </form>

    
  )
}

export default Donate
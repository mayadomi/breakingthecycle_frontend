import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
// import useUpdateRiderKms from '../hooks/use-update-rider-kms';
import { useParams } from 'react-router-dom'
import useAuth from '../hooks/use_authentication';
import postUpdateRiderKms from '../../api/post-update-rider-kms';
//import './DonationForm.css'


function RiderUpdateKms(rider) {
  console.log("in update wrp", rider.rider_id)
  const riderid = rider.rider_id
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const {auth, setAuth } = useAuth()
  const [errorMessage, setErrorMessage] = useState("")
  const [formInvalid, setFormInvalid] = useState("")
 

  const [updateData, setUpdateData] = useState({
    id: riderid,
    description: '',
    image: '',
    kms_ridden: 0,
  })

console.log(updateData)
  const handleChange = (event) => {
    if (auth.token) {
      const {id, value} = event.target
      setUpdateData((prevDetails) => ({
          ...prevDetails,
          [id]: value,
      }))

    } else {
      setFormInvalid("You must be logged in as a user in order to donate")
    }
  }

  // const handleChecked = (event) => {
  //   setUpdateData({
  //     ...updateData,
  //     [event.target.id]: event.target.checked
  //   })
  // }

  const handleSubmit = (event) => {
    event.preventDefault()

    setIsLoading(true)
    
    if (auth.token){
        postUpdateRiderKms(
            riderid,
            updateData.description,
            updateData.image,
            updateData.kms_ridden
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
    <div>
    <form onSubmit={handleSubmit}>
      
      <div className='form-donation'>
        <label htmlFor="description">Description</label>
        <input 
          type="text" 
          id="description" 
          placeholder="Tell us about your ride!"
          onChange={handleChange} 

        />
      </div>
      <div className='form-donation'>
        <label htmlFor="image">Image</label>
        <input 
          type="text" 
          id="image" 
          placeholder='Enter an image url' 
          onChange={handleChange} 
        />
      </div>
      <div className='form-donation'>
        <label htmlFor='kms_ridden'>Kms ridden?</label>
        <input
          type='number'
          id='kms_ridden'
          onChange={handleChange}
        />
      </div>

      <div className='form-donation'>
      <input type="submit" value="Update" id='submit' />
      <div>
            <p>{errorMessage}</p>
            <sub className={errorMessage ? "" : "hidden"}><p>{formInvalid}</p></sub>
            
        </div>
        </div>
    </form>
    </div>
    
  )
}

export default RiderUpdateKms
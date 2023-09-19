async function postDonation(rider, amount, comment, anonymous){
    const url = `${import.meta.env.VITE_API_URL}/donations/`;

    console.log(rider)
    
    const token = localStorage.getItem("token")

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({
            "rider": rider,
            "amount": amount,
            "comment": comment,
            "anonymous": anonymous
        })
    })

    if (!response.ok) {
        const fallbackError = `Error trying to process donation`

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        })
        
        // console.log(data)
        const errorMessage = data?.detail ?? fallbackError
        throw new Error(errorMessage)
    }


    return await response.json()

}


export default postDonation
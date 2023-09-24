import useAuth from "../src/hooks/use_authentication";

async function deleteDonation(id){
    
    const {auth, setAuth} = useAuth()
    const url = `${import.meta.env.VITE_API_URL}/donation/${id}/`;
    
    const token = auth.token

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + token
        },
    })

    if (!response.ok) {
        const fallbackError = `Error trying to delete donation`

        const data = await response.json().catch(() => {
            throw new Error(fallbackError)
        })

        const errorMessage = data?.detail ?? fallbackError
        throw new Error(errorMessage)
    }
    return await response.json()

}


export default deleteDonation
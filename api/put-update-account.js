import useAuth from "../src/hooks/use_authentication";
async function putUpdateAccount(id, first_name, last_name, email, is_active){
    
    const url = `${import.meta.env.VITE_API_URL}/user/${id}/`;
    const {auth, setAuth} = useAuth()
    const token = auth.token

    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "is_active": is_active
        })
    })

    if (!response.ok) {
        const fallbackError = `Error trying to update user account`

        const data = await response.json().catch(() => {
            throw new Error(fallbackError)
        })

        const errorMessage = data?.detail ?? fallbackError
        throw new Error(errorMessage)
    }
    return await response.json()

}


export default putUpdateAccount
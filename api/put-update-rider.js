import useAuth from "../src/hooks/use_authentication";
async function putUpdateRider(id, team, bio, rate, kms_ceiling){
    const url = `${import.meta.env.VITE_API_URL}/rider/${id}`;
    //const {auth, setAuth} = useAuth()
    const token = window.localStorage.getItem("token")

    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({
            "team": team,
            "bio": bio,
            "rate": rate,
            "kms_ceiling": kms_ceiling
        })
    })

    if (!response.ok) {
        const fallbackError = `Error trying to create user account`

        const data = await response.json().catch(() => {
            throw new Error(fallbackError)
        })

        const errorMessage = data?.detail ?? fallbackError
        throw new Error(errorMessage)
    }
    return await response.json()

}


export default putUpdateRider
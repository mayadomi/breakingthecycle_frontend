import useAuth from "../src/hooks/use_authentication";
async function postUpdateRiderKms(id, description, image, kms_ridden){

    const url = `${import.meta.env.VITE_API_URL}/rider/${id}/updates/`;

    console.log(id)
    console.log(url)
    //const {auth, setAuth} = useAuth()

    // token should be of user owning rider page/object
    const token = window.localStorage.getItem("token")

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({
            "description": description,
            "image": image,
            "kms_ridden": kms_ridden
        })
    })

    if (!response.ok) {
        console.log(response.json())
        const fallbackError = `Error trying to create user account`

        const data = await response.json().catch(() => {
            throw new Error(fallbackError)
        })

        const errorMessage = data?.detail ?? fallbackError
        throw new Error(errorMessage)
    }
    return await response.json()

}


export default postUpdateRiderKms
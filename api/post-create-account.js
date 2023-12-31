 async function postCreateAccount(username, first_name, last_name, email, password){
    const url = `${import.meta.env.VITE_API_URL}/user/create/`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "username": username,
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "password":password,
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

export default postCreateAccount
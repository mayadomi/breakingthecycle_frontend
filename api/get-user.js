async function getUser(id){
    console.log(id)
    const url = `${import.meta.env.VITE_API_URL}/user/${id}`

    const token = localStorage.getItem("token")

    const response = await fetch(url, { 
        method: "GET",
        headers: 
            {
                "Content-Type": "application/json",
                "Authorization": "Token " + token
            },
    });
    console.log(response)
    if (!response.ok) {
        const fallbackError = "Error fetching user account";


        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage)
    }
return await response.json();
}

export default getUser
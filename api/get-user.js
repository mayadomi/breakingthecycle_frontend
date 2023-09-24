import useAuth from "../src/hooks/use_authentication";

async function getUser(id){
    
    const url = `${import.meta.env.VITE_API_URL}/user/${id}`

    const {auth, setAuth} = useAuth()
    const token = auth.token

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
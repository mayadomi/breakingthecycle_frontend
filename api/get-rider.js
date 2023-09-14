async function getRider(id) {
    const url = `${import.meta.env.VITE_API_URL}/rider/${id}`
    console.log(url)

    const response = await fetch(url, { method: "GET"});
    console.log(response)
    if (!response.ok) {
        const fallbackError = "Error fetching rider";
    

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage)
    }
return await response.json();
}

export default getRider;
async function getDonations() {
    const url = `${import.meta.env.VITE_API_URL}/donations/`
    console.log(url)

    const response = await fetch(url, { method: "GET"});
    console.log(response)
    if (!response.ok) {
        const fallbackError = "Error fetching donations";
    

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage)
    }
return await response.json();
}

export default getDonations;
import React, { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../src/components/AuthenticationProvider";
AuthContext


async function getUser(id){
       
    const url = `${import.meta.env.VITE_API_URL}/user/${id}`
    
    // This surely should be a context/state thing, but could not get it to work
    const token = window.localStorage.getItem("token")

    const response = await fetch(url, { 
        method: "GET",
        headers: 
            {
                "Content-Type": "application/json",
                "Authorization": "Token " + token
            },
    });
    
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
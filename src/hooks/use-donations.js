import { useState, useEffect } from 'react';
import getDonations from '../../api/get-donations';

export default function useDonations() {
    const [donations, setDonations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        getDonations()
        .then((donation) => {
            setDonations(donation);
            setIsLoading(false);
        })
        .catch((error) => {
            setError(error);
            setIsLoading(false);
        });
    }, []);

    return { donations, isLoading, error };
}
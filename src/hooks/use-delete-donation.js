import { useState, useEffect } from 'react';
import deleteDonation from '../../api/delete-donation';

export default function useDeleteDonation() {
    const [deletion, setDeletion] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        getDeleteDonation(id)
        .then((deletion) => {
            setDeletion(true)
            setIsLoading(false);
        })
        .catch((error) => {
            setError(error);
            setIsLoading(false);
        });
    }, []);

    return { deletion, isLoading, error };
}
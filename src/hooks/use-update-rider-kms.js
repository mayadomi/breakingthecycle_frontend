import { useState, useEffect } from 'react';
import postUpdateRiderKms from '../../api/post-update-rider-kms';

export default function useUpdateRiderKms() {
    const [updates, setUpdates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        postUpdateRiderKms()
        .then((updates) => {
            setUpdates(updates);
            setIsLoading(false);
        })
        .catch((error) => {
            setError(error);
            setIsLoading(false);
        });
    }, []);

    return { updates, isLoading, error };
}
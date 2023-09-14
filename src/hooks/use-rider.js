import { useState, useEffect } from 'react';
import getRider from '../../api/get-rider';

export default function useRider(id) {
    const [rider, setRider] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        getRider(id)
        .then((rider) => {
            setRider(rider);
            setIsLoading(false);
        })
        .catch((error) => {
            setError(error);
            setIsLoading(false);
        });
    }, [id]);

    return { rider, isLoading, error };
}
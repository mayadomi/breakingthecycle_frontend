import { useState, useEffect } from 'react';
import getRiders from '../../api/get-riders';

export default function useRiders() {
    const [riders, setRiders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        getRiders()
        .then((riders) => {
            setRiders(riders);
            setIsLoading(false);
        })
        .catch((error) => {
            setError(error);
            setIsLoading(false);
        });
    }, []);

    return { riders, isLoading, error };
}

import deleteDonation from '../../api/delete-donation';

export default function useDeleteDonation(donation_id) {
    const [deleted, setDeletion] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        deleteDonation(donation_id)
        .then(() => {
            setDeletion(true)
            setIsLoading(false);
        })
        .catch((error) => {
            setError(error);
            setIsLoading(false);
        });
    }, []);

    return { deleted, isLoading, error };
}
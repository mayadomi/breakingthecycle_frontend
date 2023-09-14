import React from 'react';
// import getDonations from '../../api/get-donations';
// https://dev.to/ramonak/react-how-to-create-a-custom-progress-bar-component-in-5-minutes-2lcl

const ProgressBar = (props) => {
    const {bgcolor, completed} = props;
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState();
    
    const containerStyles = {
        height: 20,
        width: '100%',
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        margin: 50
      }
    
      const fillerStyles = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: bgcolor,
        borderRadius: 'inherit',
        textAlign: 'right'
      }
    
      const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
      }
    
    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
                <span style={labelStyles}>{`${completed}%`}</span>
            </div>
        </div>
    );
};

export default ProgressBar;

//     useEffect(() => {
//         getDonations()
//         .then((donation) => {
//             setDonations(donation);
//             setIsLoading(false);
//         })
//         .catch((error) => {
//             setError(error);
//             setIsLoading(false);
//         });
//     }, []);

//     return { donations, isLoading, error };
// }
import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';
import { useState, useEffect } from 'react';

axios.defaults.baseURL = "http://localhost:5000/plaid";

export default function LinkFlow({ user_id }) {
    const [ linkToken, setLinkToken ] = useState(null);
    const [ publicToken, setPublicToken ] = useState(null);


    useEffect(() => {
        async function fetch() {
            const response = await axios.post("/link_token", { user_id: user_id });
            const linkToken = response.data.link_token
            setLinkToken(linkToken)
            
        }
        fetch();
    });

    const { open, ready } = usePlaidLink({
        token: linkToken,
        onSuccess: async (public_token, metadata) => {
            setPublicToken(publicToken);
            // send public_token to server
            const response = await axios.post("/access_token", { public_token: publicToken });
            
        },
    });



}


return (
    <button onClick={() => open()} disabled={!ready}>
        Connect a bank account
    </button>
);
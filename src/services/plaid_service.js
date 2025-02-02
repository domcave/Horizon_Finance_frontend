import { usePlaidLink } from "react-plaid-link";
import axios from "axios";
import { useState, useEffect } from "react";

axios.defaults.baseURL = "http://127.0.0.1:5000/plaid";

export default function ConnectBank({ user_id }) {
  const [linkToken, setLinkToken] = useState(null);
  const [publicToken, setPublicToken] = useState(null);

  useEffect(() => {
    async function fetch() {
      console.log("Sending user_id:", user_id);
      const response = await axios.post(
        "/link_token",
        { user_id: user_id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const linkToken = response.data.link_token;
      setLinkToken(linkToken);
    }
    fetch();
  }, [user_id]);

  const { open, ready } = usePlaidLink(
    linkToken
      ? {
          token: linkToken,
          onSuccess: async (public_token, metadata) => {
            setPublicToken(public_token);
            try {
              console.log(publicToken);
              const response = await axios.post(
                "/access_token",
                { public_token: public_token },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              console.log(response.data);
            } catch (error) {
              console.error("Error exchanging public token:", error);
            }
          },
          onExit: (error, metadata) => {
            console.log("Exited link before establishing connection");
          },
        }
      : {} // Prevent errors if linkToken is null
  );

  return (
    <button onClick={() => open()} disabled={!ready}>
      Connect a bank account
    </button>
  );
}

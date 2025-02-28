import { usePlaidLink } from "react-plaid-link";
import axios from "axios";
import { useState, useEffect } from "react";
import "../css/ConnectBank.css";
import { BACKEND_BASE_URL } from "../environment";

axios.defaults.baseURL = BACKEND_BASE_URL;

export function ConnectBank({ user_id, onSuccess }) {
  const [linkToken, setLinkToken] = useState(null);
  const [publicToken, setPublicToken] = useState(null);
  const [isConnected, setIsConnected] = useState(false); 

  useEffect(() => {
    async function fetch() {
      console.log("Sending user_id:", user_id);
      const response = await axios.post(
        "/plaid/link_token",
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
                "/plaid/access_token",
                {
                  public_token: public_token,
                  username: user_id,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              console.log(response.data);
              setIsConnected(true); // Set to true once the bank account is connected
              onSuccess();
            } catch (error) {
              console.error("Error exchanging public token:", error);
            }
          },
          onExit: (error, metadata) => {
            console.log("Exited link before establishing connection");
          },
        }
      : {}
  );

  return (
    <button
      onClick={() => open()}
      disabled={!ready || isConnected} // Disable button after success
      className={isConnected ? "disabled-button" : ""} // Add disabled styling
    >
      {isConnected ? "Bank Account Connected" : "Connect a bank account"}
    </button>
  );
}

export async function getTransactions30Days(username) {
  const response = await axios.get(`/plaid/transactions/30days`, {
    params: { username },
  });
  console.log(response);
  return response;
}

export async function getTransactionsThisMonth(username) {
  const response = await axios.get(`/plaid/transactions/month`, {
    params: { username },
  });
  console.log(response);
  return response;
}

export async function getInvestmentHoldings(username) {
  const response = await axios.get(`/plaid/investments/holdings`, {
    params: { username },
  });
  console.log(response);
  return response;
}

export async function getAccountBalances(username) {
  const response = await axios.get(`/plaid/accounts/balance`, {
    params: { username },
  });
  console.log(response);
  return response;
}

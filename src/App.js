import './App.css';
import React, { useEffect, useState } from 'react';
import { fetchTransactions } from './api';

function App() {
  const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getTransactions = async () => {
            try {
                const data = await fetchTransactions();
                console.log('Fetched transactions:', data); // Log fetched data
                setTransactions(data); // Update state with fetched data
            } catch (err) {
                console.error('Error fetching transactions:', err); // Log any errors
                setError(err.message); // Set an error message
            }
        };

        getTransactions();
    }, []);

    return (
        <div>
            <h1>Transactions</h1>
            {error ? (
                <p style={{ color: 'red' }}>Error: {error}</p>
            ) : (
                <ul>
                    {transactions.map((transaction) => (
                        <li key={transaction.id}>
                            <strong>{transaction.type}</strong> - {transaction.category} - ${transaction.amount} <br />
                            <em>{transaction.description}</em>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default App;

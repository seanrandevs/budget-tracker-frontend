import React, { useEffect, useState } from 'react';
import { fetchTransactions } from './api';

const Transactions = () => {

    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getTransactions = async () => {
            try {
                const data = await fetchTransactions();
                console.log('Fetched transactions:', data);
                setTransactions(data); 
            } catch (err) {
                console.error('Error fetching transactions:', err);
                setError(err.message);
            }
        };

        getTransactions();
    }, []);

  return (
    <div className="transactions">
            <h4>Transactions</h4>
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
  )
}

export default Transactions
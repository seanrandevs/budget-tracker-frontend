import './App.css';
import React, { useEffect, useState } from 'react';
import { getTransactions } from './apiService';
import Transactions from './Transactions';
import AddTransactions from './AddTransactions'

function App() {

    const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  // Function to refresh transactions by re-fetching them
  const refreshTransactions = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error('Error refreshing transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);


    return (
        <div>
            <div className="left-side">
                <AddTransactions onTransactionAdded={fetchTransactions} />
                <Transactions transactions={transactions} refreshTransactions={refreshTransactions} />
            </div>
        </div>
    );
};

export default App;

import './App.css';
import React, { useEffect, useState } from 'react';
import { getTransactions } from './apiService';
import Transactions from './Transactions';
import AddTransactions from './AddTransactions'
import Charts from './Charts';
import CategoryTotalsChart from './CategoryTotalsChart';

function App() {

    const [transactions, setTransactions] = useState([]);
    const [typeFilter, setTypeFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");

    // Filter transactions based on the selected type and category
    const typeFilterMap = {
      income: (transaction) => transaction.type.toLowerCase() === "income",
      expense: (transaction) => transaction.type.toLowerCase() === "expense",
      all: () => true,
    };
    
    const categoryFilterMap = {
      salary: (transaction) => transaction.category.toLowerCase() === "salary",
      bills: (transaction) => transaction.category.toLowerCase() === "bills",
      food: (transaction) => transaction.category.toLowerCase() === "food",
      entertainment: (transaction) => transaction.category.toLowerCase() === "entertainment",
      groceries: (transaction) => transaction.category.toLowerCase() === "groceries",
      all: () => true,
    };
    
    const filteredTransactions = transactions.filter(
      (transaction) =>
        typeFilterMap[typeFilter](transaction) &&
        categoryFilterMap[categoryFilter](transaction)
    );
  // Fetch Transactions 
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
        <div className="budget-tracker">
            <div className="left-side">
                <AddTransactions onTransactionAdded={fetchTransactions} />
                <h4>Transactions</h4>
                <div className="filters">
                  <label>
                    Type:
                    <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                      <option value="all">All</option>
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>
                  </label>
                  <label>
                    Category:
                    <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                      <option value="all">All</option>
                      <option value="salary">Salary</option>
                      <option value="bills">Bills</option>
                      <option value="food">Food</option>
                      <option value="entertainment">Entertainment</option>
                      <option value="groceries">Groceries</option>
                    </select>
                  </label>
                </div>
                <Transactions transactions={filteredTransactions} refreshTransactions={refreshTransactions} />
            </div>
            <div className="right-side">
               <Charts transactions={transactions} />
               <CategoryTotalsChart transactions={transactions} />
            </div>
        </div>
    );
};

export default App;

import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const Charts = ({ transactions }) => {
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Function to calculate averages
  const calculateAverages = () => {
    const categoryTotals = {};
    const categoryCounts = {};

    filteredTransactions.forEach((transaction) => {
      const { category, amount } = transaction;
      if (!categoryTotals[category]) {
        categoryTotals[category] = 0;
        categoryCounts[category] = 0;
      }
      categoryTotals[category] += parseFloat(amount);
      categoryCounts[category] += 1;
    });

    return Object.keys(categoryTotals).map((category) => ({
      category,
      average: categoryTotals[category] / categoryCounts[category],
    }));
  };

  // Update filtered transactions when filters change
  useEffect(() => {
    const filtered = transactions.filter((transaction) => {
      const typeMatch =
        typeFilter === "all" || transaction.type.toLowerCase() === typeFilter;
      const categoryMatch =
        categoryFilter === "all" ||
        transaction.category.toLowerCase() === categoryFilter;

      return typeMatch && categoryMatch;
    });
    setFilteredTransactions(filtered);
  }, [typeFilter, categoryFilter, transactions]);

  // Prepare data for the chart
  const averages = calculateAverages();
  const chartData =  {
    labels: averages.map((item) => item.category),
    datasets: [
      {
        label: "Average Spending",
        data: averages.map((item) => item.average),
        backgroundColor: "rgba(255, 192, 192, 0.6)",
        borderColor: "rgba(255, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <h3>Average Spending Per Category</h3>
      <div className="chart-filters">
        <label>
          Filter by Type:
          <select onChange={(e) => setTypeFilter(e.target.value)} value={typeFilter}>
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>
        <label>
          Filter by Category:
          <select onChange={(e) => setCategoryFilter(e.target.value)} value={categoryFilter}>
            <option value="all">All</option>
            <option value="salary">Salary</option>
            <option value="bills">Bills</option>
            <option value="food">Food</option>
            <option value="entertainment">Entertainment</option>
            <option value="groceries">Groceries</option>
          </select>
        </label>
      </div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Charts;

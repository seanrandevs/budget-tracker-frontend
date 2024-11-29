import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CategoryTotalsChart = ({ transactions }) => {
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Function to calculate totals
  const calculateTotals = () => {
    const categoryTotals = {};

    filteredTransactions.forEach((transaction) => {
      const { category, amount } = transaction;
      if (!categoryTotals[category]) {
        categoryTotals[category] = 0;
      }
      categoryTotals[category] += parseFloat(amount);
    });

    return Object.keys(categoryTotals).map((category) => ({
      category,
      total: categoryTotals[category],
    }));
  };

  // Update filtered transactions when the type or category filter changes
  useEffect(() => {
    const filtered = transactions.filter((transaction) => {
      const typeMatch =
        typeFilter === "all" || transaction.type === typeFilter;
      const categoryMatch =
        categoryFilter === "all" || transaction.category === categoryFilter;
      return typeMatch && categoryMatch;
    });
    setFilteredTransactions(filtered);
  }, [typeFilter, categoryFilter, transactions]);

  // Prepare data for the chart
  const totals = calculateTotals();
  const chartData = {
    labels: totals.map((item) => item.category),
    datasets: [
      {
        label: "Total Spending",
        data: totals.map((item) => item.total),
        backgroundColor: "rgba(76, 192, 192, 0.9)",
        borderColor: "rgba(76, 192, 192, 5)",
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

  // Get unique categories for the dropdown
  const uniqueCategories = [
    ...new Set(transactions.map((transaction) => transaction.category)),
  ];

  return (
    <div className="chart-container">
      <h3>Total Spending Per Category</h3>
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
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default CategoryTotalsChart;

import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Get all transactions
export const getTransactions = async () => {
  const response = await axios.get(`${API_URL}/transactions`);
  return response.data;
};

// Add a transaction
export const createTransaction = async (transaction) => {
  const response = await axios.post(`${API_URL}/transactions`, transaction);
  return response.data;
};

// Update an transaction
// export const updateTransactions = async (id, updatedtransaction) => {
//   const response = await axios.put(`${API_URL}/transactions/${id}`, updatedtransaction);
//   return response.data;
// };

// Delete an transaction
export const deleteTransactions = async (id) => {
  await axios.delete(`${API_URL}/transactions/${id}`);
};
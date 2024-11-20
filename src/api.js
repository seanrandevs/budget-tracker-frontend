import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5174/api/',
    headers: {
        'X-Api-Key': '12345-ABCDE-67890-FGHIJ',
    },
});

export const fetchTransactions = async () => {
    const response = await api.get('transactions');
    return response.data;
};
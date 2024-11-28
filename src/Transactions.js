import { RxCross2 } from "react-icons/rx";
import { deleteTransactions } from "./apiService";

const Transactions = ({ transactions, refreshTransactions }) => {
  return (
    <div className="transactions">
  <h4>Transactions</h4>
  <table>
    <thead>
      <tr>
        <th>Type</th>
        <th>Category</th>
        <th>Amount</th>
        <th>Date</th>
        <th>Description</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {transactions.map((transaction) => (
        <tr key={transaction.id}>
          <td>{transaction.type}</td>
          <td>{transaction.category}</td>
          <td>{transaction.amount}</td>
          <td>{transaction.date}</td>
          <td>{transaction.description}</td>
          <td>
            <RxCross2 onClick={async () => {
                  try {
                    await deleteTransactions(transaction.id);
                    refreshTransactions(); // Call to refresh the data after deletion
                  } catch (error) {
                    console.error('Error deleting transaction:', error);
                  }
                }} />
                </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  );
};

export default Transactions;


const Transactions = ({ transactions }) => {

  return (
    <div className="transactions">
      <h4>Transactions</h4>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>{transaction.category} ${transaction.amount} {transaction.date} {transaction.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default Transactions
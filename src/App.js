import './App.css';
import Transactions from './Transactions';
import AddTransactions from './AddTransactions'

function App() {


    return (
        <div>
            <div className="left-side">
                <AddTransactions />
                <Transactions />
            </div>
        </div>
    );
};

export default App;

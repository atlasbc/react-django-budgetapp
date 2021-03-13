import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TransactionTable from './TransactionTable';
import TransactionForm from './TransactionForm';

const useStyles = makeStyles((theme) => ({
    header: {
        textAlign: "center",
    },
  }));

export default function Transactions() {
    const [transactionData, setTransactionData] = useState([])

    const classes = useStyles();

    return (
        <>
            <div>
                <h2 className={classes.header}>Add New Transaction</h2>
                <TransactionForm transactionData = {transactionData} setTransactionData = {setTransactionData} />
            </div>
            <h2 className={classes.header}>Your Transaction Data</h2>
            <TransactionTable transactionData = {transactionData} setTransactionData = {setTransactionData}  />
        </>
    )
}
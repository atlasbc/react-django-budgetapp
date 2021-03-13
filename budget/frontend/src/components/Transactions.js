import React, {useState} from 'react'
import { Button, TextField, Select, MenuItem } from '@material-ui/core';
import Cookies from 'js-cookie';
import { makeStyles } from '@material-ui/core/styles';
import DecimalFormat from '../utils/DecimalFormat';
import TransactionTable from './TransactionTable';

const useStyles = makeStyles((theme) => ({
    form: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      [theme.breakpoints.up('sm')]: {
        flexDirection: "row",
      },
    },
    formItem: {
        width: "100%",
        [theme.breakpoints.up('md')]: {
            width: "10rem",
          },
    },
    submitButton: {
        width: "10rem",
        alignSelf: "center",
        marginTop: "0.5rem",
        [theme.breakpoints.up('sm')]: {
            width:"8rem", 
            borderTopLeftRadius:"0", 
            borderBottomLeftRadius:"0",
            alignSelf: "stretch",
            margin: "0"
          },        
    },
    header: {
        textAlign: "center",
    },
    columnSeparator: {
        opacity: 0,
    }
  }));

export default function Transactions() {
    const [transactionData, setTransactionData] = useState([])
    const [category, setCategory] = useState("")
    const [money, setMoney] = useState("")

    const csrftoken = Cookies.get('csrftoken');
    const classes = useStyles();

    function handleSubmit(e){
        e.preventDefault();
        console.log(`money in submit is ${money}`);
        // Create new data
        const new_data = {
            name: e.target[0].value,
            amount: parseFloat(money),
            category: e.target[2].value,
        }
        
        console.log(`amount value to be sent to backend ${new_data["amount"]}`);
        
        // set spending text to zero after submitting
        e.target[0].value = "";
        console.log(`target value ${e.target[1].value} before setting empty string`);
        e.target[1].value = "";
        console.log(`target value ${e.target[1].value} after setting empty string`);
        // e.target[2].value = "";
        setMoney("");
        setCategory("");
        

        // send data to server
        // I might use Context API for CSRF Token TODO
        

        fetch('api/transactions/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            mode: 'same-origin',
            body: JSON.stringify(new_data),
        })
        .then(response => response.json()) // response
        .then(data => {
            console.log(data)
            // State is set here to receive id for data from server
            setTransactionData([data, ...transactionData]);
        })
        .catch(er => console.log(er))
    }

    // To make React only source of truth
    function handleCategoryChange(e) {
        setCategory(e.target.value);
    }

    // This handles the value changed to send backend but doesn't affect formatting at all. TODO

    const handleMoneyChange = (event) => {
        setMoney(
            event.target.value,
        );
        console.log(`money is ${money}`);
    };

    return (
        <>
            <div>
                <h2 className={classes.header}>Add New Transaction</h2>
                <form onSubmit={handleSubmit} autoComplete="off" className={classes.form}>
                    <TextField label="Name" size="small" className={classes.formItem} variant="filled" required={true} type="text" ></TextField>
                    <TextField label="$" size="small" className={classes.formItem} variant="filled" 
                    required={true} onChange={handleMoneyChange}></TextField>
                    <Select value={category} variant="filled" margin="dense" className={classes.formItem} onChange={handleCategoryChange} required={true}>
                        <MenuItem value='Grocery'>Grocery</MenuItem>
                        <MenuItem value='Bills & Utilities'>Bills & Utilities</MenuItem>
                        <MenuItem value='Entertainment'>Entertainment</MenuItem>
                        <MenuItem value='Other'>Other</MenuItem>
                    </Select>
                    <Button color="primary" disableRipple={true} className={classes.submitButton} variant="contained" type="submit">Submit</Button>
                </form>
            </div>
            <h2 className={classes.header}>Your Transaction Data</h2>
            <TransactionTable transactionData = {transactionData} setTransactionData = {setTransactionData}  />
        </>
    )
}
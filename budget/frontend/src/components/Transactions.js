import React, {useState, useEffect} from 'react'
import { Button, TextField, Select, MenuItem } from '@material-ui/core';
import {  Delete } from '@material-ui/icons';
import Cookies from 'js-cookie';

export default function Transactions() {
    const [transactionData, setTransactionData] = useState([])
    const [category, setCategory] = useState("")
    const csrftoken = Cookies.get('csrftoken');

    // View for income data
    useEffect(() => {
        fetch('/api/transactions')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setTransactionData(data);
        })
        .catch(error => console.log(error))

        
        return () => {
            console.log("effect clean?");
        }
    }, [])

    function handleSubmit(e){
        e.preventDefault();
        console.log(e);

        // Create new data
        const new_data = {
            name: e.target[0].value,
            amount: e.target[1].value,
            category: e.target[2].value,
        }
        
        
        // set spending text to zero after submitting
        e.target[0].value = "";
        e.target[1].value = "";
        e.target[2].value = "";

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
            setTransactionData([...transactionData, data]);
        })
        .catch(er => console.log(er))
    }

    // To make React only source of truth
    function handleChange(e) {
        setCategory(e.target.value);
    }

    function handleDelete(id){
        console.log(id);
        setTransactionData(transactionData.filter((transaction) => transaction.id !== id));
        // Send request to server
        fetch(`api/transactions/${id}/delete/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            mode: 'same-origin'
        })
        .then(response => response.json()) // response
        .then(data => {
            // returns {"detail": "Not found."} if it fails
            console.log(data)
            // doesn't return any data if it is successfull, only 204 Response
        })
        .catch(er => console.log(er))
    }


    const transactions = transactionData.map(transaction => {
        return (<li style={{margin: "9px 0"}} key= {transaction.id}>
                {`${transaction.name}: $${transaction.amount}  || ${transaction.category}`}
                <Delete fontSize="small" onClick={() => handleDelete(transaction.id)} cursor="pointer" />
                {`~ ${transaction.created_at}`}
                </li>)
    })

    return (
        <div>
            <div>
                <h2>Add New Transaction</h2>
                <form onSubmit={handleSubmit} autoComplete="off" style={{marginBottom:"1rem", display:"flex"}}>
                    <TextField label="Name" size="small" style={{width:"6rem"}} variant="filled" required={true} ></TextField>
                    <TextField label="$" size="small" style={{width:"6rem"}} variant="filled" required={true} ></TextField>
                    <Select value={category} variant="filled" margin="dense" style={{width:"6rem"}} onChange={handleChange} required={true}>
                        <MenuItem value='Grocery'>Grocery</MenuItem>
                        <MenuItem value='Bills & Utilities'>Bills & Utilities</MenuItem>
                        <MenuItem value='Entertainment'>Entertainment</MenuItem>
                        <MenuItem value='Other'>Other</MenuItem>
                    </Select>
                    <Button color="primary" style={{width:"8rem", borderTopLeftRadius:"0", borderBottomLeftRadius:"0"}} variant="contained" type="submit">Submit</Button>
                </form>
            </div>
            <h2>Your Transaction Data</h2>
            <ul>
            {transactions}
            </ul>
        </div>
    )
}
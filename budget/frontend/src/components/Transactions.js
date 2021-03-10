import React, {useState, useEffect} from 'react'
import { Button, TextField, Select, MenuItem } from '@material-ui/core';
import {  Delete } from '@material-ui/icons';
import Cookies from 'js-cookie';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';

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

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

export default function Transactions() {
    const [transactionData, setTransactionData] = useState([])
    const [category, setCategory] = useState("")
    const csrftoken = Cookies.get('csrftoken');
    const classes = useStyles();

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

    const columns = [
        { field: "id", hide: true},
        { field: 'name', headerName: 'Name', width: 200, sortable: false },
        {
            field: 'amount',
            headerName: 'Amount',
            type: 'number',
            valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
            width: 120,
        },
        { field: 'category', headerName: 'Category', width: 130},
        {
            field: 'created_at',
            headerName: 'Date',
            type: 'date',
            width: 130,
        },
        {
            field: "delete",
            headerName: 'Delete',
            width: 30,
            disableColumnMenu: true,
            align: "center",
            filterable: false,
            sortable: false,
            headerClassName: classes.columnSeparator,
            renderCell: (params) => (
                <>
                {console.log(params)}
                {console.log(params.row.id)}
                <Delete fontSize="small" onClick={() => handleDelete(params.row.id)} cursor="pointer" />
                </>
            )
    
        }
    ];    

    const transactions = <DataGrid rows={transactionData} columns={columns} pageSize={5} disableSelectionOnClick />

    return (
        <>
            <div>
                <h2 className={classes.header}>Add New Transaction</h2>
                <form onSubmit={handleSubmit} autoComplete="off" className={classes.form}>
                    <TextField label="Name" size="small" className={classes.formItem} variant="filled" required={true} ></TextField>
                    <TextField label="$" size="small" className={classes.formItem} variant="filled" required={true} ></TextField>
                    <Select value={category} variant="filled" margin="dense" className={classes.formItem} onChange={handleChange} required={true}>
                        <MenuItem value='Grocery'>Grocery</MenuItem>
                        <MenuItem value='Bills & Utilities'>Bills & Utilities</MenuItem>
                        <MenuItem value='Entertainment'>Entertainment</MenuItem>
                        <MenuItem value='Other'>Other</MenuItem>
                    </Select>
                    <Button color="primary" disableRipple={true} className={classes.submitButton} variant="contained" type="submit">Submit</Button>
                </form>
            </div>
            <h2 className={classes.header}>Your Transaction Data</h2>
            {/* <ul>
            {transactions}
            </ul> */}
            <div style={{height: 430, width:"100%",  maxWidth:"800px", display: "flex"}}>
            {transactions}
            </div>
        </>
    )
}
import React, {useEffect} from 'react'
import {  Delete } from '@material-ui/icons';
import Cookies from 'js-cookie';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';

const useStyles = makeStyles(() => ({
    columnSeparator: {
        opacity: 0,
    }
  }));

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

function TransactionTable(props) {
    const {transactionData, setTransactionData} = props;

    const csrftoken = Cookies.get('csrftoken');
    const classes = useStyles();

    // View for transaction data
    useEffect(() => {
        fetch('/api/transactions')
        .then(response => response.json())
        .then(data => {
            //console.log(`useEffect data for first time ${data}`);
            setTransactionData(data);
        })
        .catch(error => console.log(error))

        
        return () => {
            //console.log("effect clean?");
        }
    }, [])

    function handleDelete(id){
        //console.log(id);
        
        // Send request to server
        fetch(`api/transactions/${id}/delete/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            mode: 'same-origin'
        })
        .then(response => {response.json()}) // response
        .then(data => {
            // returns {"detail": "Not found."} if it fails
            //console.log(`data after deleting an item ${data}`)
            // doesn't return any data if it is successfull, only 204 Response
            if (!data){
                //console.log(`data has been deleted successfuly`);
                setTransactionData(transactionData.filter((transaction) => transaction.id !== id));
            }
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
                <Delete fontSize="small" onClick={() => handleDelete(params.row.id)} cursor="pointer" />
                </>
            )
    
        }
    ];    

    const transactions = <DataGrid rows={transactionData} columns={columns} pageSize={5} disableSelectionOnClick />

    return (
        <div style={{height: 430, width:"100%",  maxWidth:"800px", display: "flex"}}>
        {transactions}
        </div>
    )
}

export default TransactionTable

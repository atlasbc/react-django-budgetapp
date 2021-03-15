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

function IncomeTable(props) {
    const {incomeData, setIncomeData} = props;

    const csrftoken = Cookies.get('csrftoken');
    const classes = useStyles();

    // View for income data
    useEffect(() => {
        fetch('/api/income')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setIncomeData(data);
        })
        .catch(error => console.log(error))

        
        return () => {
            console.log("effect clean?");
        }
    }, [])

    function handleDelete(id){
        console.log(id);
        
        // Send request to server
        fetch(`api/income/${id}/delete/`, {
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
            console.log(data)
            if (!data){
                console.log(`data has been deleted successfuly`);
                setIncomeData(incomeData.filter((income) => income.id !== id));
            }            
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

    const income = <DataGrid rows={incomeData} columns={columns} pageSize={5} disableSelectionOnClick />
    
    return (
        <div style={{height: 430, width:"100%",  maxWidth:"800px", display: "flex"}}>
        {income}
        </div>
    )
}

export default IncomeTable

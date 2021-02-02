import React, {useState} from 'react'
import { Button, TextField, Box } from '@material-ui/core';
import {  Delete } from '@material-ui/icons';

export default function Total() {
    const [total, setTotal] = useState(1000);
    const [spending, setSpending] = useState(0);
    const [data, setData] = useState([{
        id: 1,
        name: "Milk",
        price: 2,
        category: "Grocery"
    },
    {
        id: 2,
        name:"Bread",
        price: 1,
        category: "Grocery"
    }]);



    function handleSubmit(e){
        e.preventDefault();
        console.log(e);
        setTotal(total - spending);

        console.log(e)

        // Create new data
        const new_data = {
            id: data.length +1,
            name: e.target[0].value,
            price: e.target[1].value,
            category: e.target[2].value, 
        }
        setData([...data, new_data]);

        // set spending text to zero after submitting
        e.target[0].value = "";
        e.target[1].value = "";
        e.target[2].value = "";

    }

    function handleChange(e){
        console.log(e.target.value);
        setSpending(e.target.value);
    }

    function handleDelete(id){
        console.log(id);
        setData(data.filter((spending) => spending.id !== id));
    }

    const spending_el = data.map((spending) => {
        return (
        <Box key={`item-${spending.id}`} margin="0.5rem 0" display="flex">
            {`${spending.name}: $${spending.price} - ${spending.category} `}
            <Delete fontSize="small" onClick={() => handleDelete(spending.id)} cursor="pointer" />
        </Box>
        )
    })
    // console.log(spending_el);

    return (
        <>
            <div>Total = ${total}</div>
            
            <div>New Spending = ${spending}</div>
            <div style={{marginBottom:"1rem"}}>New Total = ${total - spending}</div>
            {/* <Button color="primary" style={{marginTop: "4rem"}} variant="contained">
            Add Expenditure
            </Button> */}
            <form onSubmit={handleSubmit} autoComplete="off" style={{marginBottom:"1rem"}}>
                {/* <label>
                Name:
                <input type="text" placeholder="spending" onChange={handleChange} />
                </label> */}
                <TextField label="Name" size="small" style={{width:"6rem" ,backgroundColor:"#fff"}} variant="filled" required={true} ></TextField>
                <TextField label="$"  size="small" style={{width:"6rem" ,backgroundColor:"#fff"}} variant="filled" onChange={handleChange} required={true} ></TextField>
                <TextField label="Category" size="small" style={{width:"6rem" ,backgroundColor:"#fff"}} variant="filled" required={true} ></TextField>
                <Button color="primary" style={{height:"100%", borderTopLeftRadius:"0", borderBottomLeftRadius:"0"}} variant="contained" type="submit">Submit</Button>
            </form>
            <Box border="1px solid white" padding="0.5rem" display="flex" flexDirection="column" width="100%" justifyContent="center">
            {data.length > 0 ? spending_el : <div>There isn't any spending here</div>}
                
            </Box>
        </>
    )
}

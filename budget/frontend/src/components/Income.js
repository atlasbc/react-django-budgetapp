import React, {useState, useEffect} from 'react'
import { Button, TextField, Select, MenuItem } from '@material-ui/core';
import {  Delete } from '@material-ui/icons';
import Cookies from 'js-cookie';

export default function Income() {
    const [incomeData, setIncomeData] = useState([])
    const [category, setCategory] = useState("")

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

    function handleSubmit(e){
        e.preventDefault();
        console.log(e);

        // Create new data
        const new_data = {
            name: e.target[0].value,
            amount: e.target[1].value,
            category: e.target[2].value, 
        }
        setIncomeData([...incomeData, new_data]);
        
        // set spending text to zero after submitting
        e.target[0].value = "";
        e.target[1].value = "";
        e.target[2].value = "";

        // send data to server
        // I might use Context API for CSRF Token TODO
        const csrftoken = Cookies.get('csrftoken');

        fetch('api/income/', {
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
        })
        .catch(er => console.log(er))
    }

    // To make React only source of truth
    function handleChange(e) {
        setCategory(e.target.value);
    }

    const income = incomeData.map(inc => {
        return <li style={{margin: "9px 0"}} key= {inc.id}>{`${inc.name}: $${inc.amount} || ${inc.category}`}</li>
    })

    return (
        <div>
            <div>
                <h2>Add New Income</h2>
                <form onSubmit={handleSubmit} autoComplete="off" style={{marginBottom:"1rem"}}>
                    <TextField label="Name" size="small" style={{width:"6rem" ,backgroundColor:"#fff"}} variant="filled" required={true} ></TextField>
                    <TextField label="$" type="number"  size="small" style={{width:"6rem" ,backgroundColor:"#fff"}} variant="filled" required={true} ></TextField>
                    {/* <TextField label="Category" size="small" style={{width:"6rem" ,backgroundColor:"#fff"}} variant="filled" required={true} >
                    </TextField> */}
                    <Select value={category} style={{width:"6rem" ,backgroundColor:"#fff"}} onChange={handleChange} required={true}>
                        <MenuItem value='Salary'>Salary</MenuItem>
                        <MenuItem value='Side'>Side</MenuItem>
                        <MenuItem value='Bonus'>Bonus</MenuItem>
                        <MenuItem value='Other'>Other</MenuItem>
                    </Select>
                    <Button color="primary" style={{height:"100%", borderTopLeftRadius:"0", borderBottomLeftRadius:"0"}} variant="contained" type="submit">Submit</Button>
                </form>
            </div>
            <h2>Your Income Data</h2>
            <ul>
            {income}
            </ul>
        </div>
    )
}

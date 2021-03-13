import React, {useState, useEffect} from 'react'
import { Button, TextField, Select, MenuItem } from '@material-ui/core';
import Cookies from 'js-cookie';
import { makeStyles } from '@material-ui/core/styles';

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
    }
  }));

function IncomeForm(props) {
    const {incomeData, setIncomeData} = props;
    const [category, setCategory] = useState("")

    const csrftoken = Cookies.get('csrftoken');
    const classes = useStyles();

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
            // State is set here to receive id for data from server
            setIncomeData([data, ...incomeData]);
        })
        .catch(er => console.log(er))
    }

    // To make React only source of truth
    function handleChange(e) {
        setCategory(e.target.value);
    }    

    return (
        <form onSubmit={handleSubmit} autoComplete="off" className={classes.form}>
        <TextField label="Name"  size="small" className={classes.formItem} variant="filled" required={true} ></TextField>
        <TextField label="$"  size="small" className={classes.formItem} variant="filled" required={true} ></TextField>
        <Select name="Category"  label="Category" value={category} variant="filled" className={classes.formItem} 
        onChange={handleChange} required={true} margin="dense">
            <MenuItem value='Salary'>Salary</MenuItem>
            <MenuItem value='Side'>Side</MenuItem>
            <MenuItem value='Bonus'>Bonus</MenuItem>
            <MenuItem value='Other'>Other</MenuItem>
        </Select>
        <Button color="primary" disableRipple={true} className={classes.submitButton} variant="contained" type="submit">Submit</Button>
    </form>
    )
}

export default IncomeForm

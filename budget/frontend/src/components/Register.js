import React, {useState, useContext} from 'react';
import { Button, TextField } from '@material-ui/core';
import Cookies from 'js-cookie';
import {UserContext} from './UserContext';
import { makeStyles } from '@material-ui/core/styles';

// This useStyles is basically same for all login, register, transaction, and income 
// A good candidate to refactor actually
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
    infoMessage: {
        width: "15rem",
        [theme.breakpoints.up('sm')]: {
            width: "30rem",
          },  
        [theme.breakpoints.up('md')]: {
            width: "50rem",
          },        
    }    
  }));


export default function Register() {

    const [message, setMessage] = useState("")
    const  {setUser}  = useContext(UserContext);
    const classes = useStyles();

    function handleSubmit(e){
        e.preventDefault();
        // console.log(e.target[0].value);
        // console.log(e.target[1].value);
        // console.log(e.target[2].value);
        // console.log(e.target[3].value);

        const username = e.target[0].value;
        const password = e.target[1].value;
        const confirmation = e.target[2].value;
        const email = e.target[3].value;
        const data = {
            username,
            password,
            confirmation,
            email
        }
        // console.log(data);
        const csrftoken = Cookies.get('csrftoken');
        // console.log(csrftoken);

        fetch('register-request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            mode: 'same-origin',
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            if (data["success"]){
                //console.log(data["success"]);
                localStorage.setItem("user", data["user"])
                setUser(data["user"]);
            }
            else {
                // console.log(data["error"]);
                setMessage(data["error"]);
                if (data["bad-password"]){
                    e.target[1].value = "";
                    e.target[2].value = "";
                }
            }
        })
        .catch(error => console.log(error))
    }

    return (
        <div>
            <form onSubmit={handleSubmit} autoComplete="off"  className={classes.form} > 
                <TextField label="Username" size="small" className={classes.formItem} 
                variant="filled" required={true} ></TextField>
                <TextField label="Password" type="password" size="small" className={classes.formItem} 
                variant="filled"  required={true} ></TextField>
                <TextField label="Confirmation" type="password" size="small" className={classes.formItem} 
                variant="filled"  required={true} ></TextField>
                <TextField label="Email" type="email" size="small" className={classes.formItem} 
                variant="filled"  required={true} ></TextField>                
                <Button color="primary" className={classes.submitButton} 
                variant="contained" type="submit">Register</Button>
            </form>
            <h2 style={{textAlign: "center", margin: "1rem 0"}}>{message}</h2>
            <p className={classes.infoMessage}>You can create a temporary user with a random email like test@example.com.
            Email verification is not required since this is just a demo site.</p>
        </div>
    )
}
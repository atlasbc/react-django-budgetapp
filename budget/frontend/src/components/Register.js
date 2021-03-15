import React, {useState, useContext} from 'react';
import { Button, TextField } from '@material-ui/core';
import Cookies from 'js-cookie';
import {UserContext} from './UserContext';


export default function Register() {

    const [message, setMessage] = useState("")
    const  {setUser}  = useContext(UserContext);

    function handleSubmit(e){
        e.preventDefault();
        console.log(e.target[0].value);
        console.log(e.target[1].value);
        console.log(e.target[2].value);
        console.log(e.target[3].value);

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
        console.log(data);
        const csrftoken = Cookies.get('csrftoken');
        console.log(csrftoken);

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
            console.log(data);
            if (data["success"]){
                console.log(data["success"]);
                localStorage.setItem("user", data["user"])
                setUser(data["user"]);
            }
            else {
                console.log(data["error"]);
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
            <form onSubmit={handleSubmit} autoComplete="off" style={{display: "flex"}} > 
                <TextField label="Username" size="small" style={{width:"9rem"}} 
                variant="filled" required={true} ></TextField>
                <TextField label="Password" type="password" size="small" style={{width:"9rem"}} 
                variant="filled"  required={true} ></TextField>
                <TextField label="Confirmation" type="password" size="small" style={{width:"9rem"}} 
                variant="filled"  required={true} ></TextField>
                <TextField label="Email" type="email" size="small" style={{width:"9rem"}} 
                variant="filled"  required={true} ></TextField>                
                <Button color="primary" style={{borderTopLeftRadius:"0", borderBottomLeftRadius:"0"}} 
                variant="contained" type="submit">Register</Button>
            </form>
            <h2 style={{textAlign: "center", margin: "1rem 0"}}>{message}</h2>
        </div>
    )
}
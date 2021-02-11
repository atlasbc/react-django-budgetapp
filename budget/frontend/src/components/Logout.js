import React, {useContext} from 'react';
import { Button } from '@material-ui/core';
import {UserContext} from './UserContext';

export default function Logout() {
    const {setUser}  = useContext(UserContext);

    // need context API to give feedback

    function handleClick(){

        fetch('logout-request')
        .then(response => response.json())
        .then(data => {
            localStorage.removeItem("user")
            setUser(false);
        })

    }

    return (
        <>
        <Button color="inherit" style={{borderTopLeftRadius:"0", borderBottomLeftRadius:"0"}} 
        variant="text" size="small" onClick={handleClick} type="submit">Logout</Button>
        </>
    )
}
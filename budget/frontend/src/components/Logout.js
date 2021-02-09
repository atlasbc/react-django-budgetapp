import React from 'react';
import { Button } from '@material-ui/core';

export default function Logout() {

    // need context API to give feedback

    function handleClick(){

        fetch('logout-request')
        .then(response => response.json())
        .then(data => console.log(data));

    }

    return (
        <>
        <Button color="inherit" style={{borderTopLeftRadius:"0", borderBottomLeftRadius:"0"}} 
        variant="text" size="small" onClick={handleClick} type="submit">Logout</Button>
        </>
    )
}
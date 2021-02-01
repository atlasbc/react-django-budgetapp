import React from "react";
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core';
// import { MenuIcon } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';



export default function Header() {
    return (
        <AppBar position="static" style={{marginBottom:"1rem"}}>
            <Toolbar variant="dense" disableGutters={true} style={{justifyContent: "space-between"}} >
            <IconButton style= {{color:"#fff"}} >
                <MenuIcon/>
            </IconButton>
            <Button variant="outlined" size="small" color="inherit" style={{marginRight: "12px"}} >Login</Button>
            </Toolbar>
        </AppBar>
    )
}



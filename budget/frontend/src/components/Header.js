import React, {useContext} from "react";
import { AppBar, Toolbar, IconButton, Button, Link } from '@material-ui/core';
// import { MenuIcon } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import Logout from './Logout';
import {UserContext} from './UserContext';

import {
    Link as RouterLink
  } from "react-router-dom";

export default function Header() {
    const  {user}  = useContext(UserContext);
    console.log(`user from Header component ${user}`);

    return (

            <AppBar position="static" style={{marginBottom:"1rem"}}>
                <Toolbar variant="dense" disableGutters={true} style={{justifyContent: "space-between"}} >
                <IconButton style= {{color:"#fff"}} >
                    <MenuIcon/>
                </IconButton>
                <nav>
                <Link component={RouterLink} to="/" color="inherit" style={{marginRight: "12px"}} >Home</Link>
                <Link component={RouterLink} to="income" color="inherit" style={{marginRight: "12px"}} >Income</Link>
                <Link component={RouterLink} to="transactions" color="inherit" style={{marginRight: "12px"}} >Transactions</Link>
                <Link component={RouterLink} to="budget" color="inherit" style={{marginRight: "12px"}} >Budget</Link>
                <Link component={RouterLink} to="about" color="inherit" >About</Link>

                <Button variant="outlined" size="small" color="inherit" style={{margin: "0 12px"}} >
                    <Link component={RouterLink} to="login" color="inherit" >Login</Link>
                </Button>
                <Logout />
                {user? user: ""}
                </nav>
                </Toolbar>              
            </AppBar>
    )
}



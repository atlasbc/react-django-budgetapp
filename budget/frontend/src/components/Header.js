import React, {useContext} from "react";
import { AppBar, Toolbar, IconButton, Button, Link, Box } from '@material-ui/core';
// import { MenuIcon } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Logout from './Logout';
import {UserContext} from './UserContext';

import {
    Link as RouterLink
  } from "react-router-dom";

  const drawerWidth = 240;

  const useStyles = makeStyles((theme) => ({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
  }));


export default function Header(props) {
    const  {user}  = useContext(UserContext);
    const classes = useStyles();
    const {handleDrawerToggle} = props;
    const theme = useTheme();
    console.log(`user from Header component ${user}`);

    return (

            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar disableGutters={true} style={{justifyContent: "space-between"}} >
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                {/* {user &&
                <>
                <Link component={RouterLink} to="/" color="inherit" style={{marginRight: "12px"}} >Home</Link>
                <Link component={RouterLink} to="income" color="inherit" style={{marginRight: "12px"}} >Income</Link>
                <Link component={RouterLink} to="transactions" color="inherit" style={{marginRight: "12px"}} >Transactions</Link>
                <Link component={RouterLink} to="budget" color="inherit" style={{marginRight: "12px"}} >Budget</Link>
                </>
                } */}

                {/* <Link component={RouterLink} to="about" color="inherit" >About</Link> */}

                <span style={{margin: "0 0.5rem"}}>
                {user? user: ""}
                </span>
                {user?<Logout />
                :<>
                <Button variant="outlined" size="small" color="inherit" style={{margin: "0 12px"}} >
                    <Link component={RouterLink} to="login" color="inherit" >Login</Link>
                </Button>
                <Button variant="outlined" size="small" color="inherit" style={{margin: "0 12px"}} >
                    <Link component={RouterLink} to="register" color="inherit" >Register</Link>
                </Button>
                </>
                }

                
                </Toolbar>              
            </AppBar>
    )
}



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

  const drawerWidth = 160;

  const useStyles = makeStyles((theme) => ({
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginLeft: theme.spacing(0.5),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    userContainer:{
      marginLeft: theme.spacing(1)
    },
    authContainer: {
      marginRight: theme.spacing(0.5)
    },
    authButtons: {
      marginLeft: theme.spacing(1),
    }
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

                <span className={classes.userContainer}>
                {user? user: ""}
                </span>
                <div className={classes.authContainer}> 
                {user?<Logout />
                : <>
                <Button variant="outlined" size="small" color="inherit" >
                    <Link component={RouterLink} to="login" color="inherit" >Login</Link>
                </Button>
                <Button variant="outlined" size="small" color="inherit" className={classes.authButtons}>
                    <Link component={RouterLink} to="register" color="inherit"  >Register</Link>
                </Button>
                </>
                }
                </div>
                </Toolbar>              
            </AppBar>
    )
}



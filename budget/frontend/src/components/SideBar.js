import React, {useContext} from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {UserContext} from './UserContext';
import { Link } from '@material-ui/core';
import {
    Link as RouterLink
  } from "react-router-dom";

const drawerWidth = 160;

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
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  listItem: {
    paddingLeft: "36px"
  }
}));

function SideBar(props) {
  const { window , handleDrawerToggle, mobileOpen} = props;
  const  {user}  = useContext(UserContext);
  const classes = useStyles();
  const theme = useTheme();

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List >
        {user &&
                <>
                <ListItem className={classes.listItem} >
                    <Link component={RouterLink} to="/" color="inherit" >Home</Link>
                </ListItem>
                <ListItem className={classes.listItem}>
                <Link component={RouterLink} to="income" color="inherit"  >Income</Link>
                </ListItem>
                <ListItem className={classes.listItem}>
                <Link component={RouterLink} to="transactions" color="inherit" >Transactions</Link>
                </ListItem>
                {/* <ListItem>
                <Link component={RouterLink} to="budget" color="inherit" style={{marginRight: "12px"}} >Budget</Link>
                </ListItem> */}
                <ListItem className={classes.listItem}>
                <Link component={RouterLink} to="about" color="inherit" >About</Link>
                </ListItem>
                </>
        }        
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </>
  );
}


export default SideBar

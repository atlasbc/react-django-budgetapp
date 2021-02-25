import React, {useState, useEffect} from "react";
import { render } from "react-dom";
// Components
import "./App.css";
import Home from "./Home";
import Header from "./Header";
import About from "./About";
import Income from "./Income";
import Transactions from "./Transactions";
import Budget from "./Budget";
import Login from "./Login";
import Register from "./Register";
import  {UserContext} from "./UserContext";
import Sidebar from "./SideBar"

// Material UI
import { ThemeProvider } from "@material-ui/styles";
import { Box, createMuiTheme, CssBaseline, Paper } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// React Router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Autorenew } from "@material-ui/icons";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const lightTheme = createMuiTheme({
  palette: {
    type: "light"
  }
});

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
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
  paper:{
    width: `100%`
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    [theme.breakpoints.up('sm')]: {
      width: `calc(100vw - ${drawerWidth}px)`,
    },
  },
}));


export default function App() {

  const [user, setUser] = useState(localStorage.getItem("user"))
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();

  const fetchUser = () => {

    fetch('auth-check')
    .then(response => response.json())
    .then(data => {
        setUser(data["user"]);
    })
  }

  // Protective measure agains localStorage
  // It checks whether auth from localStorage is correct
  useEffect(() => {
    fetchUser();
    return () => {
      console.log("App cleanup?");
    }
  }, [])

  console.log(`user from App component ${user}`);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <UserContext.Provider value={{user, setUser}}>
      <Router>
      <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
        <div className="App">
        <Paper className={classes.paper}>
            <Box display="flex"
            borderRadius="0.5rem">
              <Header handleDrawerToggle= {handleDrawerToggle} />
              <Sidebar handleDrawerToggle= {handleDrawerToggle} mobileOpen = {mobileOpen} />
              <main className={classes.content}>
              <div className={classes.toolbar} />
              <Switch>
                <Route exact path="/">
                  {user? <Home /> : <Redirect to= "/login"/>}
                </Route>

                <Route path="/income">
                {user? <Income /> : <Redirect to= "/login"/>}
                </Route>

                <Route path="/transactions">
                {user? <Transactions /> : <Redirect to= "/login"/>}
                    
                </Route>

                <Route  path="/budget">
                {user? <Budget /> : <Redirect to= "/login"/>}
                </Route>

                <Route  path="/about">
                    <About />
                </Route>
                
                <Route  path="/login">
                    {user? <Redirect to ="/" /> : <Login /> }
                </Route>
                <Route  path="/register">
                    {user? <Redirect to ="/" /> : <Register /> }
                </Route>
              </Switch>         
              </main>
            </Box>
          </Paper>
        </div>
        </ThemeProvider>
      </Router>
    </UserContext.Provider>
  )
}

const container = document.getElementById("app");
render(<App />, container);
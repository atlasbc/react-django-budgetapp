import React, {useState, useEffect} from "react";
import { render } from "react-dom";
import "./App.css";
import { Box } from '@material-ui/core';
import Home from "./Home";
import Header from "./Header";
import About from "./About";
import Income from "./Income";
import Transactions from "./Transactions";
import Budget from "./Budget";
import Login from "./Login";
import Register from "./Register";

import  {UserContext} from "./UserContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";


export default function App() {

  const [user, setUser] = useState(localStorage.getItem("user"))

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

  return (
    <UserContext.Provider value={{user, setUser}}>
      <Router>
        <div className="App">
          <Box mx="auto" py="4rem" width="50%" height="80vh" display="flex" color="#fff"
          flexDirection="column" alignItems="center"  borderRadius="0.5rem" >
            <Header />
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
          </Box>
        </div>
      </Router>
    </UserContext.Provider>
  )
}

const container = document.getElementById("app");
render(<App />, container);
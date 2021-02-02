import React from "react";
import { render } from "react-dom";
import "./App.css";
import { Box } from '@material-ui/core';
import Total from "./Total";
import Header from "./Header";
import About from "./About";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Box mx="auto" py="4rem" width="50%" height="80vh" display="flex" color="#fff"
        flexDirection="column" alignItems="center"  borderRadius="0.5rem" >
          <Header />
          <Switch>
            <Route exact path="/">
                <Total />
            </Route>
            <Route exact path="/about">
                <About />
            </Route>
          </Switch>         
        </Box>
      </div>
    </Router>
  )
}

const container = document.getElementById("app");
render(<App />, container);
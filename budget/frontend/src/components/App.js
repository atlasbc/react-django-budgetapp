import React from "react";
import { render } from "react-dom";
import "./App.css";
import { Box } from '@material-ui/core';
import Total from "./Total";
import Header from "./Header";


export default function App() {
  return (
    <div className="App">
    
      <Box mx="auto" py="4rem" width="50%" height="80vh" display="flex" color="#fff"
      flexDirection="column" alignItems="center"  borderRadius="0.5rem" >
        <Header  />
        <Total />
      </Box>
    
    </div>
  )
}

const container = document.getElementById("app");
render(<App />, container);
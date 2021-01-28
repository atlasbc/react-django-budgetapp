import React from "react";
import { render } from "react-dom";
import { Button, Container, Box } from '@material-ui/core';
import Total from "./Total";

export default function App() {
  return (
    <div className="App">
    <Container >
      <Box mx="auto" my="8rem" width="50%" display="flex" bgcolor="#333333" color="#fff"
      flexDirection="column" alignItems="center" borderRadius="1rem">
        <Total />
        <Button color="primary" style={{marginTop: "4rem"}} variant="contained">
          Hello world
        </Button>
      </Box>
    </Container>
    </div>
  )
}

const container = document.getElementById("app");
render(<App />, container);
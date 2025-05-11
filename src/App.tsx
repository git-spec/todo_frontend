// import { useState } from 'react';
import Container from "@mui/material/Container";

import './App.css';
import Task from "./components/Task.tsx";


function App() {

  return (
    <>
      <Container maxWidth={'xl'}>
          <Task></Task>
      </Container>
    </>
  );
}

export default App;

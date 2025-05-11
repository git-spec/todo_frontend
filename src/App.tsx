import {useEffect, useState} from 'react';
import Container from "@mui/material/Container";
import axios from "axios";

import './App.css';
import Task from "./components/Task.tsx";
import type {ITask} from "./components/ITask.ts";


function App() {
    const [tasks, setTasks] = useState<Array<ITask>>([
        {
            "id": "9c2915a1-3cb0-4a62-8448-7e17ded7cd34",
            "description": "test1",
            "status": "IN_PROGRESS"
        },
        {
            "id": "094314bb-7aa6-45c2-9ddf-e92dfe129c27",
            "description": "test2",
            "status": "DONE"
        },
        {
            "id": "bb48d786-1297-43ea-838f-73304297d9a7",
            "description": "Teilnahme an Benefizveranstaltung",
            "status": "OPEN"
        }
    ]);

    function getTasks() {
        axios.get('/api/todo')
            .then(res => {
                setTasks(res.data);
                console.log('response: ', res.data)
            })
            .catch(err => console.log(err))
    }

    // useEffect(() => {
    //     getTasks();
    //     console.log(tasks);
    // }, []);

  return (
    <>
      <Container maxWidth={'xl'}>
          {
              tasks && tasks.map(task => (<Task taskProp={task} />))
          }
      </Container>
    </>
  );
}

export default App;

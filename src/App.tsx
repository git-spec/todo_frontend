import {useCallback, useEffect, useState} from 'react';
import Container from "@mui/material/Container";
import axios from "axios";

import './App.css';
import Task from "./components/Task.tsx";
import TaskBar from "./components/TaskBar.tsx";
import type {ITask} from "./components/ITask.ts";


function App() {
    const [tasks, setTasks] = useState<Array<ITask>>();
    const [newTask, setNewTask] = useState<boolean>(false);
    const getNewTask = useCallback((val: ITask) => {
        if (tasks && !!tasks.find(el => el.id === val.id)) {
            const updatedTasks = tasks.map(task => {
                if (task.id === val.id) {
                    return {
                        id: val.id,
                        description: val.description,
                        status: val.status
                    }
                } else {
                    return task;
                }
            });
            setTasks(updatedTasks);
        } else {
            const newTasks = tasks ? [val, ...tasks] : [val];
            setTasks(newTasks);
            clearNewTask();
        }
    }, [tasks]);

    function addNewTask() {
        setNewTask(true);
    }

    function clearNewTask() {
        setNewTask(false);
    }

    function getTasks() {
        axios.get('/api/todo')
            .then(res => setTasks(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getTasks();
    }, []);

  return (
    <>
      <TaskBar onAddTask={addNewTask} />
      <Container maxWidth={'xl'} sx={{pt: '3rem'}}>
          {
              newTask && <Task edit={newTask} onTaskChange={clearNewTask} getNewTask={getNewTask} />
          }
          {
              tasks && tasks.map(task => (<Task key={task.id} task={task} onTaskChange={getTasks} getNewTask={getNewTask} />))
          }
      </Container>
    </>
  );
}

export default App;

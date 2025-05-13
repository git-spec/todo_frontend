import {type FormEvent, useEffect, useState} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Edit from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CardHeader from "@mui/material/CardHeader";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Grid from "@mui/material/Grid";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useTheme } from "@mui/material/styles";
import axios from "axios";

import './Task.css';
import type {ITask} from "./ITask.ts";

type Props = {
    task?: ITask;
    onTaskChange?: () => void;
    edit?: boolean;
    getNewTask: (val: ITask) => void;
}

function Task(props: Props) {
    const theme = useTheme();
    const [task, setTask] = useState<ITask>();
    const [status, setStatus] = useState<string>('TODO');
    const [title, setTitle] = useState<string>();
    const [content, setContent] = useState<string>();
    const [edit, setEdit] = useState<boolean>(false);

    useEffect(() => {
        setTask(props.task);
        if(props.task) setContent(props.task.description);
        if(props.task) setStatus(props.task.status);
        if(props.task) setTitle(props.task.id);
        if(props.edit) setEdit(props.edit);
    }, []);

    function addTask(e: FormEvent) {
        e.preventDefault();
        axios.post('/api/todo',
            {
                description: content ? content : '',
                status: 'TODO'
            }
        )
            .then(res => res.data && props.getNewTask && props.getNewTask(res.data))
            .catch(err => console.log(err.status));
    }

    function updateTask(e: FormEvent) {
        e.preventDefault();
        if (task) axios.put('api/todo/' + task.id,
            {
                id: task.id,
                description: content,
                status: status
            }
        )
            .then(res => {
                if (res.data) {
                    if (props.getNewTask) props.getNewTask(res.data);
                    setEdit(false);
                }
            })
            .catch(err => console.log(err.status));
    }

    function deleteTask() {
        if(task) {
            axios.delete('/api/todo/' + task.id)
                .then(() => props.onTaskChange && props.onTaskChange())
                .catch(err => console.log(err));
        } else {
            if (props.onTaskChange) props.onTaskChange();
        }
    }

    return (
        <>
            <form onSubmit={e => task && task.id ? updateTask(e) : addTask(e)}>
                <Card sx={{display: 'flex', flexFlow: 'column', pt: 1, m: 2}}>
                    {/*HEADER*/}
                    <CardHeader subheader={
                        <Grid container spacing={1}>
                            <Grid size={{xs: 7, sm: 8, md: 9, lg: 10}}>
                                {/*TITLE*/}
                                <TextField
                                    variant={'outlined'}
                                    value={title}
                                    fullWidth={true}
                                    placeholder={'Titel'}
                                    disabled={!edit}
                                    sx={
                                        {
                                            '& .MuiInputBase-input': {
                                                py: '4px !important',
                                                fontSize: '.8rem'
                                            },
                                            '& .MuiInputBase-root': {
                                                borderRadius: '2px',
                                                borderColor: 'darkgray',
                                                width: 'calc(100% + 8px)'
                                            },
                                            // Rahmen (Outline) entfernen
                                            '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                                                border: 'none',
                                            },
                                            '& .MuiInputBase-input.Mui-disabled': {
                                                color: '#000',
                                                WebkitTextFillColor: '#000', // für Chrome/Safari
                                                fontWeight: '700'
                                            },
                                        }
                                    }
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </Grid>
                            <Grid size={{xs: 5, sm: 4, md: 3, lg: 2}} sx={{textAlign: 'end'}}>
                                {/*DATE*/}
                                <Typography component={'span'} fontSize={'.8rem'}>Created at: 9.5.2025</Typography>
                            </Grid>
                        </Grid>
                    } sx={{py: 0}}
                    />
                    <Grid container spacing={{xs: 2, sm: 1}} sx={{mt: 1}}>
                        <Grid size={{xs: 12, sm: 8, md: 9, lg: 10}} sx={{display: 'flex', justifyContent: 'space-between', flexFlow: {xs: "row wrap", sm: "column wrap"}}}>
                            <CardContent sx={{pr: 0, py: 0}}>
                                {/*TASK*/}
                                <TextareaAutosize
                                    className={'task'}
                                    minRows={'1'}
                                    style={
                                        {
                                            width: '100%',
                                            fontFamily: 'Roboto',
                                            color: "#000",
                                            border: '1px solid #BCBCBC',
                                            resize: 'vertical',
                                            paddingRight: 0,
                                            paddingLeft: '.8rem'
                                        }
                                    }
                                    placeholder={'To do'}
                                    value={content}
                                    onChange={e => setContent(e.target.value)}
                                    disabled={!edit}
                                />
                            </CardContent>
                            {/*STATUS ACTIONS*/}
                            {
                                edit && (
                                    <CardActions sx={{pl: 2}}>
                                        <FormControl>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}
                                            >
                                                <FormControlLabel
                                                    value="TODO"
                                                    control={
                                                        <Radio
                                                            sx={{
                                                                py: 0,
                                                                '&.Mui-checked': {
                                                                    color: theme.palette.primary.main, // Farbe, wenn ausgewählt
                                                                },
                                                            }}
                                                        />
                                                    }
                                                    label={
                                                        <span style={
                                                            {
                                                                color: status === "TODO"
                                                                    ? theme.palette.primary.main
                                                                    : undefined
                                                            }
                                                        }>
                                                  TODO
                                                </span>
                                                    }
                                                />
                                                <FormControlLabel
                                                    value="DOING"
                                                    control={
                                                        <Radio
                                                            sx={{
                                                                py: 0,
                                                                '&.Mui-checked': {
                                                                    color: theme.palette.success.light, // Farbe, wenn ausgewählt
                                                                }
                                                            }}
                                                        />
                                                    }
                                                    label={
                                                        <span style={
                                                            {
                                                                color: status === "DOING"
                                                                    ? theme.palette.success.light
                                                                    : undefined
                                                            }
                                                        }>
                                                  DOING
                                                </span>
                                                    }
                                                />
                                                <FormControlLabel
                                                    value="DONE"
                                                    control={
                                                        <Radio
                                                            sx={{
                                                                py: 0,
                                                                '&.Mui-checked': {
                                                                    color: theme.palette.warning.light, // Farbe, wenn ausgewählt
                                                                },
                                                            }}
                                                        />
                                                    }
                                                    label={
                                                        <span style={
                                                            {
                                                                color: status === "DONE"
                                                                    ? theme.palette.warning.light
                                                                    : undefined
                                                            }
                                                        }>
                                                  DONE
                                                </span>
                                                    }
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </CardActions>
                                )
                            }
                        </Grid>
                        <Grid
                            size={
                                {xs: 12, sm: 4, md: 3, lg: 2}
                            }
                            sx={
                                {
                                    display: 'flex',
                                    flexFlow: 'column',
                                    justifyContent: 'space-between',
                                    alignItems: 'end'
                                }
                            }
                        >
                            {/*TASK ACTIONS*/}
                            <CardActions
                                sx={
                                    {
                                        display: 'flex',
                                        alignItems: 'start',
                                        justifyContent: 'end',
                                        pt: '6px',
                                        pr: '10px',
                                        pb: 1,
                                        pl: 2
                                    }
                                }
                            >
                                <Chip
                                    label={
                                        status === 'TODO'
                                            ? 'TODO'
                                            : status === 'DOING'
                                                ? 'DOING'
                                                : 'DONE'
                                    }
                                    color={
                                        status === 'TODO'
                                            ? 'primary'
                                            : status === 'DOING'
                                                ? 'success'
                                                : 'warning'
                                    }
                                    sx={{height: '1.6rem'}}>
                                </Chip>
                                <Button
                                    className={edit ? 'hide' : ''} sx={{minWidth: 0, p: 0}}
                                    onClick={() => setEdit(!edit)}
                                >
                                    <Edit></Edit>
                                </Button>
                                <DeleteOutlineOutlinedIcon
                                    color={'primary'}
                                    sx={{ml: '1rem !important', cursor: 'pointer'}}
                                    onClick={() => deleteTask()}
                                ></DeleteOutlineOutlinedIcon>
                            </CardActions>
                            {/*EDIT ACTIONS*/}
                            { edit &&
                                (
                                    <CardActions sx={{py: 1}}>
                                        <Button type={'submit'} sx={{minWidth: 0, p: 0}}>
                                            <SaveOutlinedIcon></SaveOutlinedIcon>
                                        </Button>
                                        <Button
                                            sx={{minWidth: 0, p: 0}}
                                            onClick={() => setEdit(!edit)}
                                        >
                                            <CloseOutlinedIcon sx={{ml: 1}}></CloseOutlinedIcon>
                                        </Button>
                                    </CardActions>
                                )
                            }
                        </Grid>
                    </Grid>
                </Card>
            </form>
        </>
    );
}

export default Task;
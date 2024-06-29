import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskForm from '../addTask/addTask';
import TaskModal from '../editTask/editTask';

const initialTasks = {
    Queue: [],
    InProgress: [],
    Review: [],
    Done: [],
};

const Dashboard = () => {
    const [tasks, setTasks] = useState(initialTasks);
    const [showModal, setShowModal] = useState(false);
    const [currentTask, setCurrentTask] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = Cookies.get('live-connected-id');
                const headers = {
                    'Authorization': `Bearer ${token}`,
                };
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                if(!userInfo)
                    navigate('/');
                
                const userId = userInfo.id; // Replace with actual user ID
                const response = await axios.get(`http://localhost:4000/getUserRelatedTasks/${userId}`, { headers });
                debugger;
                if (response.data?.err == "Bad Authorization")
                    return navigate('/');
                
                const userTasks = response.data;
                const formattedTasks = {
                    Queue: [],
                    InProgress: [],
                    Review: [],
                    Done: [],
                };

                userTasks.forEach(task => {
                    formattedTasks[task.status].push(task);
                });

                setTasks(formattedTasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }

        const sourceTasks = Array.from(tasks[source.droppableId]);
        const [movedTask] = sourceTasks.splice(source.index, 1);
        const destinationTasks = Array.from(tasks[destination.droppableId]);
        destinationTasks.splice(destination.index, 0, movedTask);

        setTasks((prevTasks) => ({
            ...prevTasks,
            [source.droppableId]: sourceTasks,
            [destination.droppableId]: destinationTasks,
        }));

        movedTask.status = destination.droppableId;

        const token = Cookies.get('live-connected-id');
        const headers = {
            'Authorization': `Bearer ${token}`,
        };

        axios.put(`http://localhost:4000/updateTaskStatus/${movedTask.id}`, movedTask, { headers })
            .then(response => console.log(response.data))
            .catch(error => console.error('Error updating task status:', error));
    };

    const addTask = (task) => {
        setTasks((prevTasks) => ({
            ...prevTasks,
            [task.status]: [...prevTasks[task.status], task],
        }));
    };

    const handleEditTask = (task) => {
        setCurrentTask(task);
        setShowModal(true);
    };

    const updateTask = (updatedTask) => {
        setTasks((prevTasks) => {
            const updatedTasks = { ...prevTasks };
            Object.keys(updatedTasks).forEach((status) => {
                updatedTasks[status] = updatedTasks[status].map((task) =>
                    task.id === updatedTask.id ? updatedTask : task
                );
            });
            return updatedTasks;
        });

        const token = Cookies.get('live-connected-id');
        const headers = {
            'Authorization': `Bearer ${token}`,
        };

        axios.put(`http://localhost:4000/updateTaskStatus/${updatedTask.id}`, updatedTask, { headers })
            .then(response => console.log(response.data))
            .catch(error => console.error('Error updating task:', error));
    };

    const deleteTask = (taskToDelete) => {
        setTasks((prevTasks) => {
            const updatedTasks = { ...prevTasks };
            updatedTasks[taskToDelete.status] = updatedTasks[taskToDelete.status].filter(
                (task) => task.id !== taskToDelete.id
            );
            return updatedTasks;
        });

        const token = Cookies.get('live-connected-id');
        const headers = {
            'Authorization': `Bearer ${token}`,
        };

        axios.delete(`http://localhost:4000/deleteTask/${taskToDelete.id}`, { headers })
            .then(response => console.log(response.data))
            .catch(error => console.error('Error deleting task:', error));
    };

    return (
        <div className="container">
            <h2 className="text-center my-4">Task Dashboard</h2>
            <TaskForm addTask={addTask} />
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="row">
                    {Object.keys(tasks).map((key) => (
                        <Droppable droppableId={key} key={key}>
                            {(provided) => (
                                <div
                                    className="col-3"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <h3 className="text-center">{key}</h3>
                                    <div className="list-group">
                                        {tasks[key].map((task, index) => (
                                            <Draggable draggableId={task.id} index={index} key={task.id}>
                                                {(provided) => (
                                                    <div
                                                        className="list-group-item"
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        onClick={() => handleEditTask(task)}
                                                    >
                                                        <div className="d-flex justify-content-between">
                                                            <div>
                                                                <h5>{task.title}</h5>
                                                                <p>{task.description}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
            <TaskModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                task={currentTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
            />
        </div>
    );
};

export default Dashboard;

import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const TaskForm = ({ addTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Queue');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title && description) {
            const token = Cookies.get('live-connected-id');
            const headers = {
                'Authorization': `Bearer ${token}`,
            };
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const userId = userInfo.id; // Replace with actual user ID

            const newTask = { title, description, status, userId };
            
            try {
                const response = await axios.post('http://localhost:4000/createTask', newTask, { headers });
                addTask({ ...newTask, id: response.data.id });
                setTitle('');
                setDescription('');
                setStatus('Queue');
            } catch (error) {
                console.error('Error creating task:', error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="form-group">
                <label>Task Title</label>
                <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
            </div>
            <div className="form-group">
                <label>Status</label>
                <select
                    className="form-control"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="Queue">Queue</option>
                    <option value="InProgress">In Progress</option>
                    <option value="Review">Review</option>
                    <option value="Done">Done</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary mt-2">Add Task</button>
        </form>
    );
};

export default TaskForm;

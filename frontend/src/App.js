import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Signup from './Components/SignUp/signUp'; // Adjusted import path if necessary
import Dashboard from './Components/Dashboard/dashboard';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path='my-dashboard' element={<Dashboard/>}/>
                </Routes>
            </div>
        </Router>
    );
};

export default App;
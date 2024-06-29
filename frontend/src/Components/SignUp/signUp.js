import React, { useState } from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [is_admin, setIsAdmin] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/register', { first_name, last_name, email, password, is_admin });
            setMessage('Signup successful');
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            setMessage('Signup failed');
        }
    };

    return (
        <div className="container auth-container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h2 className="card-title text-center">Signup</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        placeholder="Enter your first name"
                                        value={first_name}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        placeholder="Enter your last name"
                                        value={last_name}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-check form-switch mb-3">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="isAdmin"
                                        checked={is_admin}
                                        onChange={(e) => setIsAdmin(e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="isAdmin">Admin</label>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Signup</button>
                                {/* <div className='link'><Link to='/' > Login? </Link></div> */}
                            </form>
                            {message && <div className="alert alert-info mt-3">{message}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;

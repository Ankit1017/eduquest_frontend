import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const cardStyle = {
    background: '#fff',
    borderRadius: '14px',
    boxShadow: '0 2px 16px rgba(0,0,0,0.09)',
    padding: '32px 28px',
    margin: '60px auto',
    maxWidth: '400px',
    minWidth: '280px'
};

const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    margin: '12px 0',
    borderRadius: '7px',
    border: '1px solid #bdbdbd',
    fontSize: '1rem',
    background: '#fafbfc',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border 0.2s'
};

const labelStyle = {
    fontWeight: 600,
    margin: '8px 0 4px 0',
    display: 'block'
};

const buttonStyle = {
    background: '#1976d2',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '12px 26px',
    fontWeight: 600,
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '18px',
    width: '100%',
    transition: 'background 0.2s'
};

const disabledButtonStyle = {
    ...buttonStyle,
    background: '#b0bec5',
    cursor: 'not-allowed'
};

const successMsgStyle = {
    color: '#388e3c',
    fontWeight: 600,
    margin: '18px 0 0 0',
    textAlign: 'center'
};

const errorMsgStyle = {
    color: '#d32f2f',
    fontWeight: 600,
    margin: '18px 0 0 0',
    textAlign: 'center'
};

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMsg('');
        setErrorMsg('');
        try {
            const res = await axios.post('https://eduquest-backend-two.vercel.app/api/auth/register', { username, password });
            setSuccessMsg('Registration successful! Logging you in...');
            login(res.data);
        } catch (err) {
            setErrorMsg('Registration failed. Username may already exist.');
        }
        setLoading(false);
    };

    return (
        <div style={cardStyle}>
            <h2 style={{ color: '#1976d2', textAlign: 'center', marginBottom: 20 }}>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <label style={labelStyle} htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    required
                    style={inputStyle}
                    autoComplete="username"
                />
                <label style={labelStyle} htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    style={inputStyle}
                    autoComplete="new-password"
                />
                <button
                    type="submit"
                    style={loading ? disabledButtonStyle : buttonStyle}
                    disabled={loading}
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
            {successMsg && <div style={successMsgStyle}>{successMsg}</div>}
            {errorMsg && <div style={errorMsgStyle}>{errorMsg}</div>}
        </div>
    );
};

export default Register;

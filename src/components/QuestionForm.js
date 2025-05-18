import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const cardStyle = {
    background: '#fff',
    borderRadius: '14px',
    boxShadow: '0 2px 16px rgba(0,0,0,0.09)',
    padding: '32px 28px',
    margin: '36px auto',
    maxWidth: '520px',
    minWidth: '320px'
};

const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    margin: '10px 0',
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
    margin: '12px 0 4px 0',
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
    margin: '18px 0 0 0'
};

const errorMsgStyle = {
    color: '#d32f2f',
    fontWeight: 600,
    margin: '18px 0 0 0'
};

const QuestionForm = () => {
    const { authTokens, user } = useContext(AuthContext);
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctOption, setCorrectOption] = useState(0);
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.isAdmin === false) {
            navigate("/");
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        setSuccessMsg('');

        const questionData = {
            question,
            authorId: user._id,
            options,
            correctOption
        };

        try {
            await axios.post('https://eduquest-backend-two.vercel.app/api/questions', questionData, {
                headers: {
                    Authorization: `Bearer ${authTokens}`
                }
            });
            setSuccessMsg('Question added successfully!');
            setQuestion('');
            setOptions(['', '', '', '']);
            setCorrectOption(0);
        } catch (err) {
            setErrorMsg('Failed to add question. Please try again.');
        }
        setLoading(false);
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    return (
        <>
            <Navbar />
            <div style={cardStyle}>
                <h2 style={{ color: '#1976d2', marginBottom: 16, textAlign: 'center' }}>Add New Question</h2>
                <form onSubmit={handleSubmit}>
                    <label style={labelStyle} htmlFor="question">Question</label>
                    <textarea
                        id="question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Enter your question"
                        required
                        style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }}
                    />
                    <div>
                        <label style={labelStyle}>Options</label>
                        {options.map((option, index) => (
                            <input
                                key={index}
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                placeholder={`Option ${index + 1}`}
                                required
                                style={inputStyle}
                                aria-label={`Option ${index + 1}`}
                            />
                        ))}
                    </div>
                    <label style={labelStyle} htmlFor="correctOption">Correct Option</label>
                    <select
                        id="correctOption"
                        value={correctOption}
                        onChange={(e) => setCorrectOption(Number(e.target.value))}
                        style={inputStyle}
                    >
                        {options.map((_, index) => (
                            <option key={index} value={index}>{`Option ${index + 1}`}</option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        style={loading ? disabledButtonStyle : buttonStyle}
                        disabled={loading}
                    >
                        {loading ? 'Adding...' : 'Add Question'}
                    </button>
                </form>
                {successMsg && <div style={successMsgStyle}>{successMsg}</div>}
                {errorMsg && <div style={errorMsgStyle}>{errorMsg}</div>}
            </div>
        </>
    );
};

export default QuestionForm;

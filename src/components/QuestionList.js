import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuestionList = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axios.get('https://eduquest-backend-two.vercel.app/api/questions');
                setQuestions(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchQuestions();
    }, []);

    return (
        <ul>
            {questions.map((question) => (
                <li key={question._id}>
                    <p><strong>Question:</strong> {question.question}</p>
                    <p><strong>Author ID:</strong> {question.authorId}</p>
                    <p><strong>Options:</strong></p>
                    <ul>
                        {question.options.map((option, index) => (
                            <li key={index}>
                                {index + 1}. {option} {index === question.correctOption && '(Correct)'}
                            </li>
                        ))}
                    </ul>
                    <p><strong>Topic Tags:</strong> {question.topicTags.join(', ')}</p>
                </li>
            ))}
        </ul>
    );
};

export default QuestionList;

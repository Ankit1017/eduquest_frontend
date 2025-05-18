import React from 'react';
import { cardStyle, buttonStyle } from './styles';

const QuestionCard = ({
    questions,
    currentQuestion,
    setCurrentQuestion,
    userAnswers,
    handleAnswer,
    handlePrev,
    handleNext,
    handleSubmit,
    timerDisplay,
    submitting
}) => (
    <div style={{
        ...cardStyle,
        position: 'relative',
        minHeight: 320,
        boxShadow: '0 4px 18px rgba(25,118,210,0.09)'
    }}>
        <div style={{
            position: 'absolute',
            top: 10,
            right: 20,
            fontWeight: 600,
            color: timerDisplay.split(':')[0] < 1 ? '#d32f2f' : '#1976d2',
            fontSize: '1.1rem'
        }}>
            ⏰ {timerDisplay}
        </div>
        <div style={{ fontWeight: 600, marginBottom: 10 }}>
            Q{currentQuestion + 1} of {questions.length}
        </div>
        <div style={{ marginBottom: 16 }}>
            {questions[currentQuestion].question}
        </div>
        <ul style={{ listStyle: 'none', padding: 0 }}>
            {questions[currentQuestion].options.map((option, idx) => (
                <li key={idx} style={{ marginBottom: 10 }}>
                    <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        <input
                            type="radio"
                            name={questions[currentQuestion]._id}
                            value={idx}
                            checked={userAnswers[questions[currentQuestion]._id] === idx}
                            onChange={() => handleAnswer(idx)}
                            style={{ marginRight: 8 }}
                        />
                        {option}
                    </label>
                </li>
            ))}
        </ul>
        {/* Attempted scale */}
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
            margin: '24px 0 0 0',
            flexWrap: 'wrap'
        }}>
            {questions.map((q, idx) => (
                <button
                    key={q._id}
                    onClick={() => setCurrentQuestion(idx)}
                    style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        border: currentQuestion === idx ? '2px solid #1976d2' : '1px solid #bbb',
                        background: userAnswers[q._id] !== undefined ? '#1976d2' : '#fafbfc',
                        color: userAnswers[q._id] !== undefined ? '#fff' : '#888',
                        fontWeight: 600,
                        cursor: 'pointer',
                        outline: currentQuestion === idx ? '2px solid #1976d2' : 'none',
                        transition: 'all 0.15s',
                        margin: 2,
                        boxShadow: currentQuestion === idx ? '0 2px 8px rgba(25,118,210,0.08)' : 'none'
                    }}
                    aria-label={`Go to question ${idx + 1} (${userAnswers[q._id] !== undefined ? 'attempted' : 'not attempted'})`}
                >
                    {idx + 1}
                </button>
            ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
            <button
                onClick={handlePrev}
                disabled={currentQuestion === 0}
                style={{
                    ...buttonStyle,
                    background: currentQuestion === 0 ? '#b0bec5' : '#1976d2',
                    cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer'
                }}
            >
                Previous
            </button>
            {currentQuestion === questions.length - 1 ? (
                <button
                    onClick={handleSubmit}
                    style={buttonStyle}
                    disabled={submitting}
                >
                    {submitting ? 'Submitting...' : 'Submit'}
                </button>
            ) : (
                <button
                    onClick={handleNext}
                    style={buttonStyle}
                >
                    Next
                </button>
            )}
        </div>
    </div>
);

export default QuestionCard;

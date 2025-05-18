import React from 'react';
import Pagination from './Pagination';

const QuestionBreakdown = ({
    report,
    reviewMode,
    questionPage,
    setQuestionPage,
    QUESTIONS_PER_PAGE
}) => {
    const filteredQuestions = (report.questions || []).filter(
        q => !reviewMode || (!q.isCorrect && q.userAnswer !== undefined)
    );
    const totalQuestionPages = Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE);
    const visibleQuestions = filteredQuestions.slice(
        questionPage * QUESTIONS_PER_PAGE,
        (questionPage + 1) * QUESTIONS_PER_PAGE
    );

    return (
        <>
            <div style={{ margin: '24px 0 10px 0', fontWeight: 700, fontSize: '1.1rem', color: '#1976d2' }}>
                {reviewMode ? "Your Wrong Attempts" : "Per-Question Breakdown"}
            </div>
            <ul style={{ paddingLeft: 0, listStyle: 'none', margin: 0 }}>
                {visibleQuestions.map((q, idx) => (
                    <li key={q._id || idx} style={{
                        marginBottom: 20,
                        padding: '18px 18px 12px 18px',
                        borderRadius: 10,
                        background: q.isCorrect
                            ? 'rgba(67,160,71,0.08)'
                            : (q.userAnswer !== undefined ? 'rgba(229,57,53,0.07)' : '#f5f5f5'),
                        borderLeft: `5px solid ${q.isCorrect ? '#43a047' : (q.userAnswer !== undefined ? '#e53935' : '#bdbdbd')}`,
                        boxShadow: '0 1px 6px rgba(0,0,0,0.04)'
                    }}>
                        <div style={{
                            fontWeight: 600,
                            color: q.isCorrect ? '#43a047' : (q.userAnswer !== undefined ? '#e53935' : '#757575'),
                            marginBottom: 4
                        }}>
                            Q{questionPage * QUESTIONS_PER_PAGE + idx + 1}: {q.question}
                        </div>
                        <div style={{ marginLeft: 8, fontSize: '1rem' }}>
                            <div>
                                <b>Your Answer:</b>{" "}
                                {q.userAnswer !== undefined
                                    ? <span style={{
                                        color: q.isCorrect ? '#43a047' : '#e53935',
                                        fontWeight: 600
                                    }}>{q.options[q.userAnswer]}</span>
                                    : <span style={{ color: '#757575' }}>Unattempted</span>}
                            </div>
                            <div>
                                <b>Correct Answer:</b>{" "}
                                <span style={{ color: '#43a047', fontWeight: 600 }}>
                                    {q.options[q.correctOption]}
                                </span>
                            </div>
                            <div style={{ marginTop: 4 }}>
                                {q.isCorrect
                                    ? <span style={{
                                        background: '#43a047',
                                        color: '#fff',
                                        borderRadius: 6,
                                        padding: '2px 10px',
                                        fontWeight: 600,
                                        fontSize: '0.93em'
                                    }}>Correct</span>
                                    : q.userAnswer !== undefined
                                        ? <span style={{
                                            background: '#e53935',
                                            color: '#fff',
                                            borderRadius: 6,
                                            padding: '2px 10px',
                                            fontWeight: 600,
                                            fontSize: '0.93em'
                                        }}>Incorrect</span>
                                        : <span style={{
                                            background: '#bdbdbd',
                                            color: '#fff',
                                            borderRadius: 6,
                                            padding: '2px 10px',
                                            fontWeight: 600,
                                            fontSize: '0.93em'
                                        }}>Unattempted</span>
                                }
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {totalQuestionPages > 1 && (
                <Pagination
                    page={questionPage}
                    setPage={setQuestionPage}
                    totalPages={totalQuestionPages}
                />
            )}
        </>
    );
};

export default QuestionBreakdown;

import React, { useState } from 'react';
import { cardStyle, buttonStyle } from './styles';
import ScoreSummary from './report_manager/ScoreSummary';
import QuestionBreakdown from './report_manager/QuestionBreakdown';
import TopicMastery from './report_manager/TopicMastery';

const QUESTIONS_PER_PAGE = 5;
const TOPICS_PER_PAGE = 6;

const Report = ({
    report,
    reviewMode,
    setReviewMode,
    setReport,
    setQuestions,
    setUserAnswers,
    setCurrentQuestion,
}) => {
    const [questionPage, setQuestionPage] = useState(0);
    const [topicPage, setTopicPage] = useState(0);

    return (
        <div style={{ ...cardStyle, borderLeft: '5px solid #1976d2', marginTop: 32, boxShadow: '0 8px 32px rgba(25,118,210,0.10)', padding: '40px 32px', borderRadius: 18, background: '#fff' }}>
            <h2 style={{ color: '#1976d2', fontSize: '2rem', marginBottom: 14, letterSpacing: 1 }}>🎉 Test Report</h2>
            <ScoreSummary report={report} />
            <QuestionBreakdown
                report={report}
                reviewMode={reviewMode}
                questionPage={questionPage}
                setQuestionPage={setQuestionPage}
                QUESTIONS_PER_PAGE={QUESTIONS_PER_PAGE}
            />
            <TopicMastery
                report={report}
                topicPage={topicPage}
                setTopicPage={setTopicPage}
                TOPICS_PER_PAGE={TOPICS_PER_PAGE}
            />
            <div style={{ marginTop: 32 }}>
                <button
                    style={{ ...buttonStyle, marginRight: 10 }}
                    onClick={() => {
                        setReport(null);
                        setQuestions([]);
                        setUserAnswers({});
                        setCurrentQuestion(0);
                    }}
                >
                    Retake Test
                </button>
                <button
                    style={buttonStyle}
                    onClick={() => setReviewMode(r => !r)}
                >
                    {reviewMode ? "Show All Questions" : "Review Wrong Attempts"}
                </button>
            </div>
        </div>
    );
};

export default Report;

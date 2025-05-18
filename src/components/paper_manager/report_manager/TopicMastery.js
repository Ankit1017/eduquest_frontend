import React from 'react';
import Pagination from './Pagination';

const TopicMastery = ({
    report,
    topicPage,
    setTopicPage,
    TOPICS_PER_PAGE
}) => {
    const topicAccuracy = report.topicAccuracy || [];
    const totalTopicPages = Math.ceil(topicAccuracy.length / TOPICS_PER_PAGE);
    const visibleTopics = topicAccuracy.slice(
        topicPage * TOPICS_PER_PAGE,
        (topicPage + 1) * TOPICS_PER_PAGE
    );

    return (
        <>
            <div style={{ margin: '32px 0 10px 0', fontWeight: 700, fontSize: '1.1rem', color: '#1976d2' }}>
                Topic Mastery
            </div>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 24,
                minHeight: 220
            }}>
                {visibleTopics.length === 0 ? (
                    <div style={{ color: '#888' }}>No topic data available</div>
                ) : (
                    visibleTopics
                        .sort((a, b) => b.total - a.total)
                        .map(topic => {
                            const percent = topic.total > 0 ? (topic.correct / topic.total) * 100 : 0;
                            let barColor = '#43a047';
                            if (percent < 60) barColor = '#e53935';
                            else if (percent < 80) barColor = '#fbc02d';

                            return (
                                <div
                                    key={topic.name}
                                    style={{
                                        minWidth: 220,
                                        background: '#fafbfc',
                                        border: '1px solid #e0e0e0',
                                        borderRadius: 10,
                                        padding: 16,
                                        marginBottom: 8,
                                        flex: '1 1 220px',
                                        boxShadow: '0 1px 6px rgba(0,0,0,0.04)'
                                    }}
                                >
                                    <div style={{ fontWeight: 600, marginBottom: 6 }}>
                                        {topic.name}
                                        {percent >= 90 && (
                                            <span style={{
                                                marginLeft: 8,
                                                background: '#43a047',
                                                color: '#fff',
                                                borderRadius: 6,
                                                padding: '2px 8px',
                                                fontSize: '0.85em'
                                            }}>Excellent</span>
                                        )}
                                        {percent < 60 && (
                                            <span style={{
                                                marginLeft: 8,
                                                background: '#e53935',
                                                color: '#fff',
                                                borderRadius: 6,
                                                padding: '2px 8px',
                                                fontSize: '0.85em'
                                            }}>Needs Improvement</span>
                                        )}
                                    </div>
                                    <div style={{ marginBottom: 6 }}>
                                        <span style={{ fontWeight: 500 }}>
                                            {topic.correct}/{topic.total}
                                        </span>
                                        &nbsp;(
                                        <span style={{ color: barColor, fontWeight: 600 }}>
                                            {percent.toFixed(1)}%
                                        </span>
                                        )
                                    </div>
                                    <div style={{
                                        background: '#e0e0e0',
                                        borderRadius: 6,
                                        height: 12,
                                        overflow: 'hidden',
                                        marginBottom: 2
                                    }}>
                                        <div style={{
                                            width: `${percent}%`,
                                            height: '100%',
                                            background: barColor,
                                            transition: 'width 0.4s'
                                        }} />
                                    </div>
                                    <div style={{ fontSize: '0.9em', color: '#888' }}>
                                        {percent === 100 && 'Excellent!'}
                                        {percent >= 60 && percent < 100 && 'Good, but can improve.'}
                                        {percent < 60 && 'Needs improvement.'}
                                    </div>
                                </div>
                            );
                        })
                )}
            </div>
            {totalTopicPages > 1 && (
                <Pagination
                    page={topicPage}
                    setPage={setTopicPage}
                    totalPages={totalTopicPages}
                />
            )}
        </>
    );
};

export default TopicMastery;

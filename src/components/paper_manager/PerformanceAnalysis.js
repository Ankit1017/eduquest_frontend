import React, { useState } from 'react';

const ITEMS_PER_PAGE = 8;

const PerformanceAnalysis = ({ performance, sortOrder, setSortOrder, cardStyle }) => {
    const [page, setPage] = useState(0);

    // Sort topics
    const sortedTopics = (performance.topicAnalysis || []).sort((a, b) =>
        sortOrder === 'highToLow' ? b.accuracy - a.accuracy : a.accuracy - b.accuracy
    );

    // Paginate topics
    const totalPages = Math.ceil(sortedTopics.length / ITEMS_PER_PAGE);
    const visibleTopics = sortedTopics.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

    return (
        <div style={{ ...cardStyle, borderLeft: '5px solid #388e3c', paddingBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                <h2 style={{ color: '#388e3c', margin: 0, fontWeight: 700, fontSize: '1.5rem' }}>
                    📊 Performance Analysis
                </h2>
                <select
                    value={sortOrder}
                    onChange={e => setSortOrder(e.target.value)}
                    style={{
                        padding: '6px 12px',
                        borderRadius: 6,
                        border: '1px solid #bbb',
                        fontWeight: 500,
                        fontSize: '1rem',
                        marginLeft: 16,
                        background: '#f5f5f5'
                    }}
                    aria-label="Sort performance"
                >
                    <option value="highToLow">High Performance to Low</option>
                    <option value="lowToHigh">Low Performance to High</option>
                </select>
            </div>
            {visibleTopics.length === 0 ? (
                <div style={{ color: '#888', padding: 16 }}>No performance data available.</div>
            ) : (
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 20,
                    maxHeight: 540, // 8 cards * ~65px each, adjust as needed
                    overflowY: 'auto',
                    minHeight: 220
                }}>
                    {visibleTopics.map((topic) => {
                        const percent = topic.accuracy;
                        let barColor = '#43a047'; // green
                        if (percent < 60) barColor = '#e53935'; // red
                        else if (percent < 80) barColor = '#fbc02d'; // yellow

                        return (
                            <div
                                key={topic.topic}
                                style={{
                                    minWidth: 220,
                                    background: '#fafbfc',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: 10,
                                    padding: 16,
                                    flex: '1 1 220px',
                                    boxShadow: '0 1px 6px rgba(0,0,0,0.04)'
                                }}
                            >
                                <div style={{ fontWeight: 600, marginBottom: 6, fontSize: '1.08rem' }}>
                                    {topic.topic}
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
                            </div>
                        );
                    })}
                </div>
            )}
            {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18, gap: 12 }}>
                    <button
                        onClick={() => setPage(p => Math.max(p - 1, 0))}
                        disabled={page === 0}
                        style={{
                            padding: '6px 16px',
                            borderRadius: 6,
                            border: '1px solid #bbb',
                            background: page === 0 ? '#e0e0e0' : '#fafbfc',
                            cursor: page === 0 ? 'not-allowed' : 'pointer',
                            fontWeight: 600
                        }}
                    >Previous</button>
                    <span style={{ alignSelf: 'center', fontWeight: 600 }}>
                        Page {page + 1} of {totalPages}
                    </span>
                    <button
                        onClick={() => setPage(p => Math.min(p + 1, totalPages - 1))}
                        disabled={page === totalPages - 1}
                        style={{
                            padding: '6px 16px',
                            borderRadius: 6,
                            border: '1px solid #bbb',
                            background: page === totalPages - 1 ? '#e0e0e0' : '#fafbfc',
                            cursor: page === totalPages - 1 ? 'not-allowed' : 'pointer',
                            fontWeight: 600
                        }}
                    >Next</button>
                </div>
            )}
        </div>
    );
};

export default PerformanceAnalysis;

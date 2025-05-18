import React from 'react';
import { Chart } from "react-google-charts";

const ScoreSummary = ({ report }) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', marginBottom: 30 }}>
        <div style={{ flex: '1 1 220px', minWidth: 220 }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 6 }}>
                <span style={{ color: '#1976d2' }}>Score:</span> {report.score} / {report.total}
                <span style={{
                    marginLeft: 10,
                    color: report.score / report.total >= 0.7 ? '#43a047' : '#e53935',
                    fontWeight: 700,
                    fontSize: '1.1rem'
                }}>
                    ({((report.score / report.total) * 100).toFixed(1)}%)
                </span>
            </div>
            <div style={{ margin: '8px 0', fontSize: '1.05rem' }}>
                <b>Total Time Taken:</b> {report.timeTaken ? `${Math.floor(report.timeTaken/60)}m ${report.timeTaken%60}s` : 'N/A'}
            </div>
            <div style={{ margin: '8px 0', fontSize: '1.05rem' }}>
                <b>Avg. Time per Question:</b> {report.avgTimePerQ ? `${report.avgTimePerQ.toFixed(1)}s` : 'N/A'}
            </div>
        </div>
        <div style={{ flex: '1 1 320px', minWidth: 280, textAlign: 'center' }}>
            <div style={{ fontWeight: 600, marginBottom: 8, fontSize: '1.1rem' }}>Your Performance</div>
            <Chart
                chartType="PieChart"
                data={[
                    ['Status', 'Count'],
                    ['Correct', report.score],
                    ['Incorrect', report.total - report.score - (report.unattempted || 0)],
                    ['Unattempted', report.unattempted || 0]
                ]}
                options={{
                    pieHole: 0.45,
                    slices: {
                        0: { color: '#43a047' },
                        1: { color: '#e53935' },
                        2: { color: '#bdbdbd' }
                    },
                    legend: { position: 'bottom' },
                    chartArea: { width: '90%', height: '80%' },
                    fontName: 'inherit',
                }}
                width={'100%'}
                height={'220px'}
            />
        </div>
    </div>
);

export default ScoreSummary;

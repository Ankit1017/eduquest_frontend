import React from 'react';

const Pagination = ({ page, setPage, totalPages }) => (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 14, gap: 12 }}>
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
);

export default Pagination;

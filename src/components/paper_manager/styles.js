export const chipStyle = (selected) => ({
    display: 'inline-block',
    padding: '2px 10px',
    margin: '3px 5px 3px 0',
    borderRadius: '12px',
    border: selected ? '2px solid #1976d2' : '1px solid #ccc',
    background: selected ? '#e3f2fd' : '#fafbfc',
    color: selected ? '#1976d2' : '#222',
    cursor: 'pointer',
    fontWeight: selected ? 600 : 400,
    fontSize: '0.96rem',
    lineHeight: 1.3,
    transition: 'all 0.18s',
    boxShadow: selected ? '0 1px 3px rgba(25, 118, 210, 0.07)' : 'none',
    userSelect: 'none',
    whiteSpace: 'nowrap'
});

export const cardStyle = {
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.09)',
    padding: '36px 40px',
    margin: '30px 0',
    maxWidth: '1100px',
    minHeight: '520px',
    width: '90vw',
    boxSizing: 'border-box',
    transition: 'max-width 0.2s, min-height 0.2s'
};

export const buttonStyle = {
    background: '#1976d2',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 22px',
    fontWeight: 600,
    fontSize: '1rem',
    cursor: 'pointer',
    margin: '20px 0 0 0',
    transition: 'background 0.2s'
};

export const disabledButtonStyle = {
    ...buttonStyle,
    background: '#b0bec5',
    cursor: 'not-allowed'
};

export const tagSelectorContainer = {
    maxHeight: '120px',
    overflowY: 'auto',
    border: '1px solid #eee',
    borderRadius: '8px',
    padding: '10px',
    background: '#fafbfc'
};

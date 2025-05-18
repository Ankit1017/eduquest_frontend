import React from 'react';

// Inline styles for modern look
const overlayStyle = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  background: 'rgba(30,40,60,0.22)',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflowY: 'auto'
};

const modalStyle = {
  background: '#fff',
  borderRadius: '18px',
  boxShadow: '0 6px 24px rgba(25, 118, 210, 0.13)',
  padding: '32px 24px 24px 24px',
  maxWidth: '1100px',
  width: '98vw',
  margin: '40px 0',
  position: 'relative'
};

const closeBtnStyle = {
  position: 'absolute',
  top: 18,
  right: 24,
  background: '#e3e3e3',
  border: 'none',
  borderRadius: '50%',
  width: 36,
  height: 36,
  fontSize: 20,
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'background 0.2s'
};

const flexContainer = {
  display: 'flex',
  gap: '36px',
  justifyContent: 'space-between',
  flexWrap: 'wrap'
};

const columnStyle = {
  flex: 1,
  minWidth: 340,
  maxWidth: 480,
  background: '#f7fafd',
  borderRadius: '12px',
  padding: '18px 14px',
  margin: '12px 0',
  boxShadow: '0 2px 8px rgba(25,118,210,0.06)',
  overflowY: 'auto',
  maxHeight: '70vh'
};

const cardStyle = {
  background: '#fff',
  borderRadius: '10px',
  boxShadow: '0 1px 8px rgba(25,118,210,0.04)',
  margin: '18px 0',
  padding: '16px 14px'
};

const qTitleStyle = { fontWeight: 600, marginBottom: 6, color: '#1976d2' };
const tagStyle = {
  display: 'inline-block',
  padding: '3px 10px',
  background: '#e3f2fd',
  color: '#1976d2',
  borderRadius: '12px',
  fontSize: '0.95em',
  margin: '2px 8px 2px 0'
};

const optionListStyle = { listStyle: 'none', padding: 0, margin: '8px 0' };
const optionItemStyle = {
  padding: '7px 12px',
  borderRadius: '7px',
  margin: '3px 0',
  display: 'flex',
  alignItems: 'center',
  fontWeight: 500,
  transition: 'background 0.2s'
};

const correctStyle = {
  ...optionItemStyle,
  background: '#e8f5e9',
  color: '#388e3c',
  border: '1px solid #66bb6a'
};
const incorrectStyle = {
  ...optionItemStyle,
  background: '#ffebee',
  color: '#d32f2f',
  border: '1px solid #ef9a9a'
};

const IndividualTopicAnalysis = ({
  setHasIndividualTopicData,
  correctAnswers,
  incorrectAnswers,
  indiTopic
}) => {
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <button
          style={closeBtnStyle}
          title="Close"
          onClick={() => setHasIndividualTopicData(false)}
        >
          ×
        </button>
        <h2 style={{ textAlign: 'center', color: '#1976d2', marginBottom: 30 }}>
          Topic Analysis - {indiTopic}
        </h2>
        <div style={flexContainer}>
          {/* Correct Answers */}
          <div style={columnStyle}>
            <h3 style={{ textAlign: 'center', color: '#388e3c' }}>
              ✅ Correct Answers ({correctAnswers.length})
            </h3>
            {correctAnswers.length === 0 && (
              <p style={{ textAlign: 'center', color: '#888', marginTop: 30 }}>No correct answers for this topic.</p>
            )}
            <div>
              {correctAnswers.map((item, indx) => (
                <div style={cardStyle} key={indx}>
                  <div style={qTitleStyle}>Q: {item.questionId.question}</div>
                  <div style={{ fontSize: '0.98em', marginBottom: 5 }}>
                    <span style={{ color: '#888' }}>Author:</span> {item.questionId.authorId}
                  </div>
                  <div style={{ fontSize: '0.98em', marginBottom: 5 }}>
                    <span style={{ color: '#888' }}>Correct Option:</span> {item.questionId.correctOption + 1}
                  </div>
                  <div style={{ fontSize: '0.98em', marginBottom: 5, color: '#888' }}>All Options:</div>
                  <ul style={optionListStyle}>
                    {item.questionId.options.map((opt, indx2) => (
                      <li
                        key={indx2}
                        style={indx2 === item.questionId.correctOption ? correctStyle : optionItemStyle}
                      >
                        {indx2 === item.questionId.correctOption ? '✔️ ' : ''}
                        {opt}
                      </li>
                    ))}
                  </ul>
                  <div style={{ fontSize: '0.98em', marginBottom: 5, color: '#888' }}>Topics:</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {item.topics.map((tag, indx2) => (
                      <li style={tagStyle} key={indx2}>{tag}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          {/* Incorrect Answers */}
          <div style={columnStyle}>
            <h3 style={{ textAlign: 'center', color: '#d32f2f' }}>
              ❌ Incorrect Answers ({incorrectAnswers.length})
            </h3>
            {incorrectAnswers.length === 0 && (
              <p style={{ textAlign: 'center', color: '#888', marginTop: 30 }}>No incorrect answers for this topic.</p>
            )}
            <div>
              {incorrectAnswers.map((item, indx) => (
                <div style={cardStyle} key={indx}>
                  <div style={qTitleStyle}>Q: {item.questionId.question}</div>
                  <div style={{ fontSize: '0.98em', marginBottom: 5 }}>
                    <span style={{ color: '#888' }}>Author:</span> {item.questionId.authorId}
                  </div>
                  <div style={{ fontSize: '0.98em', marginBottom: 5 }}>
                    <span style={{ color: '#888' }}>Correct Option:</span> {item.questionId.correctOption + 1}
                  </div>
                  <div style={{ fontSize: '0.98em', marginBottom: 5 }}>
                    <span style={{ color: '#888' }}>Your Selection:</span> {item.selectedOption + 1}
                  </div>
                  <div style={{ fontSize: '0.98em', marginBottom: 5, color: '#888' }}>All Options:</div>
                  <ul style={optionListStyle}>
                    {item.questionId.options.map((opt, indx2) => (
                      <li
                        key={indx2}
                        style={
                          indx2 === item.questionId.correctOption
                            ? correctStyle
                            : indx2 === item.selectedOption
                            ? incorrectStyle
                            : optionItemStyle
                        }
                      >
                        {indx2 === item.questionId.correctOption
                          ? '✔️ '
                          : indx2 === item.selectedOption
                          ? '❌ '
                          : ''}
                        {opt}
                      </li>
                    ))}
                  </ul>
                  <div style={{ fontSize: '0.98em', marginBottom: 5, color: '#888' }}>Topics:</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {item.topics.map((tag, indx2) => (
                      <li style={tagStyle} key={indx2}>{tag}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualTopicAnalysis;

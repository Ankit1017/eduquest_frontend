import React from 'react';
import { chipStyle, tagSelectorContainer, buttonStyle, disabledButtonStyle } from './styles';

const TagSelector = ({
    availableTags,
    selectedTags,
    onTagChange,
    search,
    setSearch,
    loadingQuestions,
    handleFetchQuestions,
    questions,
    timer,
    setTimer,
    handleStartTest
}) => {
    const filteredTags = availableTags
        .filter(tag => tag.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 12);

    return (
        <section style={{ marginBottom: 24 }}>
            <h3 style={{ marginBottom: 8 }}>Select Tags:</h3>
            <input
                type="text"
                placeholder="Search tags..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                    width: '100%',
                    padding: '7px 10px',
                    marginBottom: '8px',
                    borderRadius: '6px',
                    border: '1px solid #ccc'
                }}
            />
            <div style={tagSelectorContainer}>
                {filteredTags.map((tag) => (
                    <span
                        key={tag}
                        style={chipStyle(selectedTags.includes(tag))}
                        onClick={() => onTagChange(tag)}
                        tabIndex={0}
                        onKeyPress={e => (e.key === 'Enter' || e.key === ' ') && onTagChange(tag)}
                        role="button"
                        aria-pressed={selectedTags.includes(tag)}
                    >
                        {tag}
                    </span>
                ))}
                {filteredTags.length === 0 && (
                    <span style={{ color: '#bbb' }}>No tags found</span>
                )}
            </div>
            <button
                style={selectedTags.length === 0 || loadingQuestions ? disabledButtonStyle : buttonStyle}
                onClick={handleFetchQuestions}
                disabled={selectedTags.length === 0 || loadingQuestions}
            >
                {loadingQuestions ? 'Fetching...' : 'Fetch Questions'}
            </button>
            {questions.length > 0 && (
                <div style={{ marginTop: 24 }}>
                    <label>
                        Set Timer (minutes):&nbsp;
                        <input
                            type="number"
                            min={1}
                            max={180}
                            defaultValue={Math.ceil(questions.length * 1.5)}
                            style={{
                                width: '60px',
                                padding: '4px',
                                borderRadius: '4px',
                                border: '1px solid #ccc'
                            }}
                            onChange={e => setTimer(Number(e.target.value) * 60)}
                        />
                    </label>
                    <button
                        style={{ ...buttonStyle, marginLeft: 12 }}
                        onClick={() => handleStartTest(timer ? timer / 60 : Math.ceil(questions.length * 1.5))}
                    >
                        Start Test
                    </button>
                </div>
            )}
        </section>
    );
};

export default TagSelector;

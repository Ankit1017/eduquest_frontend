import React, { useContext, useRef, useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import Slider from "react-slick";
import { AuthContext } from '../context/AuthContext';

const cardStyle = {
  background: '#fff',
  borderRadius: '14px',
  boxShadow: '0 2px 16px rgba(0,0,0,0.09)',
  padding: '22px 18px 18px 18px',
  margin: '10px',
  width: '320px',
  minHeight: '380px',
  cursor: 'pointer',
  transition: 'box-shadow 0.2s, transform 0.2s',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

const labelStyle = {
  fontWeight: 600,
  color: '#333',
  marginTop: 12
};

const valueStyle = {
  fontWeight: 500,
  color: '#555'
};

const titleStyle = {
  color: '#1976d2',
  textAlign: 'center',
  margin: '30px 0 18px 0',
  fontWeight: 700,
  fontSize: '2rem'
};

const sliderContainerStyle = {
  maxWidth: '1100px',
  margin: '0 auto 32px auto',
  overflowX: 'auto',
  whiteSpace: 'nowrap',
  paddingBottom: 12,
};

const sortSelectStyle = {
  position: 'absolute',
  right: '20px',
  top: '50%',
  transform: 'translateY(-50%)',
  padding: '6px 12px',
  borderRadius: '6px',
  border: '1px solid #1976d2',
  backgroundColor: 'white',
  color: '#1976d2',
  fontWeight: 500,
  cursor: 'pointer'
};

const PerformanceAnalysis = (props) => {
  const { handleCardClick, performance } = props;
  const { user } = useContext(AuthContext);
  const [sortOrder, setSortOrder] = useState('highToLow');
  const sliderRef = useRef(null);

  // Sort topics based on current sort order
  const sortedTopics = [...performance.topicAnalysis].sort((a, b) => {
    return sortOrder === 'highToLow'
      ? b.accuracy - a.accuracy
      : a.accuracy - b.accuracy;
  });

  const settings = {
    dots: false,
    arrows: false,
    infinite: sortedTopics.length > 3,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: false,
    adaptiveHeight: true,
    swipe: true,
    draggable: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 700,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  useEffect(() => {
    const sliderNode = sliderRef.current;
    if (!sliderNode) return;

    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        if (e.deltaX > 0) {
          sliderNode.slickNext();
        } else if (e.deltaX < 0) {
          sliderNode.slickPrev();
        }
      }
    };

    const parentDiv = sliderNode.innerSlider?.list;
    if (parentDiv) {
      parentDiv.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (parentDiv) {
        parentDiv.removeEventListener('wheel', handleWheel);
      }
    };
  }, [sortedTopics.length]);

  return (
    <>
      <div style={{ position: 'relative' }}>
        <h2 style={titleStyle}>📊 Performance Analysis</h2>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={sortSelectStyle}
          aria-label="Sort performance by accuracy"
        >
          <option value="highToLow">High → Low Performance</option>
          <option value="lowToHigh">Low → High Performance</option>
        </select>
      </div>

      <div style={sliderContainerStyle}>
        <Slider ref={sliderRef} {...settings}>
          {sortedTopics.map((topic, indx) => (
            <div key={indx}>
              <div
                style={cardStyle}
                onClick={() => handleCardClick(topic.topic, user._id)}
                tabIndex={0}
                aria-label={`View details for ${topic.topic}`}
              >
                <Chart
                  chartType="PieChart"
                  data={[
                    ["AnswerStatus", "Total"],
                    ["Correct", topic.correct],
                    ["Incorrect", topic.total - topic.correct]
                  ]}
                  options={{
                    pieHole: 0.5,
                    slices: {
                      0: { color: '#43a047' },
                      1: { color: '#e53935' }
                    },
                    legend: {
                      position: 'bottom',
                      textStyle: { fontSize: 14 }
                    },
                    chartArea: { width: '90%', height: '80%' },
                    tooltip: { trigger: 'focus' }
                  }}
                  width={"100%"}
                  height={"180px"}
                />
                <div style={labelStyle}>Topic:</div>
                <div style={valueStyle}>{topic.topic}</div>
                <div style={labelStyle}>Accuracy:</div>
                <div style={valueStyle}>{(topic.accuracy).toFixed(2)}%</div>
                <div style={labelStyle}>Correct Answers:</div>
                <div style={valueStyle}>{topic.correct}</div>
                <div style={labelStyle}>Total Answers:</div>
                <div style={valueStyle}>{topic.total}</div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default PerformanceAnalysis;

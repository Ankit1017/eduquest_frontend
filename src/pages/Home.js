import React, { useState, useContext, useEffect } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import axios from 'axios';
import PerformanceAnalysis from '../components/PerformanceAnalysis';
import IndividualTopicAnalysis from '../components/IndividualTopicAnalysis';
import { CircularProgress, Grid, Paper, Typography, Button, Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AssessmentIcon from '@mui/icons-material/Assessment';
import QuizIcon from '@mui/icons-material/Quiz';

const heroStyle = {
  textAlign: 'center',
  margin: '40px 0',
  color: '#1976d2',
  fontWeight: 700,
  fontSize: '2.4rem',
  letterSpacing: '-0.5px',
  lineHeight: 1.2
};

const featureCards = [
  {
    icon: <SchoolIcon sx={{ fontSize: 50, color: '#1976d2' }} />,
    title: "Comprehensive Question Bank",
    text: "Access thousands of questions across various subjects and difficulty levels."
  },
  {
    icon: <AssessmentIcon sx={{ fontSize: 50, color: '#1976d2' }} />,
    title: "Detailed Analytics",
    text: "Track your progress with personalized performance reports and insights."
  },
  {
    icon: <QuizIcon sx={{ fontSize: 50, color: '#1976d2' }} />,
    title: "Smart Practice",
    text: "Get tailored recommendations based on your weak areas."
  }
];

const Home = () => {
  const { user } = useContext(AuthContext);
  const [showRegister, setShowRegister] = useState(false);
  const [performance, setPerformance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasIndividualTopicData, setHasIndividualTopicData] = useState(false);
  const [indiTopic, setIndiTopic] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);

  useEffect(() => {
    if (user) {
      setLoading(true);
      const fetchPerformance = async () => {
        try {
          const response = await axios.get(`https://eduquest-backend-two.vercel.app/api/user-performance/${user._id}`);
          setPerformance(response.data);
        } catch (err) {
          console.error('Performance fetch error:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchPerformance();
    }
  }, [user]);

  const handleCardClick = async (topic, user_id) => {
    try {
      const { data } = await axios.get(`https://eduquest-backend-two.vercel.app/api/user-performance/${user._id}/${topic}`);
      const correct = data.data.filter(item => item.isCorrect);
      const incorrect = data.data.filter(item => !item.isCorrect);

      setHasIndividualTopicData(true);
      setIndiTopic(topic);
      setCorrectAnswers(correct);
      setIncorrectAnswers(incorrect);
    } catch (err) {
      console.error('Topic analysis error:', err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Navbar />

      {user ? (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
          <Typography variant="h3" component="h1" sx={heroStyle}>
            Welcome Back, {user?.name?.split(' ')[0] ?? 'User'}!
          </Typography>


          {loading ? (
            <Box textAlign="center" mt={6}>
              <CircularProgress size={60} thickness={4} />
              <Typography variant="h6" mt={2} color="textSecondary">
                Analyzing Your Performance...
              </Typography>
            </Box>
          ) : (
            performance?.topicAnalysis?.length > 0 ? (
              <>
                <PerformanceAnalysis
                  handleCardClick={handleCardClick}
                  performance={performance}
                />
                {hasIndividualTopicData && (
                  <IndividualTopicAnalysis
                    setHasIndividualTopicData={setHasIndividualTopicData}
                    correctAnswers={correctAnswers}
                    incorrectAnswers={incorrectAnswers}
                    indiTopic={indiTopic}
                  />
                )}
              </>
            ) : (
              <div style={{ marginTop: 40 }}>
                <Typography variant="h5" align="center" gutterBottom>
                  Get Started with QuizMaster
                </Typography>
                <Grid container spacing={4} sx={{ mt: 2, mb: 6 }}>
                  {featureCards.map((card, index) => (
                    <Grid item xs={12} md={4} key={index}>
                      <Paper elevation={3} sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                        {card.icon}
                        <Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
                          {card.title}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                          {card.text}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
                <Box textAlign="center" mt={4}>
                  <Button
                    variant="contained"
                    size="large"
                    href="/practice"
                    sx={{ px: 6, py: 1.5, fontSize: '1.1rem' }}
                  >
                    Start Practicing Now
                  </Button>
                </Box>
              </div>
            )
          )}
        </div>
      ) : (
        <div style={{
          maxWidth: 500,
          margin: '40px auto',
          padding: '0 20px',
          transition: 'all 0.3s ease'
        }}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600 }}>
              {showRegister ? 'Create Account' : 'Welcome!'}
            </Typography>

            {showRegister ? <Register /> : <Login />}

            <Button
              fullWidth
              onClick={() => setShowRegister(!showRegister)}
              sx={{
                mt: 2,
                textTransform: 'none',
                color: '#1976d2',
                fontWeight: 500
              }}
            >
              {showRegister
                ? 'Already have an account? Sign In'
                : "Don't have an account? Create One"}
            </Button>
          </Paper>
        </div>
      )}
    </div>
  );
};

export default Home;

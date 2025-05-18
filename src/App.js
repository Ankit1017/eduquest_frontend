import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import AdminPanel from './pages/AdminPanel';
import Login from './components/Login';
import QuestionForm from './components/QuestionForm';
import QuestionPaperPage from './components/QuestionPaper';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Optional: Simple NotFound component for unmatched routes
const NotFound = () => (
  <div style={{
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#1976d2'
  }}>
    <h1 style={{ fontSize: '2.5rem', marginBottom: 10 }}>404</h1>
    <p style={{ fontSize: '1.2rem' }}>Page Not Found</p>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add-question' element={<QuestionForm />} />
        <Route path='/question-paper' element={<QuestionPaperPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<AdminPanel />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const logoutBtnStyle = {
  background: '#fff',
  color: '#1976d2',
  border: '1.5px solid #1976d2',
  borderRadius: '6px',
  padding: '6px 18px 6px 12px',
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  transition: 'background 0.18s, color 0.18s, border 0.18s',
  marginLeft: '6px'
};

const logoutBtnHover = {
  background: '#1976d2',
  color: '#fff',
  border: '1.5px solid #1565c0'
};

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [hover, setHover] = React.useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      navigate("/");
      logout();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      style={hover ? { ...logoutBtnStyle, ...logoutBtnHover } : logoutBtnStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label="Logout"
    >
      <span role="img" aria-label="logout" style={{ fontSize: '1.2em' }}>🚪</span>
      Logout
    </button>
  );
};

export default Logout;

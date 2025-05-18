import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Logout from './logout';

// You can swap this emoji for your logo or an SVG icon!
const appIcon = "📄";

const navStyle = {
  position: 'sticky',
  top: 0,
  zIndex: 999,
  background: '#1976d2',
  color: '#fff',
  padding: '0 24px',
  boxShadow: '0 2px 8px rgba(25, 118, 210, 0.07)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 60
};

const logoStyle = {
  display: 'flex',
  alignItems: 'center',
  fontWeight: 700,
  fontSize: '1.35rem',
  color: '#fff',
  textDecoration: 'none',
  gap: '10px'
};

const navLinksStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '18px'
};

const navLinkStyle = (active) => ({
  color: active ? '#fff' : '#bbdefb',
  textDecoration: 'none',
  fontWeight: active ? 700 : 500,
  fontSize: '1.08rem',
  padding: '6px 12px',
  borderRadius: '6px',
  background: active ? 'rgba(255,255,255,0.14)' : 'none',
  transition: 'background 0.18s, color 0.18s'
});

const userBoxStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  marginLeft: '28px'
};

const hamburgerStyle = {
  display: 'none',
  flexDirection: 'column',
  justifyContent: 'center',
  cursor: 'pointer',
  marginLeft: 18
};

const barStyle = {
  width: '26px',
  height: '3px',
  background: '#fff',
  margin: '4px 0',
  borderRadius: '2px'
};

const mobileMenuStyle = {
  position: 'fixed',
  top: 60,
  left: 0,
  width: '100vw',
  background: '#1976d2',
  boxShadow: '0 6px 24px rgba(25,118,210,0.13)',
  padding: '18px 0 8px 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  zIndex: 1000
};


// ...imports and other code remain unchanged

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = window.innerWidth < 800;

  const links = [
    { to: '/', label: 'Home', show: true },
    { to: '/question-paper', label: 'Question Paper', show: true },
    { to: '/add-question', label: 'Add Question', show: user?.isAdmin },
    { to: '/admin', label: 'Admin', show: user?.isAdmin }
  ];

  return (
    <nav style={navStyle}>
      <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        <Link to="/" style={logoStyle}>
          <span style={{ fontSize: '1.5em' }}>{appIcon}</span>
          <span>Question Paper App</span>
        </Link>
        {/* Spacer */}
        <div style={{ width: 40 }} /> {/* Adjust width as needed */}
        {/* Desktop Links */}
        {user && !isMobile && (
          <div style={navLinksStyle}>
            {links.filter(l => l.show).map(l => (
              <Link
                key={l.to}
                to={l.to}
                style={navLinkStyle(location.pathname === l.to)}
                tabIndex={0}
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
      {/* User info and mobile menu remain unchanged */}
      {user ? (
        <>
          {/* Hamburger for mobile */}
          <div
            style={{ ...hamburgerStyle, display: isMobile ? 'flex' : 'none' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            tabIndex={0}
          >
            <div style={barStyle}></div>
            <div style={barStyle}></div>
            <div style={barStyle}></div>
          </div>
          {/* User info (desktop) */}
          {!isMobile && (
            <div style={userBoxStyle}>
              <span style={{ fontWeight: 600, fontSize: '1.08em', letterSpacing: 0.3 }}>{user.username}</span>
              <Logout />
            </div>
          )}
          {/* Mobile Menu */}
          {menuOpen && isMobile && (
            <div style={mobileMenuStyle} onClick={() => setMenuOpen(false)}>
              {links.filter(l => l.show).map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  style={navLinkStyle(location.pathname === l.to)}
                  tabIndex={0}
                >
                  {l.label}
                </Link>
              ))}
              <div style={{ ...userBoxStyle, margin: '12px 0 0 0', justifyContent: 'flex-start' }}>
                <span style={{ fontWeight: 600 }}>{user.username}</span>
                <Logout />
              </div>
            </div>
          )}
        </>
      ) : (
        <span style={{ fontWeight: 500, fontSize: '1.1em', marginLeft: 18 }}>Login/Register first.</span>
      )}
    </nav>
  );
};

export default Navbar;

import React from 'react';

const ContactPill = ({ href, children, ...props }) => {
  const style = {
    backgroundColor: 'var(--essenza-gold)',
    color: 'var(--essenza-black)',
    border: '1px solid var(--essenza-gold)',
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    textDecoration: 'none',
    padding: '0.5rem 1.5rem',
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: '50rem',
    transition: 'all 0.2s ease'
  };

  const hoverStyle = {
    backgroundColor: '#f2e8d1',
    borderColor: '#f2e8d1',
    color: 'var(--essenza-black)'
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={style}
      onMouseEnter={(e) => Object.assign(e.target.style, hoverStyle)}
      onMouseLeave={(e) => Object.assign(e.target.style, style)}
      {...props}
    >
      {children}
    </a>
  );
};

export default ContactPill;
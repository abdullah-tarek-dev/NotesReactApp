import React from 'react';
import '../styles/Card.css';

const Card = ({ title, content ,date , className = '' }) => {
const formattedDate = new Date(date).toLocaleString('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
});

  
  return (
    <div className={`note-card ${className}`}>
      <h3>{title}</h3>
      <p>{content}</p>
            <small className="note-date">Created on: {formattedDate}</small>
    </div>
  );
};

export default Card;

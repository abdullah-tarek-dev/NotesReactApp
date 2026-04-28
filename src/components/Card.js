import React from 'react';
import '../styles/Card.css';

const Card = ({ title, content, date, pinned, className = '' }) => {
  const formattedDate = new Date(date).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={`note-card ${className}`}>
      <div className="card-header">
        <h3>{title}</h3>
        {pinned && <span className="pin-badge">📌</span>}
      </div>
      <p>{content}</p>
      <small className="note-date">Created on: {formattedDate}</small>
    </div>
  );
};

export default Card;
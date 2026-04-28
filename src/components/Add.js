import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Add.css';

const Add = ({ notes, setNotes }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setFeedback('error');
      setTimeout(() => setFeedback(''), 2000);
      return;
    }

    setIsSubmitting(true);

    const newNote = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      pinned: false,
      date: new Date().toISOString(),
    };

    setNotes((prev) => [...prev, newNote]);
    setFeedback('success');

    setTimeout(() => {
      navigate('/');
    }, 800);
  };

  return (
    <div className="add_container">
      <div className="add_header">
        <button className="back_btn" onClick={() => navigate('/')}>
          ← Back
        </button>
        <h2>New Note</h2>
        <span className="subtitle">Capture your thoughts</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="field_group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="What's this note about?"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            maxLength={80}
          />
          <span className="char_hint">{title.length}/80</span>
        </div>

        <div className="field_group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            placeholder="Write your thoughts here..."
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
          <span className="char_hint">{content.length} characters</span>
        </div>

        {feedback === 'error' && (
          <p className="feedback_msg error_msg">⚠ Please fill in both fields.</p>
        )}
        {feedback === 'success' && (
          <p className="feedback_msg success_msg">✓ Note saved! Redirecting...</p>
        )}

        <button type="submit" disabled={isSubmitting} className="submit_btn">
          {isSubmitting ? 'Saving...' : '+ Add Note'}
        </button>
      </form>
    </div>
  );
};

export default Add;
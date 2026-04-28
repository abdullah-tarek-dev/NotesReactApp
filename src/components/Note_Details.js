import React, { useState, useEffect } from 'react';
import '../styles/Note_Details.css';
import { faPen, faTrash, faThumbtack, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NoteModal = ({ note, onClose, onEdit, onDelete, onPin }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    if (note) {
      setEditedTitle(note.title);
      setEditedContent(note.content);
      setIsEditing(false);
    }
  }, [note]);

  if (!note) return null;

  const handleSave = () => {
    if (!editedTitle.trim() || !editedContent.trim()) return;
    onEdit({ ...note, title: editedTitle.trim(), content: editedContent.trim() });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(note.title);
    setEditedContent(note.content);
    setIsEditing(false);
  };

  const formattedDate = new Date(note.date).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        <button className="modal-close-btn" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {note.pinned && <span className="modal-pin-badge">📌 Pinned</span>}

        {isEditing ? (
          <>
            <input
              className="title_input"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Title"
            />
            <textarea
              className="content_input"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              placeholder="Content"
            />
            <div className="modal-actions">
              <button className="btn-save" onClick={handleSave}>Save</button>
              <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <h2 className="title_details">{note.title}</h2>
            <p className="content_details">{note.content}</p>
            <small className="modal-date">Created: {formattedDate}</small>

            <div className="modal-actions">
              <button className="btn-icon" title="Edit" onClick={() => setIsEditing(true)}>
                <FontAwesomeIcon icon={faPen} />
              </button>
              <button className="btn-icon btn-delete" title="Delete" onClick={() => onDelete(note.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button
                className={`btn-icon ${note.pinned ? 'btn-pinned' : ''}`}
                title={note.pinned ? 'Unpin' : 'Pin'}
                onClick={() => onPin(note.id)}
              >
                <FontAwesomeIcon icon={faThumbtack} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NoteModal;
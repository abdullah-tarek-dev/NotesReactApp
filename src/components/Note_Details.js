import React, { useState, useEffect } from 'react';
import '../styles/Note_Details.css';
import { faPen, faTrash, faThumbtack } from '@fortawesome/free-solid-svg-icons';
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
    const updatedNote = {
      ...note,
      title: editedTitle,
      content: editedContent
    };
    onEdit(updatedNote);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(note.title);
    setEditedContent(note.content);
    setIsEditing(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {isEditing ? (
          <>
            <input
              className="title_input"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
              className="content_input"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <h2 className="title_details">{note.title}</h2>
            <p className="content_details">{note.content}</p>
            <div className="modal-actions">
              <button onClick={() => setIsEditing(true)}>
                <FontAwesomeIcon icon={faPen} />
              </button>
              <button onClick={() => onDelete(note.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button onClick={() => onPin(note.id)}>
                <FontAwesomeIcon icon={faThumbtack} />
              </button>
            </div>
                    <button className="close-button" onClick={onClose}>Close</button>
          </>
        )}

      </div>
    </div>
  );
};

export default NoteModal;

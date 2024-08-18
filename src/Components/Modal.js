import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const CustomModal = ({ show, handleClose, title, label, buttonText, onSubmit, initialData, isEditing }) => {
  const [documentLabel, setDocumentLabel] = useState('');
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    if (initialData) {
      setDocumentLabel(initialData.fileDescription);
      setFileName(initialData.fileName);
    } else {
      setDocumentLabel('');
      setFileName('');
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (documentLabel.trim() === '') {
      alert('Please fill in the file description');
      return;
    }
    if (!isEditing && fileName.trim() === '') {
      alert('Please select a file');
      return;
    }
    onSubmit(documentLabel, fileName);
    handleClose();
  };

  const handleFileChange = (e) => {
    if (!isEditing) {
      setFileName(e.target.files[0]?.name || '');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label className="form-label">{label}</label>
          <input
            type="text"
            className="form-control"
            value={documentLabel}
            onChange={(e) => setDocumentLabel(e.target.value)}
          />
        </div>
        {!isEditing &&
        <div className="mb-3">
          <label className="form-label">File Upload</label>
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
            disabled={isEditing}
          />
        </div>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {buttonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;

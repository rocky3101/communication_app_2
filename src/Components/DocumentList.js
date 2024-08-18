// DocumentList.js
import React, { useState, useEffect } from 'react';
import CustomModal from './Modal';
import { Table, Button } from 'react-bootstrap';
import Nav from "./Nav";
import useAuth from '../scripts/useAuth';

const DocumentList = () => {
  useAuth();
  const [documents, setDocuments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDoc, setCurrentDoc] = useState(null);

  useEffect(() => {
    const storedDocuments = localStorage.getItem('documents')
      ? JSON.parse(localStorage.getItem('documents'))
      : [];
    setDocuments(storedDocuments);
  }, []);

  const handleAdd = () => {
    setCurrentDoc(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = (doc) => {
    setCurrentDoc(doc);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this document?');
    if (confirmed) {
      const updatedDocuments = documents.filter((doc) => doc.id !== id);
      setDocuments(updatedDocuments);
      localStorage.setItem('documents', JSON.stringify(updatedDocuments));
    }
  };

  const handleSave = (fileDescription, fileName) => {
    if (isEditing && currentDoc) {
      const updatedDocuments = documents.map((doc) =>
        doc.id === currentDoc.id ? { ...doc, fileDescription } : doc
      );
      setDocuments(updatedDocuments);
      localStorage.setItem('documents', JSON.stringify(updatedDocuments));
    } else {
      const newDocument = {
        id: Number(new Date()),
        fileName,
        fileDescription,
      };
      const updatedDocuments = [...documents, newDocument];
      setDocuments(updatedDocuments);
      localStorage.setItem('documents', JSON.stringify(updatedDocuments));
    }
  };

  return (
    <>
      <Nav />
      <div className="container documentlist-container">
        <div className="documentlist-header d-flex flex-row justify-content-between">
          <h3>My Uploads</h3>
          <Button variant="primary" onClick={handleAdd}>
            + Add Upload
          </Button>
        </div>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Label</th>
              <th>File Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.fileDescription}</td>
                <td>{doc.fileName}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEdit(doc)}>
                    Edit
                  </Button>{' '}
                  <Button variant="danger" onClick={() => handleDelete(doc.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <CustomModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          title={isEditing ? 'Edit Document' : 'Add Document'}
          label="Document Label"
          buttonText={isEditing ? 'Save' : 'Upload Now'}
          onSubmit={handleSave}
          initialData={isEditing ? currentDoc : null}
          isEditing={isEditing}
        />
      </div>
    </>
  );
};

export default DocumentList;

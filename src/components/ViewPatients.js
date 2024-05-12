
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../styles/patients.css'

const ViewPatients = ({ show, handleClose, patient }) => {
  return (
    <Modal  className='modalview' show={show} onHide={handleClose}>
      <Modal.Header  className='modalhead' closeButton>
        <Modal.Title>Patient Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className='modal-body'>
        <div><p>Name:</p> {patient.name}</div>
        <div ><p>Email:</p> {patient.email}</div>
        <div><p>Phone:</p> {patient.phone}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewPatients;

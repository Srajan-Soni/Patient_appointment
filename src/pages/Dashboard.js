import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/dashboard.css';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ViewPatients from '../components/ViewPatients';

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPatients, setFilteredPAtients] = useState([]);

  const [show, setShow] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [paymentLink, setpaymentLink] = useState('')

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
  };

  const handleClose = () => {
    setShow(false);
    setFormData({ name: '', email: '', phone: '' }); 
  };


  const handleShow = () => setShow(true);

  const location = useLocation();
  // const userData = location.state && location.state.data;
  const userData = JSON.parse(localStorage.getItem('userdata'));
  console.log(userData);
  const { fullname, id } = userData || {};

  useEffect(() => {
    if (!userData) {
      navigate('/');
    } else {
      fetchPatients();
    }
  }, []);

  const redirectToPaymentPage = () => {
    window.location.href = paymentLink;
  };

  const fetchPaymentLink = async ({ payid }) => {
    try {
      const response = await axios.get(`http://localhost:8000/payment-link?id=${payid}`);
      const link = response.data.payment_link;
      setpaymentLink(link);
      if (paymentLink !== '') {
        window.location.href = paymentLink;
      }
    } catch (error) {
      console.error('Error fetching payment link:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.post('http://localhost:8000/getpatients', { userid: id });
      const patientsData = await response.data;
      setPatients(patientsData);
      setFilteredPAtients(patientsData);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleSearch = (event) => {
    let search = event.target.value;
    const searched = patients.filter(patient =>
      patient.name.toLowerCase().includes(search.toLowerCase()))
    setFilteredPAtients(searched);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const addPatientData = async () => {
    try {
      const response = await axios.post('http://localhost:8000/addpatients', { ...formData, userid: id, bookedAppointment: false });
      console.log('Patient added successfully:', response.data);
      fetchPatients(); 
      handleClose(); 
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  const validateForm = () => {
    return formData.name !== '' && formData.email !== '' && formData.phone !== '';
  };

  return (
    <div className='dashboard-container'>
      <div className='heading'>
         <h1>Hi {fullname}</h1>
         <h3>You Can create patients and book their appointments</h3>
      </div>
     
      <div className="dashboard">
        <div className="header">
          <input
            type="text"
            placeholder="Search by name"
            onChange={handleSearch}
          />
          <Button variant="primary" onClick={handleShow}>
            Add Patient
          </Button>
        </div>
        <div className="patient-table">
          {filteredPatients.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Patient Name</th>
                  <th>Appointment</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient,index) => (
                  <tr key={patient.id}>
                    <td>{index+1}</td>
                    <td className='patient-details'  onClick={() => handleViewDetails(patient)}>{patient.name}</td>
                    <td>{patient.bookedAppointment ? 
                   <Button variant="primary"  onClick={()=>{ fetchPaymentLink({payid : patient.id})  }}  >Payment</Button> :  
                    <Button variant="primary" onClick={()=>{ navigate('/appointment',{ state: { patient } } ) }}>Book Now</Button>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className='nopatients'>No patients</p>
          )}
        </div>
      </div>
      { showDetailsModal && <ViewPatients 
        show={showDetailsModal} 
        handleClose={handleCloseDetailsModal} 
        patient={selectedPatient} 
      /> }
      <Modal  className="modalform" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter Patient Name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter Phone Number" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button 
            variant="primary" 
            onClick={addPatientData} 
            disabled={!validateForm()}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;

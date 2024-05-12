import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/appointment.css';
import { Link } from 'react-router-dom';

const Appointment = () => {
  const location = useLocation();
  const patient = location.state.patient;
  console.log(patient);

  const [booked, setBooked] = useState(false);
  const [appointmentData, setAppointmentData] = useState({});
  const [paymentLink, setPaymentLink] = useState('');
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    reason: ''
  });

  useEffect(() => {
    if (patient) {
      fetchAppointment();
    }
  }, [patient]);

  const fetchAppointment = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/appointment/${patient.id}`);
      const apdata = response.data;
      console.log('response', apdata);
      if (apdata) {
        setAppointmentData(apdata);
        setBooked(true);
      }
    } catch (error) {
      console.error('Error fetching appointment:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData, patient.id);
      const response = await axios.post('http://localhost:8000/createappointment', {
        ...formData,
        patientId: patient.id,
        userId: patient.userid
      });
      setAppointmentData(response.data);
      setBooked(true);
      fetchPaymentLink(response.data);
      console.log('Appointment created successfully:', response.data);
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  const fetchPaymentLink = async (appointmentdata) => {
    try {
      const response = await axios.get(`http://localhost:8000/payment-link?id=${appointmentdata.id}`);
      setPaymentLink(response.data.payment_link);
    } catch (error) {
      console.error('Error fetching payment link:', error);
    }
  };

  const redirectToPaymentPage = () => {
    window.location.href = paymentLink;
  };


  const isDateValid = (dateString) => {
    const selectedDate = new Date(dateString);
    const currentDate = new Date();
    return selectedDate > currentDate;
  };

  return (
    <div>
      <h1 className='ap-header'>Appointment for {patient.name} </h1>
      <div className="appointment-page">
        {booked ? (
          <div className='appointment-booked'>
            <h2>Appointment Booked</h2>
            <h3>Patient Appointment Details</h3>
            <div>
            <ul className='details-container'>
              <li><strong>Name:</strong> {patient.name}</li>
              <li><strong>Email:</strong> {patient.email}</li>
              <li><strong>Phone:</strong> {patient.phone}</li>
              <li><strong>Date:</strong> {appointmentData.date}</li>
              <li><strong>Time:</strong> {appointmentData.time}</li>
              <li><strong>Reason:</strong> {appointmentData.reason}</li>
            </ul>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="apform">
            <div className="apform-group">
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
            
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="apform-group">
              <label>Time:</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
            <div className="apform-group">
              <label>Reason:</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="apbutton">Book Appointment</button>
          </form>
        )}
        <div>
          {paymentLink !== '' && booked && (
            <>
              <button className='payment-btn' onClick={redirectToPaymentPage}>Proceed to Payment</button>
             <Link className='dashboard-btn-link' to='/dashboard'> <button className='dashboard-btn' >Go to Dashboard</button></Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointment;

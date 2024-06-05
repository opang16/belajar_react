import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [ketebalan, setKetebalan] = useState([]);
  const [pola, setPola] = useState([]);
  const [selectedKetebalan, setSelectedKetebalan] = useState('');
  const [selectedPola, setSelectedPola] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('info');
  

  useEffect(() => {
    const fetchKetebalan = async () => {
      try {
        const response = await axios.get('http://localhost:8080/ketebalan');
        setKetebalan(response.data);
      } catch (error) {
        console.error('Error fetching ketebalan:', error);
      }
    };

    const fetchPola = async () => {
      try {
        const response = await axios.get('http://localhost:8080/pola');
        setPola(response.data);
      } catch (error) {
        console.error('Error fetching pola:', error);
      }
    };

    fetchKetebalan();
    fetchPola();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/searchkain', {
        idKetebalan: selectedKetebalan,
        idPola: selectedPola,
      });
      if (response.data.data.length > 0) {
        setResponseMessage(response.data.data[0].nama);
        setAlertVariant('success'); // Set alert variant to success for green background
      } else {
        setResponseMessage('Kain tidak ditemukan');
        setAlertVariant('warning'); // Set alert variant to warning for yellow background
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setResponseMessage('Tidak terdapat kain yang dicari');
      setAlertVariant('danger'); // Set alert variant to danger for red background
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Form Pencarian Kain</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formKetebalan">
          <Form.Label>Ketebalan Kain</Form.Label>
          <Form.Control
            as="select"
            value={selectedKetebalan}
            onChange={(e) => setSelectedKetebalan(e.target.value)}
          >
            <option value="">Pilih Ketebalan</option>
            {ketebalan.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nama}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formPola" className="mt-3">
          <Form.Label>Pola Kain</Form.Label>
          <Form.Control
            as="select"
            value={selectedPola}
            onChange={(e) => setSelectedPola(e.target.value)}
          >
            <option value="">Pilih Pola</option>
            {pola.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nama}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          Submit
        </Button>
      </Form>

      {responseMessage && (
        <Alert variant={alertVariant} className="mt-4">
          {responseMessage}
        </Alert>
      )}
    </div>
  );
};

export default App;

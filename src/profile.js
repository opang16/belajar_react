import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, Nav, NavDropdown, Container, Button, Form, Modal } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState({
    name: '',
    address: '',
    numberTelepon: ''
  });
  const [editData, setEditData] = useState({
    id: '',
    name: '',
    address: '',
    numberTelepon: ''
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchIndividualData = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8080/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEditData({
        id: response.data.id,
        name: response.data.name,
        address: response.data.address,
        numberTelepon: response.data.number_telepon
      });
      setShowEditModal(true);
    } catch (error) {
      console.error('Error fetching individual data:', error);
    }
  };

  const handleEdit = (id) => {
    fetchIndividualData(id);
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8080/profile/${editData.id}`, editData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData();
      setShowEditModal(false);
      setEditData({
        id: '',
        name: '',
        address: '',
        numberTelepon: ''
      });
    } catch (error) {
      console.error('Error saving edited data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleAddData = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8080/profile', newData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData();
      setShowAddModal(false);
      setNewData({
        name: '',
        address: '',
        numberTelepon: ''
      });
    } catch (error) {
      console.error('Error adding new data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Ethnic Indonesia</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="Master Data" id="basic-nav-dropdown">
                <NavDropdown.Item href="profile">Master Profile</NavDropdown.Item>
                <NavDropdown.Item href="#ketebalan">Master Ketebalan</NavDropdown.Item>
                <NavDropdown.Item href="#pola">Master Pola</NavDropdown.Item>
                <NavDropdown.Item href="masterkain">Master Kain</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="kain">Proses Kain</Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <h1>Data List</h1>
        <Button onClick={() => setShowAddModal(true)} className="mb-3">Tambah Data</Button>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody style={{ background: '#f2f2f2' }}>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>{item.number_telepon}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEdit(item.id)} className="mr-2">Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(item.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>

      {/* Modal for adding new data */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAddName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={newData.name}
                onChange={(e) => setNewData({ ...newData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formAddAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                value={newData.address}
                onChange={(e) => setNewData({ ...newData, address: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formAddPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone Number"
                value={newData.numberTelepon}
                onChange={(e) => setNewData({ ...newData, numberTelepon: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleAddData}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for editing data */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEditName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formEditAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                value={editData.address}
                onChange={(e) => setEditData({ ...editData, address: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formEditPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone Number"
                value={editData.numberTelepon}
                onChange={(e) => setEditData({ ...editData, numberTelepon: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSaveEdit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;

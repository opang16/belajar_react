
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import './App.css';



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

  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/profile');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchIndividualData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/profile/${id}`);
      setEditData(response.data);
    } catch (error) {
      console.error('Error fetching individual data:', error);
    }
  };

  const handleEdit = (id) => {
    fetchIndividualData(id);

  };
  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:8080/profile/${editData.id}`, editData);
      fetchData();
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
      await axios.delete(`http://localhost:8080/profile/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleAddData = async () => {
    try {
      await axios.post('http://localhost:8080/profile', newData);
      fetchData();
      setNewData({
        name: '',
        address: '',
        numberTelepon: ''
      });
    } catch (error) {
      console.error('Error adding new data:', error);
    }
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
  <h1>Data List</h1>
  <button onClick={() => fetchData()}>Refresh Data</button>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Address</th>
        <th>Phone Number</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody style={{background: '#f2f2f2'}}>
      {data.map((item) => (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.address}</td>
          <td>{item.number_telepon}</td>
          <td>
            <button onClick={() => handleEdit(item.id)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {editData.id && (
    <div>
      <h2>Edit Data</h2>
      <input
        type="text"
        placeholder="Name"
        value={editData.name}
        onChange={(e) => setEditData({...editData, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Address"
        value={editData.address}
        onChange={(e) => setEditData({...editData, address: e.target.value })}
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={editData.number_telepon}
        onChange={(e) => setEditData({...editData, numberTelepon: e.target.value })}
      />
      <button onClick={() => handleSaveEdit()}>Save Changes</button>
    </div>
  )}

  <h2>Add Data</h2>
  <input
    type="text"
    placeholder="Name"
    value={newData.name}
    onChange={(e) => setNewData({...newData, name: e.target.value })}
  />
  <input
    type="text"
    placeholder="Address"
    value={newData.address}
    onChange={(e) => setNewData({...newData, address: e.target.value })}
  />
  <input
    type="text"
    placeholder="Phone Number"
    value={newData.numberTelepon}
    onChange={(e) => setNewData({...newData, numberTelepon: e.target.value })}
  />
  <button onClick={() => handleAddData()}>Add Data</button>
</div>

  );
  
}


export default App;

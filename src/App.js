import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
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
            {isAuthenticated && (
              <Nav className="ml-auto">
                <Button variant="outline-light" onClick={handleLogout}>
                  Logout
                </Button>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="jumbotron">
        <Container>
          <h1>Selamat Datang di Ethnic Indonesia</h1>
          <p>
            Jelajahi sejarah dan ragam jenis kain tradisional dari berbagai daerah di Indonesia. 
            Temukan keunikan dan kekayaan budaya kita.
          </p>
        </Container>
      </div>

      <Container>
        <h2>Sejarah Kain di Indonesia</h2>
        <p>
          Indonesia memiliki sejarah panjang dalam pembuatan kain tradisional. Setiap daerah memiliki teknik dan pola khas yang mencerminkan budaya dan tradisi setempat. 
        </p>

        <h2>Jenis-Jenis Kain Tradisional</h2>
        <ul>
          <li>Batik</li>
          <li>Tenun</li>
          <li>Songket</li>
          <li>Ulos</li>
          <li>Gringsing</li>
        </ul>
      </Container>
    </div>
  );
}

export default App;

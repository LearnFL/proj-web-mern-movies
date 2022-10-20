import React, {useState} from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "../public/nav-bar.css";
import logo from '../public/camera.png';

export default function NavBar(props) {
  const[search, setSearch] = useState('');

  var user = props.user;

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href={"/movies"}> <img className= "logo" src={logo} alt="Picture of a camera" /><span style={{color: '#4a69bd', textShadow:'2px 2px #c7ecee'}}>Movie Reviews</span></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link >
                <Link className="NavLink" to={"/movies"}>Movies</Link>
              </Nav.Link>
              <Nav.Link >
                { user ? (<Link className="NavLink" to={'/logout'}>Logout User</Link>):(<Link className="NavLink" to={'/login'}>Login</Link>) }
              </Nav.Link>
              <NavDropdown className="drop-down" title="Action" id="navbarScrollingDropdown">
                <NavDropdown.Item className="NavLink" href="#action3">Contact</NavDropdown.Item>
                <NavDropdown.Item className="NavLink" href="#action4">About</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item className="NavLink" href="#action5">GitHub</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                value={search}
                type="search"
                placeholder="Google"
                className="me-2"
                aria-label="Search"
                onChange={(e)=>{setSearch(e.target.value)}}
              />
              <Button onClick={()=>{window.open('http://google.com/search?q='+search)}} className="fill" variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

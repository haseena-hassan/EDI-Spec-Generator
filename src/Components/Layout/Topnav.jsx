import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import signout from '../../signout.svg'
import logo from '../../Assets/images/logo-ibm.png'

export default class Topnav extends Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src={logo}
                        width="50"
                        height="17"
                        className="d-inline-block "
                    />{' '}
                    EDI Guide Creator
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="#features"></Nav.Link>
                    <Nav.Link href="#pricing"></Nav.Link>
                    {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1"></NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2"></NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3"></NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4"> </NavDropdown.Item>
                    </NavDropdown> */}
                    </Nav>
                    
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text style={{paddingRight: "20px"}}>
                    Hi, <a href="#login">Haseena</a>
                    </Navbar.Text>
                    <Nav>
                    <Nav.Link eventKey={2} href="#memes">
                        <img src={signout} text="hell"/>{'  '}Logout
                    </Nav.Link>
                    </Nav>
                    <Nav>
                    <Nav.Link eventKey={3} href="#memes">
                        <i class="material-icons">more_vert</i>
                    </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
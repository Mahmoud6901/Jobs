import React from "react";
import "./navbar.css";

import { NavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap";

export default class Nav1 extends React.Component {
  
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
    
      <div>
        <Navbar id="navbar" expand="md" className="navstyle">
          
          <NavbarBrand to="/home">
            <h1 className="logo">Teqenia</h1>
          </NavbarBrand>
          
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto navitemsstyle" navbar>
              <NavItem>
                <a href="#aboutus" className="navitemcolor">
                  About Us
                </a>
              </NavItem>
              <NavItem>
                <a href="#services" className="navitemcolor">
                  Services
                </a>
              </NavItem>
              <NavItem>
                <a href="#projects" className="navitemcolor">
                  Clients&Projects
                </a>
              </NavItem>

              <NavItem>
                <a href="#newscomponent" className="navitemcolor">
                  News
                </a>
              </NavItem>
              <NavItem>
                <a href="/" className="navitemcolor">
                  Join Us
                </a>
              </NavItem>
              <NavItem>
                <NavLink to="/contactus" className="navitemcolor">
                  Contact
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
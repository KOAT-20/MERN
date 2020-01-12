import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBIcon } from 'mdbreact';
import { Link } from 'react-router-dom';

export default class Navigation extends Component {
  render () {
    return (
      <MDBNavbar className="navbar navbar-expand-lg navbar-dark bg-dark">
        <MDBNavbarBrand>
          <Link className="white-text" to="/">NotesApp</Link>
        </MDBNavbarBrand>
        <MDBNavbarNav right>
          <MDBNavItem className="mr-3">
            <Link className="nav-link" to="/">
              <MDBIcon size="2x" icon="list" />
            </Link>
          </MDBNavItem>
          <MDBNavItem className="mr-3">
            <Link className="nav-link" to="/createNote">
              <MDBIcon  size="2x"icon="clipboard-list" />
            </Link>
          </MDBNavItem>
          <MDBNavItem>
            <Link className="nav-link" to="/createUser">
              <MDBIcon size="2x" icon="user-plus" />
            </Link>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBNavbar>
    );
  }
}

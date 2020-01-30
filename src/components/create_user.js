import React, { Component } from 'react';
import {
  MDBRow, MDBCol, MDBListGroup, MDBListGroupItem, MDBCard, MDBCardBody,
  MDBCardTitle, MDBInput, MDBBtn, MDBIcon
} from 'mdbreact';
import axios from 'axios';

export default class CreateUser extends Component {
  state = {
    users:[],
    username:'',
    lastname:'',
  }

  async componentDidMount () {
    this.getUsers();
  }

  getUsers = async () => {
    const res = await axios.get('http://localhost:3000/api/users');
    this.setState ({
      users: res.data
    })
  }

  changeInput = (e) => {
    this.setState ({
      [e.target.id]: e.target.value
    })
  }

  createUser = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/api/users', {
      username: this.state.username,
      lastname: this.state.lastname
    })
    this.setState({username: '', lastname: ''})
    this.getUsers();
  }

  deleteUser = async (id) => {
    console.log(`User delete with the ID: ${id}`);
    await axios.delete(`http://localhost:3000/api/users/${id}`)
    this.getUsers();
  }

  render () {
    return (
      <MDBRow>
        <MDBCol lg="4">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Create New User</MDBCardTitle>
              <form onSubmit={this.createUser}>
                <MDBInput id="username" value={this.state.username} type="text" label="User Name" onChange={this.changeInput} outline />
                <MDBInput id="lastname" value={this.state.lastname} type="text" label="Last Name" onChange={this.changeInput} outline />
                <div className="text-center">
                  <MDBBtn type="submit" color="secondary" className="w-75">Save</MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol lg="8">
          <MDBListGroup>
            {this.state.users.map(user =>
              <MDBListGroupItem className="list-group-item-action" key={user._id}>
                {user.username} {user.lastname}
                <MDBIcon
                  icon="trash-alt" className="red-text float-right"
                  style={{cursor:'pointer'}}
                  onClick={() => this.deleteUser(user._id)}
                />
              </MDBListGroupItem>
            )}
          </MDBListGroup>
        </MDBCol>
      </MDBRow>
    );
  }
}

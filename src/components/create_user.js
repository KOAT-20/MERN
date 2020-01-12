import React, { Component } from 'react';
import {
  MDBRow, MDBCol, MDBListGroup, MDBListGroupItem, MDBCard, MDBCardBody,
  MDBCardTitle, MDBInput
} from 'mdbreact';
import axios from 'axios';

export default class CreateUser extends Component {
  state = {
    users:[],
    username:'',
    lastname:'',
  }

  async componentDidMount () {
    const res = await axios.get('http://localhost:3000/api/users');
    console.log(res.data);
    this.setState ({
      users: res.data
    })
  }

  changeInput = (e) => {
    this.setState ({
      [e.target.id]: e.target.value
    })
  }

  render () {
    return (
      <MDBRow>
        <MDBCol lg="4">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Create New User</MDBCardTitle>
              <form>
                <MDBInput id="username" type="text" label="User Name" onChange={this.changeInput} />
                <MDBInput id="lastname" type="text" label="Last Name" onChange={this.changeInput} />
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol lg="8">
          <MDBListGroup>
            {this.state.users.map(user =>
              <MDBListGroupItem key={user._id}>
                {user.username}
              </MDBListGroupItem>
            )}
          </MDBListGroup>
        </MDBCol>
      </MDBRow>
    );
  }
}

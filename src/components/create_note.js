import React, { Component } from 'react';
import axios from 'axios';
import {
  MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn, MDBInput
} from 'mdbreact';

export default class CreateNote extends Component {
  state = {
    users: [],
  }

  async componentDidMount () {
    const res = await axios.get('http://localhost:3000/api/users');
    console.log(res.data);
    this.setState({
      users: res.data,
    });
  }

  changeInput = (e) => {
    console.log(e.target.value);
    this.setState ({
      [e.target.id]: e.target.value
    });
  }

  onSubmitNote = (e) => {
    e.preventDefault();
  }

  render () {
    return (
      <MDBRow center>
        <MDBCol className='text-center' lg='6'>
          <MDBCard>
            <MDBCardBody>
              <h3>Create a Note</h3>
              <form onSubmit={this.onSubmitNote}>
                <div className='form-group'>
                  <select className='form-control' id='userSelected'
                    onChange={this.changeInput}
                    >
                    {this.state.users.map(user =>
                      <option key={user._id} value={user.username}>
                        {user.username}
                      </option>
                    )}
                  </select>
                </div>
                <div className='form-group'>
                  <MDBInput
                    className='form-control'
                    type='text'
                    label='Title' 
                    outline
                  />
                </div>
                <div className='form-group'>
                  <MDBInput
                    className='form-control'
                    type='textarea'
                    label='Description'
                    style={{borderRadius:'5px 5px', height:'100px'}}
                    outline
                  />
                </div>
                <MDBBtn className='w-75' type='submit' color='secondary'>
                  Save
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    );
  }
}

import React, { Component } from 'react';
import axios from 'axios';
import {
  MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn, MDBInput
} from 'mdbreact';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateNote extends Component {
  state = {
    users: [],
    userSelected: '',
    title: '',
    description: '',
    date: new Date(),
  }

  async componentDidMount () {
    const res = await axios.get('http://localhost:3000/api/users');
    console.log(res.data);
    this.setState({
      users: res.data,
    });
  }

  changeInput = (e) => {
    console.log(e.target.id, e.target.value);
    this.setState ({
      [e.target.id]: e.target.value
    });
  }

  changeDate = (date) => {
    this.setState({date})
  }

  onSubmitNote =  async (e) => {
    e.preventDefault();
    const newNote = {
      title: this.state.title,
      description: this.state.description,
      date: this.state.date,
      author: this.state.userSelected,
    }
    const res = await axios.post('http://localhost:3000/api/notes', newNote);
    console.log(JSON.parse(res.config.data));
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
                    <option value=''>Select a user</option>
                    {this.state.users.map(user =>
                      <option key={user._id} value={`${user.username} ${user.lastname}`}>
                        {user.username} {user.lastname}
                      </option>
                    )}
                  </select>
                </div>
                <div className='form-group'>
                  <MDBInput
                    id='title'
                    className='form-control'
                    onChange={this.changeInput}
                    type='text'
                    label='Title'
                    outline
                  />
                </div>
                <div className='form-group'>
                  <MDBInput
                    id='description'
                    className='form-control'
                    onChange={this.changeInput}
                    type='textarea'
                    label='Description'
                    style={{borderRadius:'5px 5px', height:'100px'}}
                    outline
                  />
                </div>
                <div className='form-group'>
                  <DatePicker
                    className='form-control'
                    dateFormat='dd/MM/yyyy'
                    selected={this.state.date}
                    onChange={this.changeDate}
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

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
    editNote: false,
    idNote: '',
  }

  async componentDidMount () {
    // console.log(this.props.match.params.id);
    const res = await axios.get('http://localhost:3000/api/users');
    console.log(res.data);
    this.setState({
      users: res.data,
    });
    if (this.props.match.params.id) {
      const res = await axios.get(`http://localhost:3000/api/notes/${this.props.match.params.id}`);
      // console.log('Id note:', res.data);
      this.setState({
        title: res.data.title,
        description: res.data.description,
        date: new Date(res.data.date),
        userSelected: res.data.author,
        editNote: true,
        idNote: this.props.match.params.id,
      });
    }
  }

  changeInput = (e) => {
    // console.log(e.target.id, e.target.value);
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
    if (this.state.editNote) {
      await axios.put(`http://localhost:3000/api/notes/${this.state.editNote}`, newNote);
    } else {
      await axios.post('http://localhost:3000/api/notes', newNote);
      // console.log(JSON.parse(res.config.data));
    }
    window.location.href = '/';
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
                  <select
                    className='form-control'
                    id='userSelected'
                    onChange={this.changeInput}
                    value={this.state.userSelected}
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
                    value={this.state.title}
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
                    value={this.state.description}
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
                    value={this.state.date}
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

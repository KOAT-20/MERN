import React, { Component } from 'react';
import axios from 'axios';
import { format } from 'timeago.js';
import {
  MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBIcon
} from 'mdbreact';

export default class NoteList extends Component {
  state = {
    notes: [],
  }

  async componentDidMount () {
    this.getNotes();
  }

  getNotes = async () => {
    const res = await axios.get('http://localhost:3000/api/notes');
    console.log('Notas:', res.data);
    this.setState({
      notes: res.data,
    });
  }

  deleteNote = async (id) => {
    console.log(`Note delete with the ID: ${id}`);
    await axios.delete(`http://localhost:3000/api/notes/${id}`)
    this.getNotes();
  }

  render () {
    return (
      <MDBRow>
        {this.state.notes.map(note =>
          <MDBCol key={note._id} lg='3' className='mt-4'>
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>{note.title}</MDBCardTitle>
                <hr />
                <MDBCardText>
                  {note.description}
                </MDBCardText>
                <div>{note.author}</div>
                <div>{format(note.date)}</div>
                <hr />
                <div className='float-right'>
                  <MDBIcon
                    icon="trash-alt" className='red-text'
                    style={{cursor:'pointer'}}
                    onClick={() => this.deleteNote(note._id)}
                  />
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        )}
      </MDBRow>
    );
  }
}

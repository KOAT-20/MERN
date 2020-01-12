import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {

  async componentDidMount () {
    const res = await axios.get('http://localhost:3000/api/users');
    console.log(res.data);
  }

  render () {
    return (
      <div>CreateUser</div>
    );
  }
}

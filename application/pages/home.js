import React, { Component } from 'react';
import page from '../components/higher-order/page';

class Index extends Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
        <p>Click about link multiple times to see hoc in action</p>
      </div>
    );
  }
}

export default Index;

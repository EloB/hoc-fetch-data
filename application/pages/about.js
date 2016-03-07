import React, { Component } from 'react';
import page from '../components/higher-order/page';

class About extends Component {
  render() {
    return (
      <div>About</div>
    );
  }
}

export default page(
  () => new Promise((resolve, reject) => {
    const timeout = ~~(Math.random() * 1000);

    if (Math.random() > 0.75) {
      throw new Error('Random simulated error');
    } else if (Math.random() > 0.75) {
      setTimeout(reject.bind(null, 'Access denied'), timeout);
    } else if (Math.random() > 0.75) {
      setTimeout(reject.bind(null, (
        <div style={{ color: 'red' }}>Custom error html</div>
      )), timeout);
    } else {
      setTimeout(resolve, timeout);
    }
  })
)(About);

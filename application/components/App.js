import React, { Component } from 'react';
import { Link } from 'react-router';

export default class PageRoute extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">Startpage</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

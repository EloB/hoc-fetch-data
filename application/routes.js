import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import App from './components/App';
import * as Pages from './pages';

export default (
  <Router history={hashHistory}>
    <Route component={App}>
      <Route path="/" component={Pages.Home} />
      <Route path="/about" component={Pages.About} />
    </Route>
  </Router>
);

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App/index';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={App} />
    <Route path="*" component={App} />
  </Route>
);

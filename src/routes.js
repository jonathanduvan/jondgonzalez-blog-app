import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Welcome from './components/welcome';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={Index} />
    <Route path="posts/new" component={New} />
    <Route path="posts/:id" component={Show} />
  </Route>
);

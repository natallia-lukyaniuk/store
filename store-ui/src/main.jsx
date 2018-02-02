import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import createHashHistory from 'history/createHashHistory';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import reducer from './reducers';
import App from './components/App/App.component';

const history = createHashHistory();
const store = createStore(
  reducer,
  {},
  composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history))),
);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route exact path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById('app'),
);

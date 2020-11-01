import * as React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import reducer from './redux/reducers';
import { persistedCart } from './redux/persistedState';
import { App } from './components/App';

const store = createStore(
  reducer,
  {
    auth: {
      authenticated: localStorage.getItem('token'),
    },
    cart: persistedCart,
  },
  applyMiddleware(thunk)
);

store.subscribe(() => {
  localStorage.setItem('cart', JSON.stringify(store.getState().cart));
});

const Root: React.FC = () => {
  return <App />;
};

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Root />
    </Router>
  </Provider>,
  document.querySelector('#root')
);

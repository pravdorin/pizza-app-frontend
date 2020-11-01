import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import pizzas from './pizzas';
import cart from './cart';
import orders from './orders';
import prefill from './prefill';

export default combineReducers({
  auth,
  form: formReducer,
  pizzas,
  cart,
  orders,
  prefill,
});

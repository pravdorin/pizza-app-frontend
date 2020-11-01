/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import {
  AUTH_USER,
  AUTH_ERROR,
  SIGNUP_ERROR,
  ADD_ITEM,
  REMOVE_ITEM,
  DELETE_ITEM,
  CLEAR_CART,
  FETCH_PIZZAS,
  FETCH_ERROR,
  FETCH_ORDERS,
  FETCH_PREFILL,
} from './types';

// AUTH ACTION CREATORS

export const signup = (formProps: any, callback: any) => async (
  dispatch: any
) => {
  try {
    const response = await axios.post('/signup', formProps);

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch (err) {
    dispatch({ type: SIGNUP_ERROR, payload: 'Email in use' });
  }
};

export const signin = (formProps: any, callback: any) => async (
  dispatch: any
) => {
  try {
    const response = await axios.post('/signin', formProps);

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch (err) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
  }
};

export const signout = (cb: () => void) => {
  localStorage.removeItem('token');
  cb();
  return {
    type: AUTH_USER,
    payload: '',
  };
};

// FETCH PIZZA ACTION CREATOR

export const fetchPizzas = (url: string) => async (dispatch: any) => {
  try {
    const response = await axios.get(url);
    dispatch({ type: FETCH_PIZZAS, payload: response.data });
  } catch (err) {
    dispatch({ type: FETCH_ERROR, payload: 'Unable to fetch data!' });
  }
};

// CART ACTION CREATORS

export const addToCart = (id: string, currency: string) => (
  dispatch: any,
  getState: any
) => {
  const item = getState().pizzas.filter((el: any) => el.id === id);
  dispatch({
    type: ADD_ITEM,
    payload: {
      item,
      currency,
    },
  });
};

export const removeFromCart = (id: string) => (
  dispatch: any,
  getState: any
) => {
  const item = getState().cart.items.filter((el: any) => el.id === id);
  dispatch({
    type: REMOVE_ITEM,
    payload: item,
  });
};

export const deleteItem = (id: string) => (dispatch: any, getState: any) => {
  const item = getState().cart.items.filter((el: any) => el.id === id);
  dispatch({
    type: DELETE_ITEM,
    payload: item,
  });
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
    payload: null,
  };
};

// ORDER ACTION CREATORS

export const sendOrder = (formProps: any, cart: any, callback: any) => async (
  dispatch: any
) => {
  try {
    const response = await axios.post('/order', {
      formProps,
      cart,
    });

    dispatch({
      type: CLEAR_CART,
      payload: response,
    });
    callback();
  } catch (err) {
    dispatch({ type: AUTH_ERROR, payload: 'Fill all fields' });
  }
};

export const fetchPrefill = (url: string) => async (dispatch: any) => {
  try {
    const token = localStorage.getItem('token')!;
    const response = await axios.get(url, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: FETCH_PREFILL, payload: response.data });
  } catch (err) {
    dispatch({ type: FETCH_ERROR, payload: 'Unable to fetch prefill data!' });
  }
};

// HISTORY ORDERS ACTION CREATORS

export const fetchOrders = (url: string) => async (dispatch: any) => {
  try {
    const token = localStorage.getItem('token')!;
    const response = await axios.get(url, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: FETCH_ORDERS, payload: response.data.orders });
  } catch (err) {
    dispatch({ type: FETCH_ERROR, payload: 'Unable to fetch orders!' });
  }
};

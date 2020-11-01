/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-anonymous-default-export */
import { AUTH_USER, AUTH_ERROR, SIGNUP_ERROR } from '../actions/types';

const INITIAL_STATE = {
  authenticated: '',
  errorMessage: '',
  signupErrorMessage: '',
};

export default function (state: any = INITIAL_STATE, action: any) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: action.payload };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    case SIGNUP_ERROR:
      return { ...state, signupErrorMessage: action.payload };
    default:
      return state;
  }
}

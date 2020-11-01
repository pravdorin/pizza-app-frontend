/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-anonymous-default-export */
import { FETCH_PIZZAS } from '../actions/types';

export default function (state = [], action: any) {
  switch (action.type) {
    case FETCH_PIZZAS:
      return [...action.payload];
    default:
      return state;
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-anonymous-default-export */
import { FETCH_ORDERS } from '../actions/types';

export default function (state: any = [], action: any) {
  switch (action.type) {
    case FETCH_ORDERS:
      return [...state, action.payload];
    default:
      return state;
  }
}

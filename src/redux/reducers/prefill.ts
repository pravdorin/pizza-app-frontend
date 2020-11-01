/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-anonymous-default-export */
import { FETCH_PREFILL } from '../actions/types';

export default function (state: any = [], action: any) {
  switch (action.type) {
    case FETCH_PREFILL:
      return [...state, action.payload];
    default:
      return state;
  }
}

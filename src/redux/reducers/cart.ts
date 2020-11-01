/* eslint-disable prefer-destructuring */
/* eslint-disable no-case-declarations */
/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ADD_ITEM,
  REMOVE_ITEM,
  DELETE_ITEM,
  CLEAR_CART,
} from '../actions/types';

const initialState = {
  items: [],
  totalPriceUSD: 0,
  totalPriceEURO: 0,
  deliveryFee: {
    USD: 4,
    EUR: 3,
  },
  totalQuantity: 0,
};

function findUniqueItem(state: any, id: string) {
  return state.items.find((el: any) => el.id === id);
}

function findAndDeleteItem(state: any, id: string) {
  const index = state.items
    .map((el: any) => {
      return el.id;
    })
    .indexOf(id);
  state.items.splice(index, 1);
  return state.items;
}

export default function (state: any = initialState, action: any) {
  switch (action.type) {
    case ADD_ITEM: {
      const item = action.payload.item[0];
      const uniqueItem = findUniqueItem(state, item.id);
      uniqueItem === undefined ? (item.quantity = 1) : (item.quantity += 1);
      let newTotalUsdPrice;
      let newTotalEuroPrice;
      if (state.items.length === 0) {
        newTotalUsdPrice =
          state.totalPriceUSD + item.price.USD + state.deliveryFee.USD;
        newTotalEuroPrice =
          state.totalPriceEURO + item.price.EUR + state.deliveryFee.EUR;
      } else {
        newTotalUsdPrice = state.totalPriceUSD + item.price.USD;
        newTotalEuroPrice = state.totalPriceEURO + item.price.EUR;
      }
      const newItems = [...state.items, ...action.payload.item];
      const newTotalQuantity = state.totalQuantity + 1;

      if (uniqueItem === undefined) {
        return {
          ...state,
          items: newItems,
          totalPriceUSD: newTotalUsdPrice,
          totalPriceEURO: newTotalEuroPrice,
          totalQuantity: newTotalQuantity,
        };
      } else {
        return {
          ...state,
          totalPriceUSD: newTotalUsdPrice,
          totalPriceEURO: newTotalEuroPrice,
          totalQuantity: newTotalQuantity,
        };
      }
    }
    case REMOVE_ITEM: {
      const item = action.payload[0];
      if (item.quantity === 1) {
        item.quantity = 0;
        const newTotalUsdPrice = state.totalPriceUSD - item.price.USD;
        const newTotalEuroPrice = state.totalPriceEURO - item.price.EUR;
        const newItemList = findAndDeleteItem(state, item.id);
        const newTotalQuantity = state.totalQuantity - 1;
        return {
          ...state,
          items: newItemList,
          totalPriceUSD: newTotalUsdPrice,
          totalPriceEURO: newTotalEuroPrice,
          totalQuantity: newTotalQuantity,
        };
      }
      if (item.quantity > 1) {
        item.quantity -= 1;
        const newTotalUsdPrice = state.totalPriceUSD - item.price.USD;
        const newTotalEuroPrice = state.totalPriceEURO - item.price.EUR;
        const newTotalQuantity = state.totalQuantity - 1;
        return {
          ...state,
          totalPriceUSD: newTotalUsdPrice,
          totalPriceEURO: newTotalEuroPrice,
          totalQuantity: newTotalQuantity,
        };
      }
      break;
    }
    case DELETE_ITEM:
      const item = action.payload[0];
      const newTotalQuantity = state.totalQuantity - item.quantity;
      const newItemList = findAndDeleteItem(state, item.id);
      return {
        ...state,
        items: newItemList,
        totalQuantity: newTotalQuantity,
      };
    case CLEAR_CART:
      return initialState;
    default: {
      return state;
    }
  }
  return state;
}

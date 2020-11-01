/* eslint-disable @typescript-eslint/no-explicit-any */
export type AuthStateType = {
  auth: {
    authenticated: string;
    errorMessage: string;
    signupErrorMessage: string;
  };
};

export type CartStateType = {
  cart: {
    items: [];
    totalPriceUSD: number;
    deliveryFee: {
      USD: number;
      EUR: number;
    };
    totalQuantity: number;
  };
};

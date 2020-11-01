export const persistedCart = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart')!)
  : {
    items: [],
    totalPriceUSD: 0,
    totalPriceEURO: 0,
    deliveryFee: {
      USD: 4,
      EUR: 3,
    },
    totalQuantity: 0,
  };

import * as React from 'react';
import storage from 'local-storage-fallback';

type Props = {
  children: React.ReactNode;
};

type CurrencyContextType = {
  currency: string;
  setCurrency: (value: string) => void;
};

const CurrencyContext = React.createContext<CurrencyContextType | undefined>(
  undefined
);

const useCurrency = () => React.useContext(CurrencyContext);

function getInitialCurrentCurrency() {
  const savedCurrency = storage.getItem('currency');
  return savedCurrency || 'USD';
}

const CurrencyProvider = ({ children }: Props) => {
  const [currency, setCurrency] = React.useState(getInitialCurrentCurrency);

  React.useEffect(() => {
    storage.setItem('currency', currency);
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export { CurrencyProvider, useCurrency };

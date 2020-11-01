import * as React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { useCurrency } from '../../context/CurrencyProvider';

const CustomSelect = styled(Select)`
  & .react-select__control {
    background-color: hsl(0, 0%, 100%);
    border-color: #fc4c4c;
    border-radius: 5px;
    padding: 0;
    width: 90px;
    font-size: 12px;
    white-space: nowrap;

    @media (min-width: 1024px) {
      width: 120px;
    }
  }
`;

type OnChangeEvent = {
  value: string;
  label: string;
};

const options = [
  { value: 'USD', label: 'USD' },
  { value: 'EURO', label: 'EURO' },
];

const CurrencySelector: React.FC = () => {
  const { currency, setCurrency } = useCurrency()!;
  return (
    <div>
      <CustomSelect
        value={options.filter((option) => option.label === currency)}
        classNamePrefix="react-select"
        options={options}
        onChange={(e: OnChangeEvent): void => setCurrency(e.value)}
      />
    </div>
  );
};

export { CurrencySelector };

import * as React from 'react';
import styled from 'styled-components';
import { CurrencySelector } from './CurrencySelector';
import { Logo } from './Logo';

const TopHeaderBlock = styled.header`
  padding: 5px 20px;
`;

const TopHeaderFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TopHeader: React.FC = () => {
  return (
    <TopHeaderBlock>
      <TopHeaderFlex>
        <Logo />
        <CurrencySelector />
      </TopHeaderFlex>
    </TopHeaderBlock>
  );
};

export { TopHeader };

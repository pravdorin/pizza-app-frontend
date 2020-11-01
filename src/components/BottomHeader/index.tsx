import * as React from 'react';
import styled from 'styled-components';
import { Auth } from './Auth';
import { Cart } from './Cart';

const BottomHeaderBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 20px 10px 20px;
`;

interface BottomHeaderProps {
  busket: boolean;
  setBusket: React.Dispatch<React.SetStateAction<boolean>>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const BottomHeader: React.FC<BottomHeaderProps> = (
  props: BottomHeaderProps
) => {
  return (
    <BottomHeaderBlock>
      <Auth setModal={props.setModal} />
      <Cart busket={props.busket} setBusket={props.setBusket} />
    </BottomHeaderBlock>
  );
};

export { BottomHeader };

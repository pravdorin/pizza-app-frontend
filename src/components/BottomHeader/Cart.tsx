import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import CartIcon from '../../assets/cart-icon.svg';
import { CartStateType } from '../../types';

const CartBlock = styled.div`
  position: relative;
`;

const CartImage = styled.img`
  width: 36px;
  height: 36px;
`;

const CartQuantity = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 20px;
  top: 30%;
  left: 45%;
  font-size: 12px;
  border: 2px solid #fc4c4c;
  text-align: center;
  border-radius: 5px;
  background: #fff;
  padding: 0.03em 0.2em;
  color: #fc4c4c;
`;

interface CartProps {
  quantity: number;
  busket: boolean;
  setBusket: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cart: React.FC<CartProps> = ({
  quantity,
  busket,
  setBusket,
}: CartProps) => {
  return (
    <CartBlock onClick={() => setBusket(!busket)}>
      <CartImage src={CartIcon} alt="" />
      {quantity === 0 ? null : <CartQuantity>{quantity}</CartQuantity>}
    </CartBlock>
  );
};

function mapStateToProps(state: CartStateType) {
  return { quantity: state.cart.totalQuantity };
}

const connected = connect(mapStateToProps)(Cart);
export { connected as Cart };

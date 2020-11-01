import * as React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCurrency } from '../../context/CurrencyProvider';
import * as actions from '../../redux/actions';
import Remove from '../../assets/remove.svg';
import Decrement from '../../assets/decrement.svg';
import Increment from '../../assets/increment.svg';
import { CartStateType } from '../../types';

const CartBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  position: absolute;
  right: 0px;
  top: 150px;

  max-height: 600px;
  width: 275px;
  padding: 25px 20px;
  border-radius: 5px;
  background: #fff;

  overflow-y: scroll;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 25px;
`;

const CartTitle = styled.h4`
  font-size: 18px;
  font-weight: bold;
`;

const CartItemsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CartItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-height: 120px;
  min-width: 250px;
  flex-basis: 1 2 1;

  &:after {
    content: '';
    height: 2px;
    width: 100%;
    border-bottom: 2px solid rgba(194, 187, 187, 0.712);

    position: absolute;
    top: 90%;
    left: 0%;

    transform: translate(0, 0%);
  }
`;

const CartItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  flex-grow: 1;
  padding: 20px 10px;
`;

const CartItemName = styled.p`
  font-size: 14px;
  font-weight: bold;
  white-space: nowrap;
  margin: 0;
  padding-bottom: 10px;
`;

const Quantity = styled.div`
  border: 1px solid rgba(204, 200, 200, 0.719);
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QuantityButton = styled.button`
  margin-top: 5px;
  border: none;
  background: #fff;
`;

const QuantityIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const QuantityNumber = styled.span`
  font-size: 18px;
`;

const CartItemAdditionalInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  padding: 20px 0;
  min-width: 40px;
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
`;

const RemoveItem = styled.img`
  width: 20px;
  height: 20px;
`;

const ItemPrice = styled.p`
  font-weight: 400;
`;

const DeliveryFeeBlock = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DeliveryFeeTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
`;

const DeliveryFee = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const TotalPriceBlock = styled.h2`
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalPriceTitle = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const TotalPrice = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const CheckoutLink = styled(Link)`
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  text-align: center;
  background: #64b171;
  color: #fff;
  margin-top: 20px;
  padding: 10px 20px;
`;

interface CartListProps {
  cart: {
    items: [];
    totalPriceUSD: number;
    totalPriceEURO: number;
    deliveryFee: {
      USD: number;
      EUR: number;
    };
    totalQuantity: number;
  };
  addToCart: (id: string, cur: string) => void;
  removeFromCart: (id: string, cur: string) => void;
  deleteItem: (id: string) => void;
  busket: boolean;
  setBusket: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CartItemProps {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: {
    USD: number;
    EUR: number;
  };
}

const CartList: React.FC<CartListProps> = (props: CartListProps) => {
  const { currency } = useCurrency()!;

  const handleAddClick = (id: string, cur: string) => {
    props.addToCart(id, cur);
  };

  const handleRemoveClick = (id: string, cur: string) => {
    props.removeFromCart(id, cur);
  };

  const handleDeleteClick = (id: string) => {
    props.deleteItem(id);
  };

  return props.busket ? (
    props.cart.items.length === 0 ? (
      <CartBlock>
        <CartTitle>Oops, it’s empty here!</CartTitle>
      </CartBlock>
    ) : (
      <CartBlock>
        <CartTitle>Your Order:</CartTitle>
        <CartItemsList>
          {props.cart.items &&
            props.cart.items.map((item: CartItemProps) => {
              return (
                <CartItem key={item.id}>
                  <ItemImage src={`${item.image}`} alt="" />
                  <CartItemInfo>
                    <CartItemName>{item.name}</CartItemName>
                    <Quantity>
                      <QuantityButton
                        onClick={() => handleRemoveClick(item.id, currency)}
                      >
                        <QuantityIcon src={Decrement} alt="" />
                      </QuantityButton>
                      <QuantityNumber>{item.quantity}</QuantityNumber>
                      <QuantityButton
                        onClick={() => handleAddClick(item.id, currency)}
                      >
                        <QuantityIcon src={Increment} alt="" />
                      </QuantityButton>
                    </Quantity>
                  </CartItemInfo>
                  <CartItemAdditionalInfo>
                    <RemoveItem
                      src={Remove}
                      alt=""
                      onClick={() => handleDeleteClick(item.id)}
                    />
                    <ItemPrice>
                      {currency === 'USD' ? '$ ' : '€ '}
                      {currency === 'USD' ? item.price.USD : item.price.EUR}
                    </ItemPrice>
                  </CartItemAdditionalInfo>
                </CartItem>
              );
            })}
        </CartItemsList>
        <DeliveryFeeBlock>
          <DeliveryFeeTitle>Delivery fee:</DeliveryFeeTitle>
          <DeliveryFee>
            {currency === 'USD' ? '$ ' : '€ '}
            {currency === 'USD'
              ? props.cart.deliveryFee.USD
              : props.cart.deliveryFee.EUR}
          </DeliveryFee>
        </DeliveryFeeBlock>
        <TotalPriceBlock>
          <TotalPriceTitle>Total: </TotalPriceTitle>
          <TotalPrice>
            {currency === 'USD' ? '$ ' : '€ '}
            {currency === 'USD'
              ? props.cart.totalPriceUSD
              : props.cart.totalPriceEURO}
          </TotalPrice>
        </TotalPriceBlock>
        <CheckoutLink to="/cart">Chechout</CheckoutLink>
      </CartBlock>
    )
  ) : null;
};

function mapStateToProps(state: CartStateType) {
  return { cart: state.cart };
}

const connected = connect(mapStateToProps, actions)(CartList);
const pured = pure(connected);
export { pured as CartList };

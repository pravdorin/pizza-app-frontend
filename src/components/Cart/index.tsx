/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useCurrency } from '../../context/CurrencyProvider';
import * as actions from '../../redux/actions';
import { CartStateType } from '../../types';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Order = styled.div`
  box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 25px;
`;

const OrderBlockTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;

  margin: 20px;
  padding-top: 20px;

  @media (min-width: 1024px) {
    font-size: 28px;
    margin: 40px;
    padding-top: 40px;
  }
`;

const OrderBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const OrderBlockFlex = styled.div`
  @media (min-width: 1024px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

const OrderForm = styled.form`
  @media (min-width: 1024px) {
    max-width: 400px;
  }
`;

const Fieldset = styled.fieldset`
  border: none;
  background: #fff;
  color: #000;
  margin-top: 10px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
  }
`;

const FieldInput = styled.input`
  font-size: 20px;
  padding: 10px 20px;
  border: 1px solid #58abdb;
  border-radius: 5px;
`;

const LabelSpan = styled.span`
  margin-right: 25px;
`;

const OrderDetails = styled.div`
  margin-top: 20px;
  padding: 10px 20px;
  @media (min-width: 1024px) {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 25px;
    flex-grow: 0.5;
    padding: 20px 30px;
  }
`;

const OrderDetailsTitle = styled.h4``;

const OrderDetailsList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const OrderDetailsItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OrderDetailsPrice = styled.span`
  font-weight: bold;
`;

const OrderDetailsQuantity = styled.span`
  font-weight: bold;
`;

const OrderDetailsDelivery = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const OrderDetailsDeliveryTitle = styled.span``;

const OrderDetailsDeliveryPrice = styled.span`
  font-weight: 600;
`;

const OrderDetailsTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  @media (min-width: 1024px) {
    margin-top: 30px;
  }
`;

const OrderDetailsTotalTitle = styled.span``;

const OrderDetailsTotalPrice = styled.span`
  font-weight: 600;
`;

const OrderLinkBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  @media (min-width: 1024px) {
    justify-content: space-around;
    margin-top: 35px;
    padding-bottom: 25px;
  }
`;

const OrderLinkBack = styled(Link)`
  background: #fff;
  border: 1px solid #a8a6a6;
  border-radius: 5px;
  color: #000;
  text-decoration: none;
  font-size: 14px;
  text-transform: uppercase;
  text-align: center;
  padding: 10px 20px;

  @media (min-width: 1024px) {
    border: 2px solid #a8a6a6;
    font-size: 18px;
    padding: 20px 40px;
  }
`;

const OrderLinkNext = styled.button`
  background: #64b171;
  border: none;
  border-radius: 5px;
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  text-transform: uppercase;
  white-space: nowrap;
  text-align: center;
  padding: 10px 20px;

  @media (min-width: 1024px) {
    font-size: 18px;
    padding: 20px 40px;
  }
`;

interface CartProps {
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
  fetchPrefill: (url: string) => void;
  sendOrder: (formProps: any, cart: any, cb: () => void) => void;
  clearCart: () => void;
}

interface OrderProps {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: {
    USD: number;
    EUR: number;
  };
}

const Cart = ({
  cart,
  sendOrder,
  clearCart,
  fetchPrefill,
  handleSubmit,
  history,
}: InjectedFormProps & RouteComponentProps & CartProps) => {
  const { currency } = useCurrency()!;

  React.useEffect(() => {
    fetchPrefill('/prefill');
  }, []);

  const placeOrder = (formProps: any, dispatch: any, props: any) => {
    sendOrder(formProps, cart, () => {
      history.push('/');
    });
    localStorage.removeItem('cart');
    clearCart();
  };

  return (
    <Container>
      <Order>
        <OrderBlockTitle>My order</OrderBlockTitle>
        <OrderBlock>
          <OrderBlockFlex>
            <OrderForm onSubmit={handleSubmit(placeOrder)} id="order-form">
              <Fieldset>
                <Label htmlFor="name">
                  <LabelSpan>Name</LabelSpan>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    component={({ input: reduxFormProps, ...inputProps }) => (
                      <FieldInput {...reduxFormProps} {...inputProps} />
                    )}
                    initialValues
                    required
                  />
                </Label>
              </Fieldset>
              <Fieldset>
                <Label htmlFor="email">
                  <LabelSpan>Email</LabelSpan>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    component={({ input: reduxFormProps, ...inputProps }) => (
                      <FieldInput {...reduxFormProps} {...inputProps} />
                    )}
                    required
                  />
                </Label>
              </Fieldset>
              <Fieldset>
                <Label htmlFor="tel">
                  <LabelSpan>Phone</LabelSpan>
                  <Field
                    id="tel"
                    name="tel"
                    type="tel"
                    component={({ input: reduxFormProps, ...inputProps }) => (
                      <FieldInput {...reduxFormProps} {...inputProps} />
                    )}
                    autoComplete="none"
                    required
                  />
                </Label>
              </Fieldset>
              <Fieldset>
                <Label htmlFor="address">
                  <LabelSpan>Address</LabelSpan>
                  <Field
                    id="address"
                    name="address"
                    type="text"
                    component={({ input: reduxFormProps, ...inputProps }) => (
                      <FieldInput {...reduxFormProps} {...inputProps} />
                    )}
                    autoComplete="none"
                    required
                  />
                </Label>
              </Fieldset>
            </OrderForm>
            <OrderDetails>
              <OrderDetailsTitle>Order details</OrderDetailsTitle>
              <OrderDetailsList>
                {cart.items.map((item: OrderProps) => {
                  return (
                    <OrderDetailsItem key={item.id}>
                      <p>{item.name}</p>
                      <p>
                        <OrderDetailsQuantity>
                          {item.quantity}
                        </OrderDetailsQuantity>{' '}
                        x{' '}
                        <OrderDetailsPrice>
                          {currency === 'USD' ? '$ ' : '€ '}
                          {currency === 'USD' ? item.price.USD : item.price.EUR}
                        </OrderDetailsPrice>
                      </p>
                    </OrderDetailsItem>
                  );
                })}
              </OrderDetailsList>
              <OrderDetailsDelivery>
                <OrderDetailsDeliveryTitle>
                  Delivery fee
                </OrderDetailsDeliveryTitle>
                <OrderDetailsDeliveryPrice>
                  {' '}
                  {currency === 'USD' ? '$ ' : '€ '}
                  {currency === 'USD'
                    ? cart.deliveryFee.USD
                    : cart.deliveryFee.EUR}
                </OrderDetailsDeliveryPrice>
              </OrderDetailsDelivery>
              <OrderDetailsTotal>
                <OrderDetailsTotalTitle>Total</OrderDetailsTotalTitle>
                <OrderDetailsTotalPrice>
                  {' '}
                  {currency === 'USD' ? '$ ' : '€ '}
                  {currency === 'USD'
                    ? cart.totalPriceUSD
                    : cart.totalPriceEURO}
                </OrderDetailsTotalPrice>
              </OrderDetailsTotal>
            </OrderDetails>
          </OrderBlockFlex>
        </OrderBlock>
        <OrderLinkBlock>
          <OrderLinkBack to="/">Back</OrderLinkBack>
          <OrderLinkNext type="submit" form="order-form">
            Submit order
          </OrderLinkNext>
        </OrderLinkBlock>
      </Order>
    </Container>
  );
};

function mapStateToProps(state: any) {
  return {
    cart: state.cart,
    initialValues: {
      name: state.prefill[0]?.name,
      email: state.prefill[0]?.email,
      tel: state.prefill[0]?.tel,
      address: state.prefill[0]?.address,
    },
  };
}

export default compose<any>(
  connect(mapStateToProps, actions),
  reduxForm({
    form: 'order',
    enableReinitialize: true,
  })
)(Cart);

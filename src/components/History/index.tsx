/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useCurrency } from '../../context/CurrencyProvider';
import * as actions from '../../redux/actions';

const Container = styled.div`
  max-width: 1348px;
  margin: 0 auto;
  padding: 20px 40px;
`;

const OrderHistory = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const OrderHistoryTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 25px;
`;

const OrderHistoryList = styled.ul`
  list-style: none;
  margin: 20px 0 0 0;
  padding: 0;

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
`;

const EmptyHistoryList = styled.h5`
  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;
  margin-top: 25px;
`;

const OrderHistoryItemBlock = styled.li`
  list-style: none;
  box-shadow: 0 0 7px 2px rgba(0, 0, 0, 0.03);
  padding: 10px;
  min-width: 300px;

  @media (min-width: 1024px) {
    margin-left: 50px;
  }
`;

const OrderHistoryItemTitle = styled.h3`
  text-transform: uppercase;
  font-weight: 600;
`;

const OrderHistoryItemsList = styled.ul`
  margin: 0;
  padding: 0;
`;

const OrderHistoryItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const OrderHistoryName = styled.p``;

const OrderHistoryQuantityAndPrice = styled.p``;

const TotalPrice = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalPriceTitle = styled.span`
  font-weight: 600;
  font-size: 16px;
`;

const TotalPriceNumber = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #64b171;
`;

const LinkBack = styled(Link)`
  width: 100px;
  margin-top: 50px;
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
    font-size: 14px;
    padding: 10px 20px;
  }
`;

const History = (props: any) => {
  const [dataLoaded, setDataLoaded] = React.useState(false);
  const { currency } = useCurrency()!;
  React.useEffect(() => {
    props.fetchOrders('/orders');
    setDataLoaded(true);
  }, []);

  return dataLoaded ? (
    <Container>
      <OrderHistory>
        <OrderHistoryTitle>My orders history</OrderHistoryTitle>
        <OrderHistoryList>
          {props.orders.length === 0 ? (
            <EmptyHistoryList>
              We are waiting for your first orfderr
            </EmptyHistoryList>
          ) : (
            props.orders[0].map((order: any, index: number) => {
              return (
                <OrderHistoryItemBlock key={index + 1}>
                  <OrderHistoryItemTitle>
                    Order #{index + 1}
                  </OrderHistoryItemTitle>
                  <OrderHistoryItemsList>
                    {order.items.map((item: any, i: any) => {
                      return (
                        <OrderHistoryItem key={i}>
                          <OrderHistoryName>{item.name}</OrderHistoryName>
                          <OrderHistoryQuantityAndPrice>
                            {item.quantity} x {currency === 'USD' ? '$' : '€'}
                            {currency === 'USD'
                              ? item.price.USD
                              : item.price.EUR}
                          </OrderHistoryQuantityAndPrice>
                        </OrderHistoryItem>
                      );
                    })}
                  </OrderHistoryItemsList>
                  <TotalPrice>
                    <TotalPriceTitle>Total</TotalPriceTitle>
                    <TotalPriceNumber>
                      {currency === 'USD' ? '$ ' : '€ '}
                      {currency === 'USD'
                        ? order.totalPriceUSD
                        : order.totalPriceEURO}
                    </TotalPriceNumber>
                  </TotalPrice>
                </OrderHistoryItemBlock>
              );
            })
          )}
        </OrderHistoryList>
        <LinkBack to="/">Back</LinkBack>
      </OrderHistory>
    </Container>
  ) : null;
};

function mapStateToProps(state: any) {
  return { orders: state.orders };
}

const connected = connect(mapStateToProps, actions)(History);
export { connected as History };

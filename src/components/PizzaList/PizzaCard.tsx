import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useCurrency } from '../../context/CurrencyProvider';
import * as actions from '../../redux/actions';
import { CartStateType } from '../../types';

const PizzaImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  border-radius: 5px 5px 0 0;
  transition: transform 0.5s;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  max-width: 100%;
  background-color: hsl(0, 0%, 100%);
  box-shadow: 0 0 7px 2px rgba(0, 0, 0, 0.03);
  border-radius: 5px;

  &:hover ${PizzaImage} {
    transform: scale(1.2);
  }
`;

const InfoBlock = styled.div`
  height: 100%;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: space-between;
`;

const Name = styled.h4`
  font-size: 20px;
  font-weight: bold;
  color: #000;
  margin: 20px 0 0 0;
  padding-bottom: 15px;
`;

const Description = styled.h5`
  font-size: 16px;
  font-weight: 600;
  color: #857d7d;
  padding: 15px 0;
  margin: 0;
  flex-grow: 1;
`;

const PriceBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-self: baseline;
`;

const Price = styled.h5`
  font-size: 22px;
  font-weight: 600;
  color: #000;
  margin: 0;
`;

const AddItem = styled.span`
  padding: 10px 20px;
  background: #fff;
  color: #fc4c4c;
  border: 1px solid #fc4c4c;
  border-radius: 5px;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    background: #fc4c4c;
    color: #fff;
  }

  &:active {
    background: #a72020;
  }
`;

interface PizzaCardProps {
  id: string;
  name: string;
  price: {
    USD: number;
    EUR: number;
  };
  description: string;
  image: string;
  addToCart: (id: string, cur: string) => void;
}

const PizzaCard = (props: PizzaCardProps) => {
  const { currency } = useCurrency()!;

  const handleClick = (id: string, cur: string) => {
    props.addToCart(id, cur);
  };

  return (
    <Card>
      <PizzaImage src={`${props.image}`} alt={props.name} />
      <InfoBlock>
        <Name>{props.name}</Name>
        <Description>{props.description}</Description>
        <PriceBlock>
          <Price>
            {currency === 'USD' ? '$ ' : '€ '}
            {currency === 'USD' ? props.price.USD : props.price.EUR}
          </Price>
          <AddItem onClick={() => handleClick(props.id, currency)}>Add</AddItem>
        </PriceBlock>
      </InfoBlock>
    </Card>
  );
};

const mapStateToProps = (state: CartStateType) => {
  return {
    cart: state.cart,
  };
};

const connected = connect(mapStateToProps, actions)(PizzaCard);

export { connected as PizzaCard };

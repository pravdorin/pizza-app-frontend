import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import { PizzaCard } from './PizzaCard';

const Container = styled.div`
  max-width: 1348px;
  margin: 0 auto;
`;

const PizzaGrid = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 250px));
  justify-content: center;
  grid-gap: 40px;
  padding: 30px 0;

  @media (min-width: 1024px) {
    margin-top: 20px;
    grid-gap: 75px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 330px));
    justify-content: center;
  }
`;

interface DataProps {
  pizzas: Array<{}>;
  fetchPizzas: (url: string) => Promise<any>;
}

interface PizzaItem {
  id: string;
  name: string;
  price: {
    USD: number;
    EUR: number;
  };
  description: string;
  image: string;
}

const PizzaList: React.FC<DataProps> = (
  props: DataProps
): React.ReactElement => {
  React.useEffect(() => {
    props.fetchPizzas('/pizzas');
  }, []);

  return (
    <Container>
      <PizzaGrid>
        {props.pizzas &&
          props.pizzas.map((el: PizzaItem) => {
            return (
              <PizzaCard
                key={el.id}
                id={el.id}
                name={el.name}
                price={el.price}
                description={el.description}
                image={el.image}
              />
            );
          })}
      </PizzaGrid>
    </Container>
  );
};

function mapStateToProps(state: DataProps) {
  return { pizzas: state.pizzas };
}

const connected = connect(mapStateToProps, actions)(PizzaList);

export { connected as PizzaList };

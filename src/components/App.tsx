import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { Route, Switch } from 'react-router-dom';
import { CurrencyProvider } from '../context/CurrencyProvider';
import { TopHeader } from './TopHeader';
import { BottomHeader } from './BottomHeader';
import { PizzaList } from './PizzaList';
import { CartList } from './Cartlist';
import LoginForm from './BottomHeader/LoginForm';
import RegisterForm from './BottomHeader/RegisterForm';
import { History } from './History';
import { Signout } from './BottomHeader/Signout';
import Cart from './Cart';

const GlobalStyle = createGlobalStyle`
  ${normalize};
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

  body {
    font-family: 'Roboto', sans-serif;
  }
`;

const Header = styled.div`
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.06),
    inset 0 1px 3px 0 rgba(0, 0, 0, 0.5);
`;

const App: React.FC = () => {
  const [modal, setModal] = React.useState(false);
  const [busket, setBusket] = React.useState(false);

  return (
    <CurrencyProvider>
      <GlobalStyle />
      <Header>
        <TopHeader />
        <BottomHeader
          setModal={setModal}
          setBusket={setBusket}
          busket={busket}
        />
      </Header>
      <Switch>
        <Route path="/cart" exact component={Cart} />
        <Route
          path="/history"
          exact
          render={(props) => (
            <>
              <History />
              <CartList busket={busket} setBusket={setBusket} />
            </>
          )}
        />
        <Route
          path="/"
          render={(props) => (
            <>
              <PizzaList />
              <CartList busket={busket} setBusket={setBusket} />
            </>
          )}
        />
      </Switch>
      <Route
        path="/login"
        render={(prop) => (
          <LoginForm {...prop} modal={modal} setModal={setModal} />
        )}
      />
      <Route
        path="/register"
        render={(prop) => (
          <RegisterForm {...prop} modal={modal} setModal={setModal} />
        )}
      />
      <Route path="/signout" exact component={Signout} />
    </CurrencyProvider>
  );
};

export { App };

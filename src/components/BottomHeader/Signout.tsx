import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import * as actions from '../../redux/actions';

interface SignoutProps {
  signout: (cb: () => void) => void;
  clearCart: () => void;
}

const Signout: React.FC<RouteComponentProps> = ({
  signout,
  history,
  clearCart,
}: SignoutProps & RouteComponentProps) => {
  React.useEffect(() => {
    signout(() => {
      history.push('/');
    });
    localStorage.removeItem('cart');
    clearCart();
  }, []);

  return null;
};

const connected = connect(null, actions)(Signout);
export { connected as Signout };

import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SignInImage from '../../assets/login.svg';
import SignOutImage from '../../assets/logout.svg';
import HistoryImage from '../../assets/history.svg';
import { AuthStateType } from '../../types';

const SignInIcon = styled.img`
  height: 28px;
  width: 35px;
  margin-right: 20px;
  margin-bottom: 3px;
`;

const SignOutIcon = styled.img`
  height: 28px;
  width: 28px;
  margin-right: 20px;
`;

const HistoryIcon = styled.img`
  height: 28px;
  width: 28px;
  margin-right: 20px;
`;

interface AuthProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  authenticated: string;
}

const Auth: React.FC<AuthProps> = ({ authenticated, setModal }: AuthProps) => {
  const renderAuthIcon = () => {
    if (authenticated) {
      return (
        <>
          <Link to="/signout">
            <SignOutIcon src={SignOutImage} alt="" />
          </Link>
          <Link to="/history">
            <HistoryIcon src={HistoryImage} alt="" />
          </Link>
        </>
      );
    }
    return (
      <Link to="/login" onClick={() => setModal(true)}>
        <SignInIcon src={SignInImage} alt="" />
      </Link>
    );
  };
  return <>{renderAuthIcon()}</>;
};

function mapStateToProps(state: AuthStateType) {
  return { authenticated: state.auth.authenticated };
}

const connected = connect(mapStateToProps)(Auth);
export { connected as Auth };

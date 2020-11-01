import * as React from 'react';
import styled from 'styled-components';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../redux/actions';
import { AuthStateType } from '../../types';

const ModalBackground = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0%;
  left: 0%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const FormBlock = styled.div`
  width: 250px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;

  @media (min-width: 1024px) {
    width: 500px;
  }
`;

const Form = styled.form`
  border: 2px solid #fc4c4c;
  border-radius: 4px;
  background: #fff;
  padding: 15px 20px;

  @media (min-width: 1024px) {
    padding: 30px 40px;
    border: 3px solid #fc4c4c;
  }
`;

const FormTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
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
    align-items: center;
    justify-content: space-between;
  }
`;

const LabelText = styled.div`
  font-size: 18px;
  text-transform: uppercase;
`;

const FieldInput = styled.input`
  font-size: 20px;
  padding: 10px 20px;
  border: 1px solid #58abdb;
  border-radius: 5px;
`;

const LinkBlock = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  padding: 10px 30px;
`;

const SubmitButton = styled.button`
  background: #64b171;
  color: #fff;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  font-size: 14px;
  text-transform: uppercase;
  text-align: center;
  white-space: nowrap;
  padding: 10px 20px;

  @media (min-width: 1024px) {
    font-size: 14px;
    padding: 10px 20px;
  }
`;

const SignUpButton = styled(Link)`
  background: #5579da;
  color: #fff;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  font-size: 14px;
  text-transform: uppercase;
  text-align: center;
  white-space: nowrap;
  padding: 10px 20px;

  @media (min-width: 1024px) {
    font-size: 14px;
    padding: 10px 20px;
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #c52626;
`;

interface LoginFormProps {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  signin: any;
  history: any;
  errorMessage: string;
}

const LoginForm: React.FC<LoginFormProps> = (
  props: InjectedFormProps<LoginFormProps> & LoginFormProps
) => {
  const { handleSubmit } = props;

  const onSubmitSignIn = (formProps) => {
    props.signin(formProps, () => {
      props.history.push('/');
    });
  };
  return props.modal ? (
    <>
      <ModalBackground onClick={() => props.setModal(false)} />
      <FormBlock>
        <Form onSubmit={handleSubmit(onSubmitSignIn)}>
          <FormTitle>Enter Pizza App</FormTitle>
          <Fieldset>
            <Label htmlFor="email">
              <LabelText>Email</LabelText>
              <Field
                id="email"
                name="email"
                type="email"
                component={({ input: reduxFormProps, ...inputProps }) => (
                  <FieldInput {...reduxFormProps} {...inputProps} />
                )}
                autoComplete="none"
              />
            </Label>
          </Fieldset>
          <Fieldset>
            <Label htmlFor="password">
              <LabelText>Password</LabelText>
              <Field
                id="password"
                name="password"
                type="password"
                component={({ input: reduxFormProps, ...inputProps }: any) => (
                  <FieldInput {...reduxFormProps} {...inputProps} />
                )}
                autoComplete="none"
              />
            </Label>
          </Fieldset>
          <ErrorMessage>{props.errorMessage}</ErrorMessage>
          <LinkBlock>
            <SubmitButton type="submit">Sign In</SubmitButton>
            <SignUpButton to="/register">Sign Up</SignUpButton>
          </LinkBlock>
        </Form>
      </FormBlock>
    </>
  ) : null;
};

function mapStateToProps(state: AuthStateType): {} {
  return { errorMessage: state.auth.errorMessage };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default compose<any>(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signin' })
)(LoginForm);

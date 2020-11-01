/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
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
  margin-top: 20px;
`;

const Label = styled.label`
  position: relative;
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
  display: flex;
  justify-content: space-between;
  padding: 10px 30px;
`;

const LinkBack = styled(Link)`
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

const SubmitButton = styled.button`
  margin-top: 50px;
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

const ErrorMessage = styled.div`
  text-align: center;
  color: #c52626;
`;

const ValidationError = styled.span`
  position: absolute;
  bottom: -20px;
  left: 50%;
  font-size: 13px;
  font-weight: 600;
  color: #c52626;
  white-space: nowrap;
`;

const ValidationWarn = styled.span`
  position: absolute;
  bottom: -20px;
  left: 50%;
  font-size: 13px;
  font-weight: 600;
  color: #f0de41;
  white-space: nowrap;
`;

interface RegisterFormProps {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  signup: any;
  history: any;
  signupErrorMessage: string;
}

const required = (value: any) => (value ? undefined : 'Required');
const maxLength = (max: any) => (value: any) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const minLength = (min: any) => (value: any) =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength5 = minLength(5);
const number = (value: any) =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined;
const email = (value: any) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}: any) => {
  return (
    <Fieldset>
      <Label>
        <LabelText>{label}</LabelText>
        <FieldInput {...input} placeholder={label} type={type} />
        {touched &&
          ((error && <ValidationError>{error}</ValidationError>) ||
            (warning && <ValidationWarn>{warning}</ValidationWarn>))}
      </Label>
    </Fieldset>
  );
};

const RegisterForm = (
  props: InjectedFormProps<any> & any
): React.ReactElement | null => {
  const { error, handleSubmit, pristine, reset, submitting } = props;

  const onSubmitSignUp = (formProps: any) => {
    props.signup(formProps, () => {
      props.history.push('/');
    });
  };

  return props.modal ? (
    <>
      <ModalBackground onClick={() => props.setModal(false)} />
      <FormBlock>
        <Form onSubmit={handleSubmit(onSubmitSignUp)}>
          <FormTitle>Sign Up to Pizza App</FormTitle>
          <Field
            name="email"
            type="email"
            label="Email"
            component={renderField}
            validate={[email, required]}
          />
          <Field
            name="password"
            type="password"
            label="Password"
            component={renderField}
            validate={[maxLength15, minLength5, required]}
          />
          <Field
            name="name"
            type="text"
            label="Name"
            component={renderField}
            validate={required}
          />
          <Field
            name="tel"
            type="tel"
            label="Phone"
            component={renderField}
            validate={[number, required]}
          />
          <Field
            name="address"
            type="text"
            label="Address"
            component={renderField}
            validate={[maxLength15, minLength5, required]}
          />
          <ErrorMessage>{props.signupErrorMessage}</ErrorMessage>
          <LinkBlock>
            <LinkBack to="/login">Back</LinkBack>
            <SubmitButton>Sign Up</SubmitButton>
          </LinkBlock>
        </Form>
      </FormBlock>
    </>
  ) : null;
};

function mapStateToProps(state: AuthStateType): {} {
  return { signupErrorMessage: state.auth.signupErrorMessage };
}

export default compose<any>(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signup' })
)(RegisterForm);

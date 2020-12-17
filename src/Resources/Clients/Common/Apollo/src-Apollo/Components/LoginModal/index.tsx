import { LoginFormValues } from 'Common/FormValuesTypes';
import { getMinDesktopSize } from 'Common/Utils';
import { loginSchema } from 'Common/Validations';
import { FormikProps } from 'formik';
import React from 'react';
import styled from 'styled-components';
import { FormWrapper } from 'ui-kit/src';
import { Button, Input } from 'ui-kit/src/Custom';
import { getFormError, scrollToFirstError } from 'ui-kit/src/FormWrapper';

const Wrapper = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	@media (min-width: ${getMinDesktopSize}) {
		width: 80%;
		height: 80%;
		margin: 50px auto;
		padding: 30px;
	}
`;

const SubmitButton = styled(Button)`
	margin: 5px auto 0;
`;

const initialValues = {
	email: '',
	password: '',
};

const FormComponent = ({
	values,
	touched,
	errors,
	handleChange,
	handleBlur,
	handleSubmit,
}: FormikProps<LoginFormValues>): JSX.Element => {
	return (
		<Wrapper onSubmit={handleSubmit}>
			<Input
				id='email'
				type='email'
				placeholder='Email'
				value={values.email}
				onChange={handleChange}
				onBlur={handleBlur}
				error={getFormError(errors, touched, 'email')}
			/>
			<Input
				id='password'
				type='password'
				placeholder='Password'
				value={values.password}
				onChange={handleChange}
				onBlur={handleBlur}
				error={getFormError(errors, touched, 'password')}
				autoComplete='off'
			/>
			<SubmitButton backgroundColor='submit' type='submit' onClick={scrollToFirstError}>
				Login
			</SubmitButton>
		</Wrapper>
	);
};

const LoginModal = ({ onSubmit }: { onSubmit: (values: LoginFormValues) => any }): JSX.Element => {
	return (
		<FormWrapper initialValues={initialValues} validationSchema={loginSchema} onSubmit={onSubmit}>
			{FormComponent}
		</FormWrapper>
	);
};

export default LoginModal;

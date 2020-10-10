import { LoginFormValues } from 'Common/FormValuesTypes';
import { loginSchema } from 'Common/Validations';
import { FormWrapper } from '@bar/ui-kit';
import { Button, Input } from '@bar/ui-kit/src/Custom';
import { getFormError, scrollToFirstError } from '@bar/ui-kit/src/FormWrapper';
import { FormikProps } from 'formik';
import React from 'react';
import styled from 'styled-components';
import { ITheme } from '@bar/ui-kit/src/Theme';

const Wrapper = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	@media (min-width: ${({ theme }: { theme: ITheme }) => theme.mediaSizes.desktopMinSize}) {
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

const LoginModal = ({ onSubmit }: { onSubmit: (values: LoginFormValues) => any }) => {
	return (
		<FormWrapper initialValues={initialValues} validationSchema={loginSchema} onSubmit={onSubmit}>
			{FormComponent}
		</FormWrapper>
	);
};

const FormComponent = ({
	values,
	touched,
	errors,
	handleChange,
	handleBlur,
	handleSubmit,
}: FormikProps<LoginFormValues>) => {
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

export default LoginModal;

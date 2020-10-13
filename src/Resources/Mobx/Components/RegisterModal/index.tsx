import { RegisterFormValues } from 'Common/FormValuesTypes';
import { Role } from 'Common/Models';
import { GENERIC_STORE } from 'Common/StoreNames';
import { registerSchema } from 'Common/Validations';
import { FormWrapper } from 'ui-kit/src';
import { Button, Input, Select } from 'ui-kit/src/Custom';
import { getFormError, scrollToFirstError } from 'ui-kit/src/FormWrapper';
import { FormikProps } from 'formik';
import { GenericStore } from 'Logic/Stores';
import { inject, observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.form`
	width: 80%;
	height: 80%;
	margin: 20px auto;
	padding: 30px;
	overflow: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const SubmitButton = styled(Button)`
	margin-top: 15px;
`;

const initialValues = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	phoneNumber: '',
	role: 0,
	birthDate: '',
};

const RegisterModal = ({ onSubmit }: { onSubmit: (values: RegisterFormValues) => any }) => {
	return <RegisterModalComponent onSubmit={onSubmit} />;
};

const RegisterModalComponent = inject(GENERIC_STORE)(
	observer(
		({
			onSubmit,
			genericStore,
		}: {
			onSubmit: (values: RegisterFormValues) => any;
			genericStore?: GenericStore;
		}) => {
			const roleOptions = genericStore
				? genericStore.getModels('Role').map(({ name, _id }: Role) => {
						return { value: _id, label: name };
				  })
				: [];

			const FormComponent = ({
				values,
				touched,
				errors,
				handleChange,
				handleBlur,
				handleSubmit,
			}: FormikProps<RegisterFormValues>) => {
				return (
					<Wrapper onSubmit={handleSubmit}>
						<Input
							id='firstName'
							placeholder='First Name'
							value={values.firstName}
							onChange={handleChange}
							onBlur={handleBlur}
							error={getFormError(errors, touched, 'firstName')}
						/>
						<Input
							id='lastName'
							placeholder='Last Name'
							value={values.lastName}
							onChange={handleChange}
							onBlur={handleBlur}
							error={getFormError(errors, touched, 'lastName')}
						/>
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
						<Input
							id='phoneNumber'
							type='tel'
							placeholder='Phone Number'
							value={values.phoneNumber}
							onChange={handleChange}
							onBlur={handleBlur}
							error={getFormError(errors, touched, 'phoneNumber')}
						/>
						<Select
							id='role'
							placeholder='Roles'
							value={values.role}
							onChange={handleChange}
							onBlur={handleBlur}
							options={[{ value: '0', label: '-- Select a Role --', disabled: true }, ...roleOptions]}
							error={getFormError(errors, touched, 'role')}
						/>
						<Input
							id='birthDate'
							placeholder='Birth Date'
							type='date'
							value={values.birthDate}
							onChange={handleChange}
							onBlur={handleBlur}
							error={getFormError(errors, touched, 'birthDate')}
						/>
						<SubmitButton backgroundColor='submit' type='submit' onClick={scrollToFirstError}>
							Register
						</SubmitButton>
					</Wrapper>
				);
			};

			return (
				<FormWrapper initialValues={initialValues} validationSchema={registerSchema} onSubmit={onSubmit}>
					{FormComponent}
				</FormWrapper>
			);
		},
	),
);

export default RegisterModal;

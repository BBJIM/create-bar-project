import { GenericFormValues } from 'Common/FormValuesTypes';
import { simpleFormSchema } from 'Common/Validations';
import { Button, Checkbox, Input, Radio, Range, Select, Textarea } from 'ui-kit/src/Custom';
import FormWrapper, { getFormError, scrollToFirstError } from 'ui-kit/src/FormWrapper';
import { FormikProps } from 'formik';
import React from 'react';
import styled from 'styled-components';
import { Theme } from 'ui-kit/src/Theme';

const Wrapper = styled.form`
	min-width: 300px;
	max-width: 440px;
	width: 80%;
	height: 80%;
	margin: 50px auto;
	padding: 30px;
	box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
	border-radius: 10px;
	background: ${({ theme }: { theme: Theme }): string => theme.colors.white};
`;

const SubmitButton = styled(Button)`
	margin-top: 15px;
`;

const P = styled.p`
	max-width: 100%;
`;

const initialValues = {
	name: '',
	email: '',
	phoneNumber: '',
	text: '',
	file: null,
	files: null,
	select: '0',
	checkbox: false,
	checkbox2: true,
	date: '',
	radio: 'radio',
	range: 0,
};

const onSubmit = (values: GenericFormValues): void => {
	console.log(values);
};

const FormComponent = ({
	values,
	touched,
	errors,
	handleChange,
	handleBlur,
	handleSubmit,
	setFieldValue,
}: FormikProps<GenericFormValues>): JSX.Element => {
	return (
		<Wrapper onSubmit={handleSubmit}>
			<Input
				id='name'
				placeholder='Full Name'
				value={values.name}
				onChange={handleChange}
				onBlur={handleBlur}
				error={getFormError(errors, touched, 'name')}
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
				id='phoneNumber'
				type='tel'
				placeholder='Phone Number'
				value={values.phoneNumber}
				onChange={handleChange}
				onBlur={handleBlur}
				error={getFormError(errors, touched, 'phoneNumber')}
			/>
			<Input
				id='file'
				type='file'
				multiple
				placeholder='File'
				onChange={(event): void => {
					setFieldValue('file', event.currentTarget.files[0]);
				}}
				onBlur={handleBlur}
				error={getFormError(errors, touched, 'file')}
			/>
			<Input
				id='files'
				type='file'
				multiple
				placeholder='Multi Files'
				onChange={(event): void => {
					setFieldValue('files', event.currentTarget.files);
				}}
				onBlur={handleBlur}
				error={getFormError(errors, touched, 'files')}
			/>
			<Textarea
				id='text'
				placeholder='Text'
				value={values.text}
				onChange={handleChange}
				onBlur={handleBlur}
				error={getFormError(errors, touched, 'text')}
			/>
			<Select
				id='select'
				placeholder='Select'
				value={values.select}
				onChange={handleChange}
				onBlur={handleBlur}
				options={[
					{ value: '0', label: '-- Select an option --', disabled: true },
					{ value: '1', label: '1' },
					{ value: '2', label: '2' },
					{ value: '3', label: '3' },
				]}
				error={getFormError(errors, touched, 'select')}
			/>
			<Input
				id='date'
				placeholder='Date'
				type='date'
				value={values.date}
				onChange={handleChange}
				onBlur={handleBlur}
				error={getFormError(errors, touched, 'date')}
			/>
			<Checkbox
				id='checkbox'
				checked={values.checkbox}
				placeholder='Checkbox'
				value={`${values.checkbox}`}
				onChange={handleChange}
				onBlur={handleBlur}
				error={getFormError(errors, touched, 'checkbox')}
			/>
			<Checkbox
				id='checkbox2'
				checked={values.checkbox2}
				placeholder='Checkbox2'
				value={`${values.checkbox2}`}
				onChange={handleChange}
				onBlur={handleBlur}
				error={getFormError(errors, touched, 'checkbox2')}
			/>
			<Radio
				id='radio'
				name='radio'
				placeholder='Radio'
				value='radio'
				checked={values.radio === 'radio'}
				onChange={handleChange}
				onBlur={handleBlur}
				error={getFormError(errors, touched, 'radio')}
			/>
			<Radio
				id='radio1'
				name='radio'
				placeholder='Radio1'
				value='radio1'
				checked={values.radio === 'radio1'}
				onChange={handleChange}
				onBlur={handleBlur}
				error={getFormError(errors, touched, 'radio')}
			/>
			<Radio
				id='radio2'
				name='radio'
				placeholder='Radio2'
				value='radio2'
				checked={values.radio === 'radio2'}
				onChange={handleChange}
				onBlur={handleBlur}
				error={getFormError(errors, touched, 'radio')}
			/>
			<Radio
				id='radio3'
				name='radio'
				placeholder='Radio3'
				value='radio3'
				checked={values.radio === 'radio3'}
				onChange={handleChange}
				onBlur={handleBlur}
				error={getFormError(errors, touched, 'radio')}
			/>
			<Range
				id='range'
				placeholder='Range'
				value={values.range}
				onChange={handleChange}
				onBlur={handleBlur}
				error={getFormError(errors, touched, 'range')}
			/>
			<SubmitButton backgroundColor='submit' type='submit' onClick={scrollToFirstError}>
				Submit
			</SubmitButton>
			<P>Look at console after submit</P>
		</Wrapper>
	);
};

const Form = (): JSX.Element => {
	return (
		<FormWrapper initialValues={initialValues} validationSchema={simpleFormSchema} onSubmit={onSubmit}>
			{FormComponent}
		</FormWrapper>
	);
};

export default Form;

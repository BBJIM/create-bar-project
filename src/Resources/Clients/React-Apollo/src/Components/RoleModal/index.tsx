import { useMutation } from '@apollo/client';
import { alertMessage, hideAfterTimeSec } from 'Common/AlertMessage';
import { RoleFormValues } from 'Common/FormValuesTypes';
import { Role } from 'Common/Models';
import { roleSchema } from 'Common/Validations';
import { FormikProps } from 'formik';
import { closeModal } from 'Logic/Modal';
import { CREATE_ROLE, LOCAL_UPDATE_ROLES, UPDATE_ROLE } from 'Logic/Role';
import { setBlockedUi } from 'Logic/UI';
import React from 'react';
import styled from 'styled-components';
import { FormWrapper } from 'ui-kit/src';
import { Button, Input } from 'ui-kit/src/Custom';
import { getFormError, scrollToFirstError } from 'ui-kit/src/FormWrapper';

const Wrapper = styled.form`
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

type Props = {
	initialData?: RoleFormValues;
};

const RoleModal = ({ initialData = { name: '' } }: Props): JSX.Element => {
	const isUpdate = initialData.name !== '';
	return <RoleModalComponent initialData={initialData} isUpdate={isUpdate} />;
};

// you could make a dynamic modal form component that is generic that gets props if you want
const RoleModalComponent = ({ initialData, isUpdate }: Props & { isUpdate: boolean }) => {
	const FormComponent = ({
		values,
		touched,
		errors,
		handleChange,
		handleBlur,
		handleSubmit,
	}: FormikProps<RoleFormValues>): JSX.Element => {
		return (
			<Wrapper onSubmit={handleSubmit}>
				<Input
					id='name'
					placeholder='Role Name'
					value={values.name}
					onChange={handleChange}
					onBlur={handleBlur}
					error={getFormError(errors, touched, 'name')}
				/>
				<SubmitButton backgroundColor='submit' type='submit' onClick={scrollToFirstError}>
					{isUpdate ? 'Update Role' : 'Add New Role'}
				</SubmitButton>
			</Wrapper>
		);
	};

	const [updateRole] = useMutation(UPDATE_ROLE);
	const [createRole] = useMutation(CREATE_ROLE);
	const [updateRoles] = useMutation(LOCAL_UPDATE_ROLES);

	const onSubmit = async (values: Role): Promise<void> => {
		setBlockedUi(true);
		try {
			if (isUpdate) {
				await updateRole({
					variables: {
						...values,
					},
				});
			} else {
				await createRole({
					variables: {
						...values,
					},
				});
			}
			updateRoles({ variables: { ...values } });
		} catch (err) {
			alertMessage.error(err.message || err, { hideAfter: hideAfterTimeSec });
		}
		closeModal();
		setBlockedUi(false);
	};

	return (
		<FormWrapper initialValues={initialData} validationSchema={roleSchema} onSubmit={onSubmit}>
			{FormComponent}
		</FormWrapper>
	);
};

export default RoleModal;

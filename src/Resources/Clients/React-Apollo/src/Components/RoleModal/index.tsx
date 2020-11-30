import { RoleFormValues } from 'Common/FormValuesTypes';
import { GENERIC_STORE, MODAL_STORE, UI_STORE } from 'Common/StoreNames';
import { roleSchema } from 'Common/Validations';
import { FormWrapper } from 'ui-kit/src';
import { Button, Input } from 'ui-kit/src/Custom';
import { getFormError, scrollToFirstError } from 'ui-kit/src/FormWrapper';
import { FormikProps } from 'formik';
import { GenericStore, ModalStore, UiStore } from 'Logic/Stores';
import { inject, observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

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

type WithStoresProps = {
	genericStore?: GenericStore;
	modalStore?: ModalStore;
	uiStore?: UiStore;
	isUpdate: boolean;
};

type Props = {
	initialData?: RoleFormValues;
};

const RoleModal = ({ initialData = { name: '' } }: Props): JSX.Element => {
	const isUpdate = initialData.name !== '';
	return <RoleModalComponent initialData={initialData} isUpdate={isUpdate} />;
};

// you could make a dynamic modal form component that is generic that gets props if you want
const RoleModalComponent = inject(
	GENERIC_STORE,
	MODAL_STORE,
	UI_STORE,
)(
	observer(({ genericStore, modalStore, uiStore, initialData, isUpdate }: Props & WithStoresProps) => {
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

		const onSubmit = async (values: RoleFormValues): Promise<void> => {
			uiStore?.blockUI();
			if (isUpdate) {
				await genericStore?.update('Role', values);
			} else {
				await genericStore?.create('Role', values);
			}
			modalStore?.closeModal();
			uiStore?.unBlockUI();
		};

		return (
			<FormWrapper initialValues={initialData} validationSchema={roleSchema} onSubmit={onSubmit}>
				{FormComponent}
			</FormWrapper>
		);
	}),
);

export default RoleModal;

import { useMutation, useQuery } from '@apollo/client';
import { alertMessage, hideAfterTimeSec } from 'Common/AlertMessage';
import { RoleFormValues } from 'Common/FormValuesTypes';
import { RoleModal } from 'Components';
import { openModal } from 'Logic/Modal';
import { DELETE_ROLE, LOCAL_DELETE_ROLES, useRoleQuery } from 'Logic/Role';
import { GET_UI_STATE, setBlockedUi } from 'Logic/UI';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Table } from 'ui-kit/src';
import { Button } from 'ui-kit/src/Custom';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const TableButton = styled(Button)`
	margin: 50px auto;
`;

const TablePage = () => {
	const { data: uiStateData } = useQuery(GET_UI_STATE);
	const { blockedUiState } = uiStateData;
	const roles = useRoleQuery();
	// you can build dynamic data and columns if you want and make a generic table
	const columns = useMemo(
		() => [
			{
				Header: 'Role Id',
				accessor: '_id', // accessor is the "key" in the data
			},
			{
				Header: 'Role Name',
				accessor: 'name',
			},
		],
		[],
	);
	const [roleRemoveById] = useMutation(DELETE_ROLE);
	const [deleteRoles] = useMutation(LOCAL_DELETE_ROLES);

	return (
		<Wrapper>
			<Table
				loading={blockedUiState}
				columns={columns}
				data={roles}
				onRowDoubleClick={(rowData: RoleFormValues): void => {
					openModal({
						component: <RoleModal initialData={rowData} />,
						header: 'Update Role',
					});
				}}
				CheckboxSubmitComponent={(idArray: string[]): JSX.Element => {
					return (
						<TableButton
							onClick={async (): Promise<void> => {
								if (idArray && idArray.length > 0) {
									setBlockedUi(true);
									try {
										await roleRemoveById({
											variables: {
												_id: idArray,
											},
										});
										deleteRoles({ variables: { ids: idArray } });
									} catch (err) {
										alertMessage.error(err.message || err, { hideAfter: hideAfterTimeSec });
									}
									setBlockedUi(false);
								}
							}}
						>
							Delete Selected
						</TableButton>
					);
				}}
			/>
			<TableButton
				onClick={(): void => {
					openModal({
						component: <RoleModal />,
						header: 'Add Role',
					});
				}}
			>
				Add Role
			</TableButton>
		</Wrapper>
	);
};

export default TablePage;

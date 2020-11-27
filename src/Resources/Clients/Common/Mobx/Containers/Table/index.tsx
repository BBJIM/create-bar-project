import { RoleFormValues } from 'Common/FormValuesTypes';
import { GENERIC_STORE, MODAL_STORE, UI_STORE } from 'Common/StoreNames';
import { RoleModal } from 'Components';
import { GenericStore, ModalStore, UiStore } from 'Logic/Stores';
import { inject, observer } from 'mobx-react';
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

type Props = { genericStore?: GenericStore; modalStore?: ModalStore; uiStore?: UiStore };

const TablePage = (): JSX.Element => {
	return <TablePageComponent />;
};

const TablePageComponent = inject(
	GENERIC_STORE,
	MODAL_STORE,
	UI_STORE,
)(
	observer(({ genericStore, modalStore, uiStore }: Props) => {
		const data = genericStore?.getModels('Role');
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

		return (
			<Wrapper>
				<Table
					loading={uiStore?.getBlockedUi}
					columns={columns}
					data={data}
					onRowDoubleClick={(rowData: RoleFormValues): void => {
						modalStore?.openModal({
							component: <RoleModal initialData={rowData} />,
							header: 'Update Role',
						});
					}}
					CheckboxSubmitComponent={(idArray: string[]): JSX.Element => {
						return (
							<TableButton
								onClick={async (): Promise<void> => {
									if (idArray && idArray.length > 0) {
										uiStore?.blockUI();
										await genericStore?.delete('Role', idArray);
										uiStore?.unBlockUI();
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
						modalStore?.openModal({
							component: <RoleModal />,
							header: 'Add Role',
						});
					}}
				>
					Add Role
				</TableButton>
			</Wrapper>
		);
	}),
);

export default TablePage;

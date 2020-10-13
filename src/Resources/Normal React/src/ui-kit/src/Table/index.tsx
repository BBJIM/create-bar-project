import React from 'react';
import { TableOptions, useRowSelect, useTable } from 'react-table';
import styled, { css } from 'styled-components';
import { ITheme } from 'ui-kit/src/Theme';
import { Checkbox, Headline } from '../Custom';

// for more info about react-table: https://react-table.tanstack.com/docs/overview

type Props = TableOptions<any> & {
	onRowDoubleClick?: (rowInfo: any) => any;
	loading?: boolean;
	withCheckbox?: boolean;
	CheckboxSubmitComponent?: (idArray: string[]) => any;
};

const TableComponent = styled.table`
	border-radius: 5px;
	font-size: ${({ theme }: { theme: ITheme }) => theme.typography.texts.sizes.small};
	border: none;
	border-collapse: collapse;
	width: 100%;
	background-color: ${({ theme }: { theme: ITheme }) => theme.colors.backgorund};
	margin: 10px auto;
`;

const TableHead = styled.thead``;

const TableBody = styled.tbody``;

const TableRow = styled.tr``;

const TableHeader = styled.th`
	text-align: center;
	padding: 8px;
	color: ${({ theme }: { theme: ITheme }) => theme.colors.white};
	background: ${({ theme }: { theme: ITheme }) => theme.colors.lightGreen};
	border: 1px solid ${({ theme }: { theme: ITheme }) => theme.colors.lightGreen};
`;

const TableData = styled.td`
	text-align: center;
	padding: 8px;
	border: 1px solid ${({ theme }: { theme: ITheme }) => theme.colors.lightGreen};
	font-size: 12px;
`;

const Header = styled(Headline)`
	margin: 50px auto;
	text-align: center;
`;

const InputAllWrapperCSS = css`
	width: fit-content;
	margin: auto;
`;

const RowSelectHeaderCheckbox = ({ getToggleAllRowsSelectedProps }: { getToggleAllRowsSelectedProps: any }) => (
	<Checkbox allInputWrapperCSS={InputAllWrapperCSS} {...getToggleAllRowsSelectedProps()} displayName='Header' />
);

const RowSelectCellCheckbox = ({ row }: { row: any }) => (
	<Checkbox
		allInputWrapperCSS={InputAllWrapperCSS}
		{...row.getToggleRowSelectedProps()}
		onDoubleClick={(e) => e.preventDefault()}
		displayName='Cell'
	/>
);

const rowSelectArr = [
	useRowSelect,
	(hooks: any) => {
		hooks.visibleColumns.push((tableColumns: any) => [
			{
				id: 'selection',
				Header: RowSelectHeaderCheckbox,
				Cell: RowSelectCellCheckbox,
			},
			...tableColumns,
		]);
	},
];

const Table = ({
	columns,
	data,
	onRowDoubleClick,
	loading,
	withCheckbox = true,
	CheckboxSubmitComponent,
	...rest
}: Props) => {
	const useRowSelectArr = withCheckbox ? rowSelectArr : [];

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, selectedFlatRows } = useTable(
		{ columns, data, ...rest },
		...useRowSelectArr,
	);

	return (
		<>
			<TableComponent {...getTableProps()}>
				<TableHead>
					{headerGroups.map((headerGroup) => {
						const { key: headerKey, ...restHeaderProps } = headerGroup.getHeaderGroupProps();
						return (
							<TableRow key={headerKey} {...restHeaderProps}>
								{headerGroup.headers.map((column) => {
									const { key: columnKey, ...restColumnProps } = column.getHeaderProps();
									return (
										<TableHeader key={columnKey} {...restColumnProps}>
											{column.render('Header')}
										</TableHeader>
									);
								})}
							</TableRow>
						);
					})}
				</TableHead>
				<TableBody {...getTableBodyProps()}>
					{rows.map((row) => {
						prepareRow(row);
						const { key: rowKey, ...restRowProps } = row.getRowProps();
						return (
							<TableRow
								key={rowKey}
								{...restRowProps}
								onDoubleClick={() => {
									if (onRowDoubleClick) {
										onRowDoubleClick(row.original);
									}
								}}
							>
								{row.cells.map((cell) => {
									const { key: cellKey, ...restCellProps } = cell.getCellProps();
									return (
										<TableData key={cellKey} {...restCellProps}>
											{cell.render('Cell')}
										</TableData>
									);
								})}
							</TableRow>
						);
					})}
				</TableBody>
			</TableComponent>
			{rows.length === 0 && <Header>{loading ? 'LOADING...' : 'NO DATA'}</Header>}
			{CheckboxSubmitComponent &&
				CheckboxSubmitComponent(selectedFlatRows.map(({ original }: any) => original._id))}
		</>
	);
};

export default Table;

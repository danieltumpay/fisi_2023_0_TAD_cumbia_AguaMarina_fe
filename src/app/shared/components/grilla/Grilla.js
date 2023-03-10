import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React from "react";
import styled from "styled-components";
import { CustomNoRowsOverlay } from "./CustomNoRowsOverlay";
import { CustomPagination } from "./CustomPagination";

const Container = styled.div`
	height: 310px;
	width: 100%;
	background: var(--color-white);
`;

export const Grilla = ({
	rows = [],
	columns = [],
	setSelectedRows,
	children,
	isDataLoad = false,
}) => {
	return (
		<Container>
			<DataGrid
				rows={rows}
				columns={columns}
				components={{
					Toolbar: GridToolbar,
					Pagination: CustomPagination,
					NoRowsOverlay: CustomNoRowsOverlay,
				}}
				disableColumnFilter
				checkboxSelection={setSelectedRows ? true : false}
				onSelectionModelChange={(newSelectionModel) => {
					setSelectedRows(newSelectionModel);
				}}
				hideFooterSelectedRowCount
				disableSelectionOnClick
				loading={isDataLoad}
			/>
			{children}
		</Container>
	);
};

import { GridToolbarContainer, GridColDef, DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/store/configureStore";
import CustomerSearch from "../customerSearch/CustomerSearch";

interface Props {
  columns: GridColDef[];
  rows: object[];
  slug: string;
}

const DataTableCustomer = (props: Props) => {
  const { user } = useAppSelector((state) => state.account);

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer className="custom-toolbar">
        <CustomerSearch />
      </GridToolbarContainer>
    );
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 180,
    renderCell: (params) => {
      return (
        <>
          {user && user.roles?.includes("Admin") && (
            <div className="action">
              <Link to={`/${props.slug}/${params.row.id}`}>
                <img src="/view.svg" alt="" />
              </Link>
            </div>
          )}
        </>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
        getRowId={(row) => row.id}
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        slots={{ toolbar: CustomToolbar }}
        hideFooterPagination
        checkboxSelection={false}
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
        disableColumnMenu
      />
    </div>
  );
};

export default DataTableCustomer;

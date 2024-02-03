import { DataGrid, GridColDef, GridToolbarContainer } from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../../app/slice/basketSlice";
import ProductSearch from "../productSearch/ProductSearch";

interface Props {
  columns: GridColDef[];
  rows: object[];
  slug: string;
}

const DataTable = (props: Props) => {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer className="custom-toolbar">
        <ProductSearch />
      </GridToolbarContainer>
    );
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 180,
    renderCell: (params) => {
      return (
        <div className="action">
          <Link to={`/${props.slug}/${params.row.id}`}>
            <img src="/view.svg" alt="" />
          </Link>
          <LoadingButton
            loading={status.includes("pendingAddItem" + params.row.id)}
            onClick={() =>
              dispatch(addBasketItemAsync({ productId: params.row.id }))
            }
            size="small"
          >
            <img src="/basket.svg" alt="" />
          </LoadingButton>

          <div className="delete">
            <img src="/delete.svg" alt="" />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        slots={{ toolbar: CustomToolbar }}
        hideFooterPagination
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
        disableColumnMenu
      />
    </div>
  );
};

export default DataTable;

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
  handleIsWeighedClick: (row: any) => void;
  isWeighedMap: Record<number, boolean>;
}

const DataTable = (props: Props) => {
  const { status } = useAppSelector((state) => state.basket);
  const { user } = useAppSelector((state) => state.account);
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
          {user && (
            <>
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
            </>
          )}
        </div>
      );
    },
  };

  const isWeighedColumn: GridColDef = {
    field: "isWeighed",
    headerName: "Is Weighed",
    width: 100,
    type: "boolean",
    renderCell: (params) => (
      <>
        {user && (
          <div onClick={() => props.handleIsWeighedClick(params.row)}>
            {params.value ? (
              <span style={{ color: "blue" }}>&#x2717;</span>
            ) : (
              <span style={{ color: "violet" }}>&#x2713;</span>
            )}
          </div>
        )}
      </>
    ),
  };

  return (
    <div className="dataTable">
      <DataGrid
        getRowId={(row) => row.id}
        className="dataGrid"
        rows={props.rows.map((row: any) => ({
          ...row,
          isWeighed: props.isWeighedMap[row.id],
        }))}
        columns={[...props.columns, isWeighedColumn, actionColumn]}
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

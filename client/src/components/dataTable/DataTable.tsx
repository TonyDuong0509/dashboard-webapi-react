import { DataGrid, GridColDef, GridToolbarContainer } from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../../app/slice/basketSlice";
import ProductSearch from "../productSearch/ProductSearch";
import { useState } from "react";
import agent from "../../app/api/agent";
import { removeProduct } from "../../app/slice/productSlice";

interface Props {
  columns: GridColDef[];
  rows: object[];
  slug: string;
  handleIsWeighedClick: (row: any) => void;
  isWeighedMap: Record<number, boolean>;
}

const DataTable = (props: Props) => {
  const { status, basket } = useAppSelector((state) => state.basket);
  const { user } = useAppSelector((state) => state.account);
  const [addedToBasket, setAddedToBasket] = useState<{
    [key: number]: boolean;
  }>({});

  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState(0);
  const dispatch = useAppDispatch();

  function handleDeleteProduct(id: number) {
    setLoading(true);
    setTarget(id);
    agent.Admin.deleteProduct(id)
      .then(() => dispatch(removeProduct(id)))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

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
      const isInBasket = basket?.items.some(
        (item) => item.productId === params.row.id
      );

      const basketItem = basket?.items.find(
        (item) => item.productId === params.row.id
      );
      const isMaxQuantityReached =
        basketItem && basketItem.quantity >= params.row.quantity;

      const handleAddToBasket = () => {
        if (!params.row.quantity || addedToBasket[params.row.id]) return;

        dispatch(
          addBasketItemAsync({
            productId: params.row.id,
            quantity: params.row.quantity,
          })
        );
        setAddedToBasket((prev) => ({
          ...prev,
          [params.row.id]: true,
        }));
      };

      return (
        <div className="action">
          <Link to={`/${props.slug}/${params.row.id}`}>
            <img src="/view.svg" alt="" />
          </Link>
          {user && (
            <>
              {!isInBasket && !isMaxQuantityReached && (
                <LoadingButton
                  loading={status.includes("pendingAddItem" + params.row.id)}
                  onClick={handleAddToBasket}
                  size="small"
                >
                  <img src="/basket.svg" alt="" />
                </LoadingButton>
              )}
              <LoadingButton
                loading={loading && target === params.row.id}
                onClick={() => handleDeleteProduct(params.row.id)}
              >
                <img src="/delete.svg" />
              </LoadingButton>
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

export default DataTable;

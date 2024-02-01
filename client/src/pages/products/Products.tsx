import { useEffect, useState } from "react";
import "./Products.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import { Product } from "../../app/models/product";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 40 },
  {
    field: "pictureUrl",
    headerName: "Image",
    width: 70,
    renderCell: (params) => {
      return (
        <img
          src={params.row.pictureUrl || "/noavatar.png"}
          alt={params.row.name}
        />
      );
    },
  },
  {
    field: "name",
    type: "string",
    headerName: "Owner",
    width: 120,
  },
  {
    field: "description",
    type: "string",
    headerName: "Description",
    width: 120,
  },
  {
    field: "cod",
    type: "number",
    headerName: "COD (VNĐ)",
    width: 110,
  },
  {
    field: "weight",
    type: "number",
    headerName: "Weight",
    width: 70,
  },
  {
    field: "type",
    headerName: "Type",
    width: 70,
    type: "string",
  },
  {
    field: "brand",
    headerName: "Brand",
    width: 80,
    type: "string",
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 80,
    type: "number",
  },
  {
    field: "status",
    headerName: "Status",
    width: 80,
    type: "boolean",
  },
  {
    field: "date",
    headerName: "Time",
    width: 100,
    type: "string",
  },
];

const Products = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="products">
      <div className="info">
        <h1>List Products</h1>
        <button onClick={() => setOpen(true)}>Add New Product</button>
      </div>
      <DataTable slug="products" columns={columns} rows={products} />
      {open && <Add slug="product" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Products;

import { adminProducts } from "../../stores/actions";
import { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import {UpdateProduct} from "../../stores/actions"




export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(adminProducts());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        field: "image",
        headerName: "Imagen",
        width: 60,
        renderCell: (params) => <Avatar src={params.row.image} />,
        sortable: false,
        filterable: false,
      },
      { field: "name", headerName: "Name", editable: true, width: 140 },
      { field: "hidden", headerName: "Estado", width: 200 },
      { field: "stock", headerName: "Stock", width: 120 },
      { field: "_id", headerName: "Id", width: 220 },
    ],
    []
  );
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);

  const handleEdit = (e) => {
    const { _id } = e.row;
    const obj = e.row
    UpdateProduct(_id, obj);
   
  };



  return (
    <Box
      sx={{
        height: 460,
        width: "80%",
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: "center", mt: 15, mb: 10 }}
      >
        Productos
      </Typography>

      <DataGrid
        sx={{ ml: 35 }}
        columns={columns}
        rows={users}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        onCellFocusOut={(e) => handleEdit(e)}
        editMode="row"
        
      />
    </Box>
  );
}
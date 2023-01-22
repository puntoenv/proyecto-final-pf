import { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { allUsers } from "../../../stores/actions";
import { useSelector, useDispatch } from "react-redux";
export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const columns = useMemo(
    () => [
      {
        field: 'image',
        headerName: 'Imagen',
        width: 60,
        renderCell: (params) => <Avatar src={params.row.image} />,
        sortable: false,
        filterable: false,
      },
      { field: "name", headerName: "Name", width: 140 },
      { field: "email", headerName: "Email", width: 200 },
      { field: "pets.length", headerName: "Posts", width: 120 },
      { field: "_id", headerName: "Id", width: 220 },
    ],
    []
  );
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);

  useEffect(() => {
    dispatch(allUsers());
  }, [dispatch]);

  return (
    <Box
      sx={{
        height: 400,
        width: "80%",
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: "center", mt: 15, mb: 10 }}
      >
        Usuarios
      </Typography>
      {/* <div className={styles.grid}> */}
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
        onCellEditCommit={(params) => setRowId(params.id)}
        
      />
    </Box>
  );
}
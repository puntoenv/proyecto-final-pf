import { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { adminPets } from "../../../stores/actions";
import { useSelector, useDispatch } from "react-redux";
import style from "./style.module.css";


export default function Pets() {
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.mascotas.adminPets);
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
      { field: "name", headerName: "Nombre", width: 140 },
      { field: "type", headerName: "Especie", width: 140 },
      { field: "age", headerName: "Edad", width: 100 },
      { field: "gender", headerName: "Género", width: 150 },
      { field: "size", headerName: "Tamaño", width: 150 },
      { field: "contactAdoption", headerName: "Contacto", width: 120 },
      { field: "description", headerName: "Descripción", width: 120 },
      { field: "_id", headerName: "Id", width: 200 },
    ],
    []
  );
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);

  useEffect(() => {
    dispatch(adminPets());
  }, [dispatch]);

  return (
    <Box
      sx={{
        height: 460,
        width: "96%",
      }}
    >
 <h1 className={style.posts}> Publicaciones </h1>
     
      <DataGrid
        sx={{ ml: 35 }}
        columns={columns}
        rows={pets}
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
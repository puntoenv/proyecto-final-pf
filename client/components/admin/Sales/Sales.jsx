import { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { sales } from "../../../stores/actions";
import { useSelector, useDispatch } from "react-redux";
import style from "./style.module.css";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import DoneIcon from "@mui/icons-material/Done";
import Button from "@mui/material/Button";

export default function Sales() {
  const dispatch = useDispatch();
  const allSales = useSelector((state) => state.charts.sales);

  const [pageSize, setPageSize] = useState(8);
  const [rowId, setRowId] = useState(null);

  useEffect(() => {
    dispatch(sales());
  }, [dispatch]);

  const salesNew = [];
  for (let i = 0; i < allSales.length; i++) {
    console.log(allSales[i].user);
    salesNew.push({
      status: allSales[i].payments[0]?.status_detail,
      name: allSales[i].items[0]?.title,
      bought: allSales[i].items[0].quantity,
      id: allSales[i]._id,
      user: allSales[i].user?._id,
      email: allSales[i].user?.email,
    });
  }

  function Blocked(props) {
    return (
      <div className={style.red}>
        <ReportProblemIcon className={style.iconOff} {...props}>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />{" "}
        </ReportProblemIcon>
        <h3 className={style.blocked}>Bloqueado</h3>
      </div>
    );
  }

  function Unblocked(props) {
    return (
      <div className={style.green}>
        <DoneIcon className={style.icon} {...props}>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />{" "}
        </DoneIcon>
        <h3 className={style.active}>Acreditado</h3>
      </div>
    );
  }
  const columns = useMemo(
    () => [
      {
        field: "name",
        headerClassName: "super-app-theme--header",
        headerName: "Producto",
        headerAlign: "left",
        width: 170,
      },
      {
        field: "status",
        headerName: "Estado",
        headerClassName: "super-app-theme--header",
        headerAlign: "left",
        width: 120,
        renderCell: (params) =>
          params.row.hidden === true ? (
            <Blocked
              sx={{ color: "#ff2525", fontSize: 20 }}
              src={params.row.hidden}
            />
          ) : (
            <Unblocked
              sx={{ color: "green", fontSize: 20 }}
              src={params.row.hidden}
            />
          ),
        sortable: false,
        filterable: false,
      },
      {
        field: "bought",
        headerClassName: "super-app-theme--header",
        headerName: "Cantidad",
        width: 90,
      },

      {
        field: "user",
        headerName: "UsuarioID",
        headerAlign: "center",
        headerClassName: "super-app-theme--header",
        width: 220,
      },
      {
        field: "email",
        headerName: "Mail",
        headerClassName: "super-app-theme--header",
        width: 220,
      },
   
      {
        field: "id",
        headerClassName: "super-app-theme--header",
        headerName: "ProductoID",
        width: 220,
      },
    ],
    []
  );



  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton sx={{ color: "#574c3d", fontSize:15 }}  /> 
        <GridToolbarFilterButton sx={{ color: "#574c3d", fontSize:15 }} />
        <GridToolbarDensitySelector sx={{ color: "#574c3d", fontSize:15 }} />
      </GridToolbarContainer>
    );
  }

  return (
    <Box
      sx={{
        ml: 8,
        height: 600,
        width: "90%",
        "& .super-app-theme--header": {
          backgroundColor: "rgba(77, 64, 40, 0.14)",
        },
      }}
    >
      <h1 className={style.posts}> Ventas </h1>

      <DataGrid
        sx={{ ml: 35 }}
        columns={columns}
        rows={salesNew}
        getRowId={(row) => row.id}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        onCellEditCommit={(params) => setRowId(params.id)}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </Box>
  );
}

import { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector, } from "@mui/x-data-grid";
import { adminPets } from "../../../stores/actions";
import { useSelector, useDispatch } from "react-redux";
import style from "./style.module.css";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import PetsIcon from '@mui/icons-material/Pets';
import Button from "@mui/material/Button";

export default function Pets() {
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.mascotas.adminPets);
  const [pageSize, setPageSize] = useState(8);
  const [rowId, setRowId] = useState(null);

  useEffect(() => {
    dispatch(adminPets());
  }, [dispatch]);
  const petsNew = [];
  for (let i = 0; i < pets.length; i++) {
    petsNew.push({
      name: pets[i].name,
      description: pets[i].description,
      image: pets[i].image,
      health: pets[i].health,
      bought: pets[i].bought,
      _id: pets[i]._id,
      hidden: pets[i].hidden,
      age: pets[i].age,
      gender: pets[i].gender,
      size: pets[i].size,
      directions: pets[i].directions,
      condition: pets[i].condition,
      user: pets[i].user.name,
      userImage: pets[i].user.image,
      contactAdoption: pets[i].contactAdoption,
      type: pets[i].type,
    
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
        <PetsIcon className={style.icon} {...props}>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />{" "}
        </PetsIcon>
        <h3 className={style.active}>Activo</h3>
      </div>
    );
  }
  const columns = useMemo(
    () => [
      {
        field: "image",
        headerName: " ",
        width: 50,
        renderCell: (params) => <Avatar src={params.row.image} />,
        sortable: false,
        filterable: false,headerClassName: "super-app-theme--header",
      },   
      { field: "name", headerClassName: "super-app-theme--header",headerName: "Nombre",headerAlign: "left", width: 100 },
      {
        field: "hidden",
        headerName: "Estado",
        headerClassName: "super-app-theme--header",
        headerAlign: "left",
        width: 120,
        renderCell: (params) =>
          params.row.hidden === true ? (
            <Blocked sx={{ color: "#ff2525", fontSize: 20 }} src={params.row.hidden} />
          ) : (
            <Unblocked sx={{ color: "green", fontSize: 20 }} src={params.row.hidden} />
          ),
        sortable: false,
        filterable: false,
      },
      { field: "type",headerClassName: "super-app-theme--header", headerName: "Especie", width: 90 },
      { field: "age", headerClassName: "super-app-theme--header",headerName: "Edad", width: 60 },
      { field: "gender",headerClassName: "super-app-theme--header", headerName: "Género", width: 90 },
      { field: "size",headerClassName: "super-app-theme--header", headerName: "Tamaño", width: 90 },
      { field: "condition", headerClassName: "super-app-theme--header",headerName: "Condición", width: 120 },
      {
        field: "userImage",headerClassName: "super-app-theme--header",
        headerName: " ",
        width: 50,
        renderCell: (params) => <Avatar src={params.row.userImage} />,
        sortable: false,
        filterable: false,
      },
      {
        field: "user",
        headerName: "Usuario", headerClassName: "super-app-theme--header",
        width: 100,
      },
      { field: "contactAdoption",headerClassName: "super-app-theme--header", headerName: "Contacto", width: 130 },
      { field: "description",headerClassName: "super-app-theme--header", headerName: "Descripción", width: 120 },
      { field: "_id",headerClassName: "super-app-theme--header", headerName: "Id", width: 100 },
    ],
    []
  );




  const handleHide = async () => {
    try {
      const { _id } = data.row;
      if (data) await UpdateProduct(_id, { hidden: "hide" });
    } catch (error) {
      console.log(error);
    }
  };
  const handleShow = async () => {
    try {
      const { _id } = data.row;
      if (data) await UpdateProduct(_id, { hidden: "show" });
    } catch (error) {
      console.log(error);
    }
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Button
          sx={{ color: "#574c3d" }}
          startIcon={<ReportProblemIcon />}
          onClick={(e) => handleHide(e)}
        >
          Archivar
        </Button>
        <Button
          sx={{ color: "#574c3d" }}
          startIcon={<PetsIcon />}
          onClick={(e) => handleShow(e)}
        >
          Mostrar
        </Button>
        <GridToolbarColumnsButton sx={{ color: "#574c3d" }} />
        <GridToolbarFilterButton sx={{ color: "#574c3d" }} />
        <GridToolbarDensitySelector sx={{ color: "#574c3d" }} />
      </GridToolbarContainer>
    );
  }



  return (
    <Box
      sx={{
        height: 600,
        width: "96%",
        "& .super-app-theme--header": {
          backgroundColor: "rgba(77, 64, 40, 0.14)",
        },
      }}
    >
      <h1 className={style.posts}> Publicaciones </h1>

      <DataGrid
        sx={{ ml: 35 }}
        columns={columns}
        rows={petsNew}
        getRowId={(row) => row._id}
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

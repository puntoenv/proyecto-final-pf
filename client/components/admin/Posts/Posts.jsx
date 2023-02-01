import { useEffect, useMemo, useState, useRef, memo } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { adminPets, PutPets } from "../../../stores/actions";
import { useSelector, useDispatch } from "react-redux";
import style from "./style.module.css";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import PetsIcon from "@mui/icons-material/Pets";
//import Button from "@mui/material/Button";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Fab from '@mui/material/Fab';





function isOverflown(element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

const GridCellExpand = memo(function GridCellExpand(props) {
  const { width, value } = props;
  const wrapper = useRef(null);
  const cellDiv = useRef(null);
  const cellValue = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showFullCell, setShowFullCell] = useState(false);
  const [showPopper, setShowPopper] = useState(false);



const handleMouseEnter = () => {
  const isCurrentlyOverflown = isOverflown(cellValue.current);
  setShowPopper(isCurrentlyOverflown);
  setAnchorEl(cellDiv.current);
  setShowFullCell(true);
};

const handleMouseLeave = () => {
  setShowFullCell(false);
};

useEffect(() => {
  if (!showFullCell) {
    return undefined;
  }

  function handleKeyDown(nativeEvent) {
  
    if (nativeEvent.key === "Escape" || nativeEvent.key === "Esc") {
      setShowFullCell(false);
    }
  }

  document.addEventListener("keydown", handleKeyDown);

  return () => {
    document.removeEventListener("keydown", handleKeyDown);
  };
}, [setShowFullCell, showFullCell]);

return (
  <Box
    ref={wrapper}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    sx={{
      alignItems: "center",
      lineHeight: "24px",
      width: "100%",
      height: "100%",
      position: "relative",
      display: "flex",
      
    }}
  >
    <Box
      ref={cellDiv}
      sx={{
        height: "100%",
        width,
        display: "block",
        position: "absolute",
        top: 0,
       
      }}
    />
    <Box
      ref={cellValue}
      sx={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        typography: 'subtitle2',
        textAlign: 'center',
        textTransform: 'capitalize'
      }}
    >
      {value}
    </Box>
    {showPopper && (
      <Popper
        open={showFullCell && anchorEl !== null}
        anchorEl={anchorEl}
        style={{ width, marginLeft: -17, }}
      >
        <Paper
          elevation={1}
          style={{ minHeight: wrapper.current.offsetHeight - 3, backgroundColor: "rgba(42, 41, 37, 0.942)", }}
        >
          <Typography variant="body2" style={{ padding: 8, color: "white" }}>
            {value}
          </Typography>
        </Paper>
      </Popper>
    )}
  </Box>
);
});

GridCellExpand.propTypes = {
value: PropTypes.string.isRequired,
width: PropTypes.number.isRequired,
};

function renderCellExpand(params) {
return (
  <GridCellExpand
    value={params.value || ""}
    width={params.colDef.computedWidth}
  />
);
}

renderCellExpand.propTypes = {
colDef: PropTypes.object.isRequired,
value: PropTypes.string,
};


export default function Pets() {
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.mascotas.adminPets);
  const [pageSize, setPageSize] = useState(8);
  const [rowId, setRowId] = useState(null);
  const [data, setData] = useState();
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

  function Male(props) {
    return (
      <div>
        <MaleIcon className={style.iconOff} {...props}>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </MaleIcon>
      </div>
    );
  }
  function Female(props) {
    return (
      <div>
        <FemaleIcon className={style.iconOff} {...props}>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </FemaleIcon>
      </div>
    );
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
        filterable: false,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "name",
        headerClassName: "super-app-theme--header",
        headerName: "Nombre",
        headerAlign: "left",
        width: 100,
        renderCell: renderCellExpand,
      },
      {
        field: "hidden",
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
        field: "gender",
        renderCell: (params) =>
          params.row.gender === "hembra" ? (
            <Female
              sx={{ color: "#8025ff", fontSize: 20 }}
              src={params.row.hidden}
            />
          ) : (
            <Male
              sx={{ color: "#7e7628", fontSize: 20 }}
              src={params.row.hidden}
            />
          ),
        headerClassName: "super-app-theme--header",
        headerName: "",
        headerAlign: "right",
        width:30,
      },
      {
        field: "type",
        headerClassName: "super-app-theme--header",
        headerName: "Especie",
        width: 80,
      },
      
      {
        field: "age",
        headerClassName: "super-app-theme--header",
        headerName: "Edad",
        width: 60,
      },
    
      {
        field: "size",
        headerClassName: "super-app-theme--header",
        headerName: "Tamaño",
        width: 90,
      },
      {
        field: "condition",
        headerClassName: "super-app-theme--header",
        headerName: "Condición",
        width: 120,
      },
      {
        field: "userImage",
        headerClassName: "super-app-theme--header",
        headerName: " ",
        width: 50,
        renderCell: (params) => <Avatar src={params.row.userImage} />,
        sortable: false,
        filterable: false,
      },
      {
        field: "user",
        headerName: "Usuario",
        headerClassName: "super-app-theme--header",
        width: 100,
      },
      {
        field: "contactAdoption",
        headerClassName: "super-app-theme--header",
        headerName: "Contacto",
        width: 130,
        renderCell: renderCellExpand,
      },
      {
        field: "description",
        headerClassName: "super-app-theme--header",
        headerName: "Descripción",
        width: 120,
        renderCell: renderCellExpand,
      },
      {
        field: "_id",
        headerClassName: "super-app-theme--header",
        headerName: "Id",
        width: 100,
      },
    ],
    []
  );

  const handleHide = async () => {
    try {
      const { _id } = data.row;
      if (data) await PutPets(_id, { hidden: "hide" });
    } catch (error) {
      console.log(error);
    }
  };
  const handleShow = async () => {
    try {
      const { _id } = data.row;
      if (data) await PutPets(_id, { hidden: "show" });
    } catch (error) {
      console.log(error);
    }
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Fab variant="extended" size="medium"
          sx={{ background:"#2b4822cd" ,color: "#dbdbdb", marginBottom:2, marginTop:1.5, marginRight: 1, marginLeft: 1  }}
         
          onClick={handleHide}
        ><ReportProblemIcon sx={{marginRight:1}} />
          Archivar
        </Fab>
        <Fab variant="extended" size="medium"
          sx={{ background:"#2b4822cd" ,color: "#dbdbdb", marginBottom:2, marginTop:1.5, marginRight: 1, marginLeft: 1  }}
         
          onClick={handleShow}
        ><PetsIcon sx={{marginRight:1}} />
          Mostrar
        </Fab>
        <GridToolbarColumnsButton sx={{ color: "#574c3d", fontSize:15 }} />
        <GridToolbarFilterButton sx={{ color: "#574c3d", fontSize:15 }} />
        <GridToolbarDensitySelector sx={{ color: "#574c3d", fontSize:15 }} />
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
        onRowClick={(e) => setData(e)}
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

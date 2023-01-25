import { useEffect, useMemo, useState, useRef, memo  } from "react";
import { Avatar, Box } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { allUsers, updateUser } from "../../../stores/actions";
import { useSelector, useDispatch } from "react-redux";
import style from "./style.module.css";
import Button from "@mui/material/Button";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import PropTypes from "prop-types";




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




export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [data, setData] = useState();
  
  const [pageSize, setPageSize] = useState(8);
 

  useEffect(() => {
    dispatch(allUsers());
  }, [dispatch]);

  const usersNew = [];
  for (let i = 0; i < users.length; i++) {
    usersNew.push({
      name: users[i].name,
      email: users[i].email,
      image: users[i].image,
      posts: users[i].pets.length,
      bought: users[i].bought,
      _id: users[i]._id,
      hidden: users[i].hidden,
      age: users[i].age,
      directions: users[i].directions,
      merchant_orders: users[i].merchant_orders,
    });
  }

  function Blocked(props) {
    return (
      <div className={style.red}>
        <PersonOffIcon className={style.iconOff} {...props}>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />{" "}
        </PersonOffIcon>
        <h3 className={style.blocked}>Bloqueado</h3>
      </div>
    );
  }

  function Unblocked(props) {
    return (
      <div className={style.green}>
        <PersonIcon className={style.icon} {...props}>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />{" "}
        </PersonIcon>
        <h3 className={style.active}>Activo</h3>
      </div>
    );
  }

  const columns = useMemo(() => [
    {
      field: "image",
      headerName: " ",
      headerClassName: "super-app-theme--header",
      width: 50,
      renderCell: (params) => <Avatar src={params.row.image} />,
      sortable: false,
      filterable: false,
    },
    {
      field: "name",
      headerClassName: "super-app-theme--header",
      headerName: "Nombre ",
      headerAlign: "left",
      width: 140, renderCell: renderCellExpand, 
    },

    {
      field: "hidden",
      headerName: "Estado",
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      width: 120,
      renderCell: (params) =>
        params.row.hidden === true ? (
          <Blocked sx={{ color: "#ff2525" }} src={params.row.hidden} />
        ) : (
          <Unblocked sx={{ color: "green" }} src={params.row.hidden} />
        ),
      sortable: false,
      filterable: false,
    },
    {
      field: "email",
      headerName: "Mail",
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      width: 200,
    },
    {
      field: "posts",
      headerName: "Posts",
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      width: 50,
    },
    {
      field: "bought",
      headerName: "Compras",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 220,
    },
    {
      field: "_id",
      headerName: "Id",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 150,
    },
  ]);

  const handleHide = async () => {
    try {
      const { _id } = data.row;
      if (data) await updateUser(_id, { hidden: "hide" });
    } catch (error) {
      console.log(error);
    }
  };
  const handleShow = async () => {
    try {
      const { _id } = data.row;
      if (data) await updateUser(_id, { hidden: "show" });
    } catch (error) {
      console.log(error);
    }
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Button
          sx={{ color: "#574c3d" }}
          startIcon={<PersonOffIcon />}
          onClick={handleHide}
        >
          Bloquear
        </Button>
        <Button
          sx={{ color: "#574c3d" }}
          startIcon={<PersonIcon />}
          onClick={handleShow}
        >
          Desbloquear
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
      <h1 className={style.users}> Usuarios </h1>

      <DataGrid
        sx={{ ml: 35 }}
        columns={columns}
        rows={usersNew}
        onRowClick={(e) => setData(e)}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
       
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </Box>
  );
}

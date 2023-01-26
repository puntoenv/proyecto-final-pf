import { adminProducts } from "../../../stores/actions";
import { useEffect, useMemo, useState, useRef, memo } from "react";
import { Avatar, Box } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { UpdateProduct } from "../../../stores/actions";
import Button from "@mui/material/Button";
import Add from "./add";
import PropTypes from "prop-types";
import AddIcon from "@mui/icons-material/Add";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Rating from "@mui/material/Rating";
import Pagination from "@mui/material/Pagination";
import style from "./styles.module.css";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      sx={{ color: "#574c3d" }}
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}
// function renderRating(params) {
//   return <Rating readOnly value={params.value} />;
// }

// renderRating.propTypes = {
//   value: PropTypes.number,
// };
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

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [data, setData] = useState();
  const [Render, setRender] = useState();
  const [pageSize, setPageSize] = useState(8);

  useEffect(() => {
    dispatch(adminProducts());
    setRender();
  }, [dispatch]);

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const usdPrice = {
    type: "number",
    width: 130,
    valueFormatter: ({ value }) => currencyFormatter.format(value),
    cellClassName: "font-tabular-nums",
  };

  // const category = () =>
  //   products.map((product) => {
  //     product.category.length > 0 ? product.category : "Sin categoria/s";
  //   });

  function Blocked(props) {
    return (
      <div className={style.red}>
        <VisibilityOffIcon className={style.iconOff} {...props}>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />{" "}
        </VisibilityOffIcon>
        <h3 className={style.blocked}>Oculto</h3>
      </div>
    );
  }

  function Unblocked(props) {
    return (
      <div className={style.green}>
        <VisibilityIcon className={style.icon} {...props}>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />{" "}
        </VisibilityIcon>
        <h3 className={style.active}>Activo</h3>
      </div>
    );
  }

  const columns = useMemo(() => [
    {
      field: " ",
      headerName: " ",
      width: 50,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => <Avatar src={params.row.image} />,
      sortable: false,
      filterable: false,
      headerAlign: "center",
    },
    {
      field: "name",
      headerClassName: "super-app-theme--header",
      headerName: "Nombre",
      headerAlign: "left",
      editable: true,
      width: 140, renderCell: renderCellExpand,
    },
    {
      field: "hidden",
      headerName: "Estado",
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      width: 135,
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
      field: "category",
      headerName: "Categorias",
      headerAlign: "center",
      editable: true,
      headerClassName: "super-app-theme--header",
      width: 120, renderCell: renderCellExpand,
    },
    {
      field: "price",
      headerName: "Precio",
      ...usdPrice,
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      editable: true,
      width: 120,
    },
    {
      field: "stock",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      headerName: "Stock",
      editable: true,
      width: 80, renderCell: renderCellExpand, 
    },
    // {
    //   field: '',
    //   headerName: "Rating",
    //   renderCell: renderRating,
    //   editable: true,
    //   width: 300,
    // },
    {
      field: "description",
      headerName: "Descripción",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      editable: true,
      width: 300,
      renderCell: renderCellExpand,
    },
    {
      field: "_id",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      headerName: "Id",
      width: 160, 
    },
  ]);

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
  const handleEdit = async () => {
    try {
      const { id, field } = data;
      const { value } = data.props;
      const update = { [field]: value };
      if (data) await UpdateProduct(id, update);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = (component) => {
    setRender(component);
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Button
          sx={{ color: "#574c3d" }}
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleAdd(<Add />)}
        >
          Agregar
        </Button>

        <Button
          sx={{ color: "#574c3d" }}
          startIcon={<VisibilityOffIcon />}
          onClick={handleHide}
        >
          Ocultar
        </Button>
        <Button
          sx={{ color: "#574c3d" }}
          startIcon={<VisibilityIcon />}
          onClick={handleShow}
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
    <>
      <div>
        <section>{Render}</section>
      </div>

      <Box
        sx={{
          height: 600,
          width: "96%",
          "& .super-app-theme--header": {
            backgroundColor: "rgba(77, 64, 40, 0.14)",
          },
        }}
      >
        <h1 className={style.products}> Productos </h1>

        <DataGrid
          pagination
          onRowClick={(e) => setData(e)}
          sx={{ ml: 35 }}
          columns={columns}
          rows={products}
          editMode="cell"
          getRowId={(row) => row._id}
          rowsPerPageOptions={[5, 10, 20]}
          pageSize={pageSize}
          onCellEditStop={handleEdit}
          onEditCellPropsChange={(e) => setData(e)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
          components={{
            Toolbar: CustomToolbar,
            Pagination: CustomPagination,
          }}

          // experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </>
  );
}

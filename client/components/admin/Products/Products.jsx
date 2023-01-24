import { adminProducts } from "../../../stores/actions";
import { useEffect, useMemo, useState } from "react";
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
import BlockIcon from "@mui/icons-material/Block";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Rating from "@mui/material/Rating";
import styles from "../../Profile/Loading.module.css";
import Pagination from '@mui/material/Pagination';
import style from "./styles.module.css";

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}
function renderRating(params) {
  return <Rating readOnly value={params.value} />;
}

renderRating.propTypes = {
  value: PropTypes.number,
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

  const status = () => {
    products.hidden ? "verde" : "rojo";
  };

  const columns = useMemo(() => [
    {
      field: "image",
      headerName: "Imagen",
      width: 60,
      renderCell: (params) => <Avatar src={params.row.image} />,
      sortable: false,
      filterable: false,
    },
    { field: "name", headerName: "Name", editable: true, width: 160 },
    { field: "hidden", headerName: "Estado", renderCell: status, editable: true, width: 100 },
    {
      field: "price",
      headerName: "Precio",
      ...usdPrice,
      editable: true,
      width: 120,
    },
    { field: "stock", headerName: "Stock", editable: true, width: 120 },
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
      editable: true,
      width: 300,
    },
    { field: "_id", headerName: "Id", width: 160 },
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
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleAdd(<Add />)}
        >
          Agregar
        </Button>

        <Button startIcon={<BlockIcon />} onClick={(e) => handleHide(e)}>
          Ocultar
        </Button>
        <Button startIcon={<VisibilityIcon />} onClick={(e) => handleShow(e)}>
          Mostrar
        </Button>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
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
          height: 460,
          width: "96%",
          
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

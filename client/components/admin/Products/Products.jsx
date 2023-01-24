import { adminProducts } from "../../../stores/actions";
import { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { UpdateProduct } from "../../../stores/actions";
import Button from "@mui/material/Button";
import Add from "./add";
//import PropTypes from "prop-types";
import AddIcon from "@mui/icons-material/Add";
//import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Rating from '@mui/material/Rating';
import styles from "../../Profile/Loading.module.css";
// import SaveIcon from "@mui/icons-material/Save";
// import CancelIcon from "@mui/icons-material/Close";
// import { styled } from "@mui/material/styles";
// import Checkbox from "@mui/material/Checkbox";
// import { pink } from "@mui/material/colors";

// const VISIBLE_FIELDS = ["Nombre", "Estado", "Precio", "Stock", "Descripción"];

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [data, setData] = useState();
  const [Render, setRender] = useState();
  const [pageSize, setPageSize] = useState(5);
  
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
    { field: "hidden", headerName: "Estado", editable: true, width: 100 },
    {
      field: "price",
      headerName: "Precio",
      ...usdPrice,
      editable: true,
      width: 120,
    },
    { field: "stock", headerName: "Stock", editable: true, width: 120 },
    // {
    //   field: "",
    //   headerName: "Rating",
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
          "& .font-tabular-nums": {
            fontVariantNumeric: "tabular-nums",
          },
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
          }}
          // experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </>
  );
}

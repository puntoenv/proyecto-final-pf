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
import { allUsers } from "../../../stores/actions";
import { useSelector, useDispatch } from "react-redux";
import style from "./style.module.css";
import Button from "@mui/material/Button";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonIcon from "@mui/icons-material/Person";

export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState();

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

    
 
  
  // const copy = async () => {
  //   const newUsers = [];
  //   const usuarios = [...users];
  //   for (let i = 0; i < usuarios; i++) {
  //     const prop = await (usuarios[i].posts = usuarios[i].pets.length);
  //     const more = usuarios[i] = prop
  //     newUsers.push(more);
  //   }
  //   console.log(newUsers);
  // };
  // copy();

  const columns = useMemo(() => [
    {
      field: "image",
      headerName: "Imagen",
      width: 60,
      renderCell: (params) => <Avatar src={params.row.image} />,
      sortable: false,
      filterable: false,
    },
    { field: "name", headerName: "Name", width: 140 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "posts", headerName: "Posts", width: 220 },
    { field: "bought", headerName: "Compras", width: 220 },
    { field: "_id", headerName: "Id", width: 220 },
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

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Button startIcon={<PersonOffIcon />} onClick={(e) => handleHide(e)}>
          Bloquear
        </Button>
        <Button startIcon={<PersonIcon />} onClick={(e) => handleShow(e)}>
          Desbloquear
        </Button>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </GridToolbarContainer>
    );
  }

  return (
    <Box
      sx={{
        height: 460,
        width: "96%",
      }}
    >
      <h1 className={style.users}> Usuarios </h1>

      <DataGrid
        sx={{ ml: 35 }}
        columns={columns}
        rows={usersNew}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        onRowClick={(e) => setData(e)}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </Box>
  );
}

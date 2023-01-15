import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";
import Header from "./Header";
import styles from "../../pages/admin/admin.module.css";
import { allUsers } from "../../stores/actions";

export default function Users() {
  const selectionsettings = { persistSelection: true };
  // const toolbarOptions = ["Delete", "Edit", "Cancel", "Update"];
  const editing = {
    allowDeleting: true,
    allowEditing: true,
  };
  const pageOptions = {
    pageSize: 8,
    pageSizes: true,
  };
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(allUsers());
  }, [dispatch]);

  const usersStatus = (props) => (
    <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
      <p
        style={{ background: props.StatusBg }}
        className="rounded-full h-3 w-3"
      />
      <p>{props.Status}</p>
    </div>
  );

  const img = (props) => {
    return (
      <div className="image">
        <img src={props.image} alt="User img" className={styles.img} />
      </div>
    );
  };

  const status = (props) => {
    const sta = props.hidden == false ? "black" : "red";
    return <p>{sta}</p>;
  };

  return (
    <div className="mx-52 my-16 ml-80">
      <Header title="Usuarios" />
      <GridComponent
        dataSource={users}
        enableHover={false}
        allowPaging={true}
        pageSettings={pageOptions}
        selectionSettings={selectionsettings}
        // toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting={true}
        width="1100"
      >
        <ColumnsDirective>
          <ColumnDirective type="checkbox" width="50" />
          
          <ColumnDirective
            headerText="Imagen"
            width="100"
            template={img}
          />

          <ColumnDirective
            field="name"
            headerText="Nombre"
            width="100"
           
          />
          <ColumnDirective
            field="hidden"
            headerText="Estado"
            width="100"
          />
          <ColumnDirective
            field="email"
            headerText="Mail"
            width="110"
            
          />
          <ColumnDirective
            field="pets.length"
            headerText="Posts"
            width="80"
            
          />
          <ColumnDirective
            field="_id"
            headerText="ID"
            width="250"
            
          />
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
}

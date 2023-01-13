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
  const toolbarOptions = ["Delete"];
  const editing = { allowDeleting: true, allowEditing: true };

  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(allUsers());
  }, [dispatch]);

 

 

  return (
    <div className={styles.users}>
      <Header title="Usuarios" />
      <GridComponent
        dataSource={users}
        enableHover={false}
        allowPaging={true}
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting={true}
        // ModelType="@model" 
      >
        <ColumnsDirective>
          {/* <ColumnDirective
            headerText="Image"
            width="180"
            template="image"
            textAlign="Right"
          /> */}

          <ColumnDirective
            field="name"
            headerText="Nombre"
            width="200"
            textAlign="Justify"
          />
          <ColumnDirective
            field="email"
            headerText="Mail"
            width="300"
            textAlign="Justify"
          />
          <ColumnDirective
            field="pets.length"
            headerText="Publicaciones"
            width="200"
            textAlign="Justify"
          />
          <ColumnDirective
            field="_id"
            headerText="ID"
            width="300"
            textAlign="Justify"
          />
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
}

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../stores/actions";
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

const Products = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Delete"];
  const editing = { allowDeleting: true, allowEditing: true };

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.allProducts);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  let dataSourceSettings = {
    formatSettings: [
      { name: "Amount", format: "C2", useGrouping: false, currency: "URE" },
    ],
  };

  return (
    <div className={styles.users}>
      <Header title="Productos" />
      <GridComponent
        dataSource={products}
        enableHover={false}
        allowPaging={true}
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting={true}
        ModelType="@model"
      >
        <ColumnsDirective>
          <ColumnDirective
            field="name"
            headerText="Nombre"
            width="300"
            textAlign="Justify"
          />
          <ColumnDirective
            field="price"
            headerText="Precio"
            width="200"
            textAlign="Justify"
          />
          <ColumnDirective
            field="stock"
            headerText="Stock"
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
};

export default Products;

import { setValue } from "@syncfusion/ej2-base";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminProducts } from "../../stores/actions";
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
import { DialogFormTemplate } from "./EditProduct";


const Products = () => {
  const selectionsettings = { persistSelection: true };

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(adminProducts());
  }, [dispatch]);

  let grid;
  const dialogTemplate = (props) => {
    return <DialogFormTemplate {...props} />;
  };

  const img = (props) => {
    return (
      <div className="image">
        <img src={props.image} alt="User img" className={styles.img} />
      </div>
    );
  };

  // const toolbarOptions = ["Add", "Edit", "Delete", "Update", "Cancel"];

  // const actionComplete = (args) => {
  //   if (args.form) {
      // if (args.requestType === "beginEdit" || args.requestType === "add") {
      //   /** Add Validation Rules */
      //   args.form.ej2_instances[0].addRules("Freight", { max: 500 });
      // }
      /** Set initial Focus */
  //     if (args.requestType === "beginEdit") {
  //       args.form.elements.namedItem("name").focus();
  //     }else 
  //     if (args.requestType === "add") {
  //       args.form.elements.namedItem("stock").focus();
  //     }
  //   }
  // };

  //const { setFocus } = useForm()

//setFocus("name", { shouldSelect: true })

  const actionBegin = (args) => {
    if (args.requestType === "save" && args.form) {
      /** cast string to integer value */
      setValue(
        "data.Freight",
        parseFloat(args.form.querySelector("#Freight").value),
        args
      );
    }
  };

  const pageOptions = {
    pageSize: 8,
    pageSizes: true,
  };

  const editOptions = {
    allowAdding: true,
    allowDeleting: true,
    allowEditing: true,
    mode: "Normal",
    template: dialogTemplate,
  };

  return (
    <div className="mx-52 my-16 ml-80">
      <Header title="Productos" />
      <GridComponent
        dataSource={products}
        enableHover={false}
        allowPaging={true}
        pageSettings={pageOptions}
        selectionSettings={selectionsettings}
        // toolbar={toolbarOptions}
        editSettings={editOptions}
        allowSorting={true}
        width="1100"
        ref={(g) => (grid = g)}
        // actionComplete={actionComplete}
        actionBegin={actionBegin}
      >
        <ColumnsDirective>
          <ColumnDirective type="checkbox" width="50" />
          <ColumnDirective headerText="Imagen" width="100" template={img} />
          <ColumnDirective field="name" headerText="Nombre" width="150" />
          <ColumnDirective field="hidden" headerText="Estado" width="100" />
          <ColumnDirective
            field="price"
            headerText="Precio"
            width="120"
            format="c2"
          />
          <ColumnDirective field="stock" headerText="Stock" width="100" />
          <ColumnDirective field="_id" headerText="ID" width="300" />
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Products;

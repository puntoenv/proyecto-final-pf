
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  Tooltip,
  ColumnSeries,
  DataLabel,
} from "@syncfusion/ej2-react-charts";
import {
 
  barPrimaryXAxis,
  barPrimaryYAxis,
} from "../../../data/dummy";
import styles from '../../../pages/admin/admin.module.css'
import { filteredUsers, filteredPosts } from "../../../stores/actions";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";



const Bar = () => {

  const dispatch = useDispatch();
  const latestUsers = useSelector((state) => state.charts.filteredUsers);
  const latestPosts = useSelector((state) => state.charts.filteredPosts);
  console.log(latestPosts);

  useEffect(() => {
    dispatch(filteredUsers());
  }, [dispatch]);

const data = [
    {
      dataSource: latestUsers,
      xName: "x",
      yName: "y",
      name: "Usuarios",
      type: "Column",
      marker: {
        dataLabel: {
          visible: true,
          position: "Top",
          font: { fontWeight: "600", color: "#ffffff" },
        },
      },
    },
    // {
    //   dataSource: latestPosts,
    //   xName: "x",
    //   yName: "y",
    //   name: "Publicaciones",
    //   type: "Column",
    //   marker: {
    //     dataLabel: {
    //       visible: true,
    //       position: "Top",
    //       font: { fontWeight: "600", color: "#ffffff" },
    //     },
    //   },
    // },
    // {
    //   dataSource: barChartData[2],
    //   xName: "x",
    //   yName: "y",
    //   name: "Ventas",
    //   type: "Column",
    //   marker: {
    //     dataLabel: {
    //       visible: true,
    //       position: "Top",
    //       font: { fontWeight: "600", color: "#ffffff" },
    //     },
    //   },
    // },
  ];

  return (
    <div >
      
      <p className={styles.rend}> Rendimiento </p>
      <div className={styles.bar}>
        <ChartComponent
          id="charts"
          primaryXAxis={barPrimaryXAxis}
          primaryYAxis={barPrimaryYAxis}
          chartArea={{ border: { width: 0 } }}
          tooltip={{ enable: true }}
          
          legendSettings={{ background: "white" }}
          width="1100"
          height="550"
        >
          <Inject
            services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]}
          />
           <SeriesCollectionDirective>
           
            {data.map((item, index) => <SeriesDirective key={index} {...item} />)}
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
};

export default Bar;

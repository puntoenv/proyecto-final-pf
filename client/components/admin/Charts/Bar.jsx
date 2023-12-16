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

import styles from "../../../pages/admin/admin.module.css";
import { filteredUsers, filteredPosts, filteredSales } from "../../../stores/actions";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";


const Bar = () => {
  const dispatch = useDispatch();
  const latestUsers = useSelector((state) => state.charts.filteredUsers);
  const latestPosts = useSelector((state) => state.charts.filteredPosts);
  const latestSales = useSelector((state) => state.charts.filteredSales);


  useEffect(() => {
    dispatch(filteredUsers());
    dispatch(filteredPosts());
    dispatch(filteredSales());
  }, [dispatch]);

const users = latestUsers?.length
const posts = latestPosts?.length
const sales = latestSales?.length
  const barChartData = [
    [
      { x: "Últimos 7 dias", y: users },
    
    ],
    [
      { x: "Últimos 7 dias", y: posts },
     
    ],
    [
      { x: "Últimos 7 dias", y: sales},
      
    ],
  ];
  const barCustomSeries = [
    {
      dataSource: barChartData[0],
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
    {
      dataSource: barChartData[1],
      xName: "x",
      yName: "y",
      name: "Publicaciones",
      type: "Column",
      marker: {
        dataLabel: {
          visible: true,
          position: "Top",
          font: { fontWeight: "600", color: "#ffffff" },
        },
      },
    },
    {
      dataSource: barChartData[2],
      xName: "x",
      yName: "y",
      name: "Ventas",
      type: "Column",
      marker: {
        dataLabel: {
          visible: true,
          position: "Top",
          font: { fontWeight: "600", color: "#ffffff" },
        },
      },
    },
  ];
 
  const barPrimaryXAxis = {
    valueType: "Category",
    interval: 1,
    majorGridLines: { width: 0 },
  };
  const barPrimaryYAxis = {
    majorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    lineStyle: { width: 0 },
    labelStyle: { color: "transparent" },
  };
  return (
    <div>
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
            {barCustomSeries.map((item, index) => (
              <SeriesDirective key={index} {...item} />
            ))}
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
};

export default Bar;

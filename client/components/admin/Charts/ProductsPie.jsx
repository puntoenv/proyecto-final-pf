import {
    AccumulationChartComponent,
    AccumulationSeriesCollectionDirective,
    AccumulationSeriesDirective,
    AccumulationLegend,
    PieSeries,
    AccumulationDataLabel,
    Inject,
    AccumulationTooltip,
  } from "@syncfusion/ej2-react-charts"

import React from "react";
import styles from "./styles.module.css";

const ProductsPie = ({ id, data, legendVisiblity }) => {

  

        
    
  return (
    <>
      <h1 className={styles.h1}>Stock de productos</h1>
      <div className={styles.products}>
      
        <AccumulationChartComponent
          id={id}
          legendSettings={{ visible: legendVisiblity, position:"Bottom" }}
          height="650"
       background="transparent"
          tooltip={{ enable: true }}
          width="550"
        >
          <Inject
            services={[
              AccumulationLegend,
              PieSeries,
              AccumulationDataLabel,
              AccumulationTooltip,
            ]}
          />
          <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective
              
              dataSource={data}
              xName="x"
              yName="y"
              innerRadius="40%"
              startAngle={0}
              endAngle={360}
              radius="70%"
              explode
              explodeOffset="10%"
              explodeIndex={2}
              dataLabel={{
                visible: true,
                name: "text",
                position: "Inside",
                font: {
                  fontWeight: "600",
               color: "white"
                },
              }}
            />
          </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
      
    </div>
    </>
  );
};

export default ProductsPie;

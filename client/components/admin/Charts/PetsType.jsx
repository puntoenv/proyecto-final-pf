import React from "react";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationLegend,
  PieSeries,
  AccumulationDataLabel,
  Inject,
  AccumulationTooltip,
} from "@syncfusion/ej2-react-charts";
import styles from '../../../pages/admin/admin.module.css'

const PetType = ({ id, data, legendVisiblity }) => {


  return (
    <div>
      <p className={styles.type}> Especies</p>
      <div className={styles.sync}>
        <AccumulationChartComponent
          id={id}
          legendSettings={{ visible: legendVisiblity,  }}
          height="520"
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
              innerRadius="0%"
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
    </div>
  );
};

export default PetType;

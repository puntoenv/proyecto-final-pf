// import React from 'react';
// import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationLegend, PieSeries, AccumulationDataLabel, Inject, AccumulationTooltip } from '@syncfusion/ej2-react-charts';
// import styles from "../../pages/admin/admin.module.css";
// const CategPiee = ({ id, data, legendVisiblity, height }) => {
 

//   return (

//     <> <p className={styles.categ_p}>Categorias</p>
//     <AccumulationChartComponent
//       id={id}
//       legendSettings={{ visible: legendVisiblity, background: 'white' }}
//       height={height}
//       background={ '#fff'}
//       tooltip={{ enable: false, format: '${point.x} : <b>${point.y}%</b>' }}
//       width= '450'
//       className={styles.categ}
//     >
//       <Inject services={[AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip]} />
//       <AccumulationSeriesCollectionDirective>
//         <AccumulationSeriesDirective
//           name="Categorias"
//           dataSource={data}
//           xName="x"
//           yName="y"
//           center={{ x: '60%', y: '60%' }}
//           startAngle={0}
//           endAngle={360}
//           radius="70%"
//           explodeOffset="10%"
//           explodeIndex={0}
//           dataLabel={{
//             visible: true,
//             name: 'text',
//             position: 'Inside',
//             font: {
//               fontWeight: '600',
//               color: '#fff',
//             },
//           }}
//           enableSmartLabels={true}
//            explode={true} 
//         />
//       </AccumulationSeriesCollectionDirective>
//     </AccumulationChartComponent>

//     </>
//   );
// };

// export default CategPiee;
import React from 'react';
import Sync from './Charts/Sync';
import { pieChartData } from '../../data/dummy';


const Doughtnut = () => (

   
    <div>
      <Sync data={pieChartData} legendVisiblity  />
    </div>
  
);

export default Doughtnut;
import React from 'react';
import { catChartData } from '../../data/dummy';
import CategPiee from '../_admin/categPiee';

const CategPie = () => (
  <div className="">
  
    <div className="">
      <CategPiee id="categ-pie" data={catChartData} legendVisiblity  />
    </div>
  </div>
);

export default CategPie;
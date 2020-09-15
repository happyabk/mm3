import React from 'react';
import _ from 'lodash';
import oneChartStyle from './styles/oneChart.module.scss';


const OneChart = ({ bgcolor, chartwidth, text, chartcolor = '#fff', label }) => (
  <span className={ oneChartStyle['one-chart'] }>
    <span style={{ width: chartwidth, background: bgcolor, color: chartcolor }}>
      {
          !_.isUndefined( label ) && <span className={ oneChartStyle['one-chart__label'] }>{ label }</span>
        }
      { text }
    </span>
  </span>

);

export default OneChart;

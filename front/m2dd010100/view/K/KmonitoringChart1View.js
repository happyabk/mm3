
import React, { Component } from 'react';
import { Chart, Portlet, ControlLine, Header } from '@mes/mes-ui-react';
import { observer } from 'mobx-react';
import { mesAutobind } from '@mes/mes-shared';
import MonitoringStore from '../../store/MonitoringStore';

import '../styles/style.scss';

@mesAutobind
@observer
class KmonitoringChartView extends Component {


  renderCustomizedLabel({ cx, cy, midAngle, innerRadius, outerRadius, index }) {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
        <tspan x={x} y={y}>{`${MonitoringStore.instance.iron !== undefined ? MonitoringStore.instance.iron.pie[index].name : null}`}</tspan>
        <tspan x={x} y={y + 12}>{`${MonitoringStore.instance.iron !== undefined ? MonitoringStore.instance.iron.pie[index].value : null}`}</tspan>
      </text>
    );
  }


  render() {

    const iron = MonitoringStore.instance.iron;

    return (
      <Portlet
        { ...this.props }
        title="고로출선누계량(금월)"
      >
        <div className="m2dd010100__chart2">
          <ControlLine
            rightItems={[ <Header>(단위/톤)</Header>]}
          />
          {
            iron !== undefined ?
              <Chart.Pie
                data={iron.pie}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                innerRadius="40%" // % 값으로 셋팅해야 상위 컨테이너의 크기에 반응합니다.
                outerRadius="85%"
                pie={
                  { label: this.renderCustomizedLabel,
                    labelLine: false  }
                }
                colorCase={2}
              />
              : null
          }
          <div className="m2dd010100__chart2-sum">
            <div className="m2dd010100__chart2-sum--item">
              <dl>
                <dt>합계</dt>
                <dd>{iron !== undefined ? iron.sum : null}</dd>
              </dl>
            </div>
          </div>
        </div>
      </Portlet>
    );
  }
}

export default KmonitoringChartView;

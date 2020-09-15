
import React, { Component } from 'react';
import { Chart, Portlet, ControlLine, Header } from '@mes/mes-ui-react';
import { observer } from 'mobx-react';
import { mesAutobind } from '@mes/mes-shared';
import MonitoringStore from '../../store/MonitoringStore';
import CustomTooltip from './CustomTooltipView';

import '../styles/style.scss';

@mesAutobind
@observer
class KmonitoringChartView extends Component {



  render() {

    const iron = MonitoringStore.instance.iron;

    return (
      <Portlet
        { ...this.props }
        title="고로출선예정량(금일)"
      >
        <div className="chart--horizontal">
          <ControlLine
            rightItems={[ <Header>(단위/톤)</Header>]}
          />
          {
            iron !== undefined ?
              <Chart.Bar
                isShowDataOnTop
                data={iron.bar}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                height={210}
                tooltip={{
                  content: <CustomTooltip iron={iron} />,
                }}
              />
              : null
          }
        </div>
        <div className="table-row fixed">
          <span>출선전망(금일)</span>
          <table className="ui table center">
            <colgroup>
              <col style={{ width: '60px' }} />
            </colgroup>
            <thead>
              <tr>
                <th>구분</th>
                <th>1고로</th>
                <th>2고로</th>
                <th>3고로</th>
                <th>4고로</th>
                <th>5고로</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>전망</th>
                <td className="right">{iron !== undefined ? iron.result[0].formAttrStdDtNmV11 : null}</td>
                <td className="right">{iron !== undefined ? iron.result[0].formAttrStdDtNmV12 : null}</td>
                <td className="right">{iron !== undefined ? iron.result[0].formAttrStdDtNmV13 : null}</td>
                <td className="right">{iron !== undefined ? iron.result[0].formAttrStdDtNmV14 : null}</td>
                <td className="right">{iron !== undefined ? iron.result[0].formAttrStdDtNmV15 : null}</td>
              </tr>
              <tr>
                <th>계획비</th>
                <td className="right">{iron !== undefined ? iron.result[1].formAttrStdDtNmV11 : null}</td>
                <td className="right">{iron !== undefined ? iron.result[1].formAttrStdDtNmV12 : null}</td>
                <td className="right">{iron !== undefined ? iron.result[1].formAttrStdDtNmV13 : null}</td>
                <td className="right">{iron !== undefined ? iron.result[1].formAttrStdDtNmV14 : null}</td>
                <td className="right">{iron !== undefined ? iron.result[1].formAttrStdDtNmV15 : null}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Portlet>
    );
  }
}

export default KmonitoringChartView;

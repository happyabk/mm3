
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { mesAutobind } from '@mes/mes-shared';
import { Portlet, List } from '@mes/mes-ui-react';
import OneChart from '../../renderer/OneChart';
import MonitoringStore from '../../store/MonitoringStore';

@mesAutobind
@observer
class KmonitoringChart2View extends Component {

  addComma(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  render() {

    const steel = MonitoringStore.instance.steel;

    let sum1 = steel !== undefined ? steel[0].formAttrStdDtNmV11 : 0;

    if (steel !== undefined) {
      for (let i = 0; i < 3; i++) {
        if (steel[i].formAttrStdDtNmV11 > sum1) {
          sum1 = steel[i].formAttrStdDtNmV11;
        }
        if (steel[i].formAttrStdDtNmV25 > sum1) {
          sum1 = steel[i].formAttrStdDtNmV25;
        }
        if (steel[i].formAttrStdDtNmV35 > sum1) {
          sum1 = steel[i].formAttrStdDtNmV35;
        }
      }
    }


    const steel1Sum = sum1 + 100;

    return (
      <Portlet
        { ...this.props }
        title="제강공장"
      >
        <div>
          <List horizontal className="right aligned">
            <List.Item>
              <font color="#00a5e5">■</font>
              <span>실적 </span>
              <font color="#2ec2b5">■</font>
              <span>예상 </span>
              <font color="#f08c8c">■</font>
              <span>계획 </span>
            </List.Item>
          </List>
          <div className="table-row fixed">
            <table className="ui table center chart-table">
              <colgroup>
                <col style={{ width: '20%' }} />
                <col style={{ width: '25%' }} />
                <col style={{ width: '25%' }} />
                <col style={{ width: '25%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th />
                  <th>1제강</th>
                  <th>2제강</th>
                  <th>3제강</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>실적</td>
                  <td className="onchart">
                    <OneChart
                      bgcolor="#00a5e5"
                      chartwidth={`${steel !== undefined && steel[0].formAttrStdDtNmV11 !== 0 ? steel[0].formAttrStdDtNmV11 / steel1Sum * 100 : 0}%`}
                      text={ steel !== undefined ? steel[0].formAttrStdDtNmV11 : null }
                    />
                  </td>
                  <td className="onchart">
                    <OneChart
                      bgcolor="#00a5e5"
                      chartwidth={`${steel !== undefined && steel[0].formAttrStdDtNmV25 !== 0 ? steel[0].formAttrStdDtNmV25 / steel1Sum * 100 : 0}%`}
                      text={ steel !== undefined ? steel[0].formAttrStdDtNmV25 : null }
                    />
                  </td>
                  <td className="onchart">
                    <OneChart
                      bgcolor="#00a5e5"
                      chartwidth={`${steel !== undefined && steel[0].formAttrStdDtNmV35 !== 0 ? steel[0].formAttrStdDtNmV35 / steel1Sum * 100 : 0}%`}
                      text={ steel !== undefined ? steel[0].formAttrStdDtNmV35 : null }
                    />
                  </td>
                </tr>
                <tr>
                  <td>예상</td>
                  <td className="onchart">
                    <OneChart
                      bgcolor="#2ec2b5"
                      chartwidth={`${steel !== undefined && steel[1].formAttrStdDtNmV11 !== 0 ? steel[1].formAttrStdDtNmV11 / steel1Sum * 100 : 0}%`}
                      text={ steel !== undefined ? steel[1].formAttrStdDtNmV11 : null }
                    />
                  </td>
                  <td className="onchart">
                    <OneChart
                      bgcolor="#2ec2b5"
                      chartwidth={`${steel !== undefined && steel[1].formAttrStdDtNmV25 !== 0 ? steel[1].formAttrStdDtNmV25 / steel1Sum * 100 : 0}%`}
                      text={ steel !== undefined ? steel[1].formAttrStdDtNmV25 : null }
                    />
                  </td>
                  <td className="onchart">
                    <OneChart
                      bgcolor="#2ec2b5"
                      chartwidth={`${steel !== undefined && steel[1].formAttrStdDtNmV35 !== 0 ? steel[1].formAttrStdDtNmV35 / steel1Sum * 100 : 0}%`}
                      text={ steel !== undefined ? steel[1].formAttrStdDtNmV35 : null }
                    />
                  </td>
                </tr>
                <tr>
                  <td>계획</td>
                  <td className="onchart">
                    <OneChart
                      bgcolor="#f08c8c"
                      chartwidth={`${steel !== undefined && steel[2].formAttrStdDtNmV11 !== 0 ? steel[2].formAttrStdDtNmV11 / steel1Sum * 100 : 0}%`}
                      text={ steel !== undefined ? steel[2].formAttrStdDtNmV11 : null }
                    />
                  </td>
                  <td className="onchart">
                    <OneChart
                      bgcolor="#f08c8c"
                      chartwidth={`${steel !== undefined && steel[2].formAttrStdDtNmV25 !== 0 ? steel[2].formAttrStdDtNmV25 / steel1Sum * 100 : 0}%`}
                      text={ steel !== undefined ? steel[2].formAttrStdDtNmV25 : null }
                    />
                  </td>
                  <td className="onchart">
                    <OneChart
                      bgcolor="#f08c8c"
                      chartwidth={`${steel !== undefined && steel[2].formAttrStdDtNmV35 !== 0 ? steel[2].formAttrStdDtNmV35 / steel1Sum * 100 : 0}%`}
                      text={ steel !== undefined ? steel[2].formAttrStdDtNmV35 : null }
                    />
                  </td>
                </tr>
                <tr>
                  <td>종점산소( PPM )</td>
                  <td className="right">{ steel !== undefined ? this.addComma(steel[3].formAttrStdDtNmV11) : null }</td>
                  <td className="right">{ steel !== undefined ? this.addComma(steel[3].formAttrStdDtNmV25) : null }</td>
                  <td className="right">{ steel !== undefined ? this.addComma(steel[3].formAttrStdDtNmV35) : null }</td>
                </tr>
                <tr>
                  <td>종점온도( ˚C )</td>
                  <td className="right">{ steel !== undefined ? this.addComma(steel[4].formAttrStdDtNmV11) : null }</td>
                  <td className="right">{ steel !== undefined ? this.addComma(steel[4].formAttrStdDtNmV25) : null }</td>
                  <td className="right">{ steel !== undefined ? this.addComma(steel[4].formAttrStdDtNmV35) : null }</td>
                </tr>
                <tr>
                  <td>리드타임( 분 / CH )</td>
                  <td className="right">{ steel !== undefined ? steel[5].formAttrStdDtNmV11 : null }</td>
                  <td className="right">{ steel !== undefined ? steel[5].formAttrStdDtNmV25 : null }</td>
                  <td className="right">{ steel !== undefined ? steel[5].formAttrStdDtNmV35 : null }</td>
                </tr>
                <tr>
                  <td>HMR실적( % )</td>
                  <td className="right">{ steel !== undefined ? steel[6].formAttrStdDtNmV11 : null }</td>
                  <td className="right">{ steel !== undefined ? steel[6].formAttrStdDtNmV25 : null }</td>
                  <td className="right">{ steel !== undefined ? steel[6].formAttrStdDtNmV35 : null }</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Portlet>
    );
  }
}

export default KmonitoringChart2View;

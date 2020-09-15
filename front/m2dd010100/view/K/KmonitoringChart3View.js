
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { mesAutobind } from '@mes/mes-shared';
import { Portlet, List } from '@mes/mes-ui-react';
import OneChart from '../../renderer/OneChart';
import MonitoringStore from '../../store/MonitoringStore';

@mesAutobind
@observer
class KmonitoringChart3View extends Component {
  //
  render() {

    const cast = MonitoringStore.instance.cast;

    let sum1 = cast !== undefined ? cast[0].formAttrStdDtNmV14 : 0;

    if (cast !== undefined) {
      for (let i = 0; i < 3; i++) {
        if (cast[i].formAttrStdDtNmV14 > sum1) {
          sum1 = cast[i].formAttrStdDtNmV14;
        }
        if (cast[i].formAttrStdDtNmV12 > sum1) {
          sum1 = cast[i].formAttrStdDtNmV12;
        }
        if (cast[i].formAttrStdDtNmV13 > sum1) {
          sum1 = cast[i].formAttrStdDtNmV13;
        }
      }
    }

    const cast1Sum = sum1 + 100;

    return (
      <Portlet
        { ...this.props }
        title="연주공장"
      >
        <div>
          <List horizontal className="right aligned">
            <List.Item>
              <font color="#68c182">■</font>
              <span>실적 </span>
              <font color="#af98cf">■</font>
              <span>예상 </span>
              <font color="#5a8677">■</font>
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
                  <th>1연주</th>
                  <th>2연주</th>
                  <th>3연주</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>실적</td>
                  <td className="onchart">
                    <OneChart
                      bgcolor="#68c182"
                      chartwidth={`${cast !== undefined && cast[0].formAttrStdDtNmV14 !== 0 ? cast[0].formAttrStdDtNmV14 / cast1Sum * 100 : 0}%`}
                      text={cast !== undefined ? cast[0].formAttrStdDtNmV14 : null}
                      color="#333"
                    />
                  </td>
                  <td className="onchart">
                    <OneChart
                      bgcolor="#68c182"
                      chartwidth={`${cast !== undefined && cast[0].formAttrStdDtNmV12 !== 0 ? cast[0].formAttrStdDtNmV12 / cast1Sum * 100 : 0}%`}
                      text={cast !== undefined ? cast[0].formAttrStdDtNmV12 : null}
                      color="#333"
                    />
                  </td>
                  <td className="onchart">
                    <OneChart
                      bgcolor="#68c182"
                      chartwidth={`${cast !== undefined && cast[0].formAttrStdDtNmV13 !== 0 ? cast[0].formAttrStdDtNmV13 / cast1Sum * 100 : 0}%`}
                      text={cast !== undefined ? cast[0].formAttrStdDtNmV13 : null}
                      color="#333"
                    />
                  </td>
                </tr>
                <tr>
                  <td>예상</td>
                  <td className="onchart">
                    <OneChart
                      bgcolor="#af98cf"
                      chartwidth={`${cast !== undefined && cast[1].formAttrStdDtNmV14 !== 0 ? cast[1].formAttrStdDtNmV14 / cast1Sum * 100 : 0}%`}
                      text={cast !== undefined ? cast[1].formAttrStdDtNmV14 : null}
                    />
                  </td>
                  <td className="onchart">
                    <OneChart
                      bgcolor="#af98cf"
                      chartwidth={`${cast !== undefined && cast[1].formAttrStdDtNmV12 !== 0 ? cast[1].formAttrStdDtNmV12 / cast1Sum * 100 : 0}%`}
                      text={cast !== undefined ? cast[1].formAttrStdDtNmV12 : null}
                    />
                  </td>
                  <td className="onchart">
                    <OneChart
                      bgcolor="#af98cf"
                      chartwidth={`${cast !== undefined && cast[1].formAttrStdDtNmV13 !== 0 ? cast[1].formAttrStdDtNmV13 / cast1Sum * 100 : 0}%`}
                      text={cast !== undefined ? cast[1].formAttrStdDtNmV13 : null}
                    />
                  </td>
                </tr>
                <tr>
                  <td>계획</td>
                  <td className="onchart">
                    <OneChart
                      bgcolor="#5a8677"
                      chartwidth={`${cast !== undefined && cast[2].formAttrStdDtNmV14 !== 0 ? cast[2].formAttrStdDtNmV14 / cast1Sum * 100 : 0}%`}
                      text={cast !== undefined ? cast[2].formAttrStdDtNmV14 : null}
                    />
                  </td>
                  <td className="onchart">
                    <OneChart
                      bgcolor="#5a8677"
                      chartwidth={`${cast !== undefined && cast[2].formAttrStdDtNmV12 !== 0 ? cast[2].formAttrStdDtNmV12 / cast1Sum * 100 : 0}%`}
                      text={cast !== undefined ? cast[2].formAttrStdDtNmV12 : null}
                    />
                  </td>
                  <td className="onchart">
                    <OneChart
                      bgcolor="#5a8677"
                      chartwidth={`${cast !== undefined && cast[2].formAttrStdDtNmV13 !== 0 ? cast[2].formAttrStdDtNmV13 / cast1Sum * 100 : 0}%`}
                      text={cast !== undefined ? cast[2].formAttrStdDtNmV13 : null}
                    />
                  </td>
                </tr>
                <tr>
                  <td>연연주비(TD)</td>
                  <td className="right">{cast !== undefined ? cast[3].formAttrStdDtNmV14 : null}</td>
                  <td className="right">{cast !== undefined ? cast[3].formAttrStdDtNmV12 : null}</td>
                  <td className="right">{cast !== undefined ? cast[3].formAttrStdDtNmV13 : null}</td>
                </tr>
                <tr>
                  <td>평균주조시간</td>
                  <td className="right">{cast !== undefined ? cast[4].formAttrStdDtNmV14 : null}</td>
                  <td className="right">{cast !== undefined ? cast[4].formAttrStdDtNmV12 : null}</td>
                  <td className="right">{cast !== undefined ? cast[4].formAttrStdDtNmV13 : null}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Portlet>
    );
  }
}

export default KmonitoringChart3View;

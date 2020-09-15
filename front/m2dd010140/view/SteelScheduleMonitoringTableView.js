
import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import { mesAutobind } from '@mes/mes-shared';
import { Dropdown, ControlLine, Icon } from '@mes/mes-ui-react';
import moment from 'moment';
import _ from 'lodash';
import LabelView from './SteelScheduleMonitoringLabelView';

@mesAutobind
@observer
class SteelScheduleMonitoringTableView extends Component {

  state = { maxHeight: '575px' };

  componentDidMount() {
    this.onUpdateHeight();
  }

  onUpdateHeight() {
    const wh = window.innerHeight;
    this.setState({
      maxHeight: `${wh - 140}px`,
    });
  }

  render() {

    const {
      datas,
      operFlag,
      date,
    } = this.props;

    // 40.55
    const mTime = moment(this.props.date).format('mm');
    const timeLine = `${((3.65 / 60) * mTime) + 40.55}%`;

    return (
      <Fragment>
        <ControlLine
          rightItems={[
            <Dropdown
              className="pop-menu"
              icon={null}
              trigger={ <span className="ui center button">범례&nbsp;&nbsp;<Icon name="caret down" /></span> }
              pointing="right"
            >
              <Dropdown.Menu>
                <Dropdown.Item>
                  <span
                    style={{ background: '#93BAED' }}
                  />
                  2연주
                </Dropdown.Item>
                <Dropdown.Item>
                  <span
                    className="legend-ico"
                    style={{ background: '#93BAED' }}
                  />
                  1M/C
                </Dropdown.Item>
                <Dropdown.Item>
                  <span
                    className="legend-ico"
                    style={{ background: '#BCE67F' }}
                  />
                  2M/C
                </Dropdown.Item>
                <Dropdown.Item>
                  <span
                    style={{ background: '#93BAED' }}
                  />
                  3연주
                </Dropdown.Item>
                <Dropdown.Item>
                  <span
                    className="legend-ico"
                    style={{ background: '#EBB488' }}
                  />
                  3M/C
                </Dropdown.Item>
                <Dropdown.Item>
                  <span
                    className="legend-ico"
                    style={{ background: '#F2D962' }}
                  />
                  4M/C
                </Dropdown.Item>
                <Dropdown.Item>
                  <span
                    style={{ background: '#99BA99' }}
                  />
                  4연주
                </Dropdown.Item>
                <Dropdown.Item>
                  <span
                    className="legend-ico"
                    style={{ background: '#99BA99' }}
                  />
                  Slab
                </Dropdown.Item>
                <Dropdown.Item>
                  <span
                    className="legend-ico"
                    style={{ background: '#FFBAFF' }}
                  />
                  Bloom
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>,
          ]}
        />
        <div className="__table-graph-container">
          <div className="__time-line-bar" style={{ left: timeLine }} />
          <div className="__table-header">
            <table>
              <colgroup>
                <col style={{ width: '8%' }} />
                <col style={{ width: '90%' }} />
              </colgroup>
              <tbody>
                <tr>
                  <td>
                    <table className="ui table">
                      <colgroup>
                        <col style={{ width: '3%' }} />
                        <col style={{ width: '5%' }} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th colSpan="2">구분</th>
                        </tr>
                      </thead>
                    </table>
                  </td>
                  <td>
                    <table className="ui table">
                      <thead>
                        <tr>
                          {
                      _.map(_.range(25), (i) => {
                        const hour = (moment(date).subtract(8, 'hour')).add(i, 'hour').format('HH') % 24;
                        return (
                          <th key={i} className="right">{hour}&nbsp;</th>
                        );
                      })
                      }
                        </tr>
                      </thead>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
          <div className="__table-graph" style={{ maxHeight: this.state.maxHeight }}>
            <table>
              <colgroup>
                <col style={{ width: '8%' }} />
                <col style={{ width: '90%' }} />
              </colgroup>
              <tbody>
                <tr>
                  <td>
                    <table className="ui table">
                      <colgroup>
                        <col style={{ width: '3%' }} />
                        <col style={{ width: '5%' }} />
                      </colgroup>
                      {
                        operFlag === '3' ?
                        <tbody>
                          <tr>
                            <th className="aligned center" rowSpan="14">
                          1제강
                            </th>
                            <th className="aligned center">1전로</th>
                          </tr>
                          <tr>
                            <th className="aligned center">2전로</th>
                          </tr>
                          <tr>
                            <th className="aligned center">3전로</th>
                          </tr>
                          <tr>
                            <th className="aligned center">1BAP</th>
                          </tr>
                            <tr>
                              <th className="aligned center">2BAP</th>
                            </tr>
                            <tr>
                              <th className="aligned center">3BAP</th>
                            </tr>
                            <tr>
                              <th className="aligned center">1RH</th>
                            </tr>
                            <tr>
                              <th className="aligned center">2RH</th>
                            </tr>
                            <tr>
                              <th className="aligned center">3RH</th>
                            </tr>
                            <tr>
                              <th className="aligned center">LF</th>
                            </tr>
                            <tr>
                              <th className="aligned center">1M/C</th>
                            </tr>
                            <tr>
                              <th className="aligned center">2M/C</th>
                            </tr>
                            <tr>
                              <th className="aligned center">3M/C</th>
                            </tr>
                            <tr>
                              <th className="aligned center">4M/C</th>
                            </tr>
                            <tr>
                              <th className="aligned center" rowSpan="14">
                              2제강
                              </th>
                              <th className="aligned center">1전로</th>
                            </tr>
                            <tr>
                              <th className="aligned center">2전로</th>
                            </tr>
                            <tr>
                              <th className="aligned center">3전로</th>
                            </tr>
                            <tr>
                              <th className="aligned center">1BAP</th>
                            </tr>
                            <tr>
                              <th className="aligned center">2BAP</th>
                            </tr>
                            <tr>
                              <th className="aligned center">3BAP</th>
                            </tr>
                            <tr>
                              <th className="aligned center">1RH</th>
                            </tr>
                            <tr>
                              <th className="aligned center">2RH</th>
                            </tr>
                            <tr>
                              <th className="aligned center">3RH</th>
                            </tr>
                            <tr>
                              <th className="aligned center">LF</th>
                            </tr>
                            <tr>
                              <th className="aligned center">1M/C</th>
                            </tr>
                            <tr>
                              <th className="aligned center">2M/C</th>
                            </tr>
                            <tr>
                              <th className="aligned center">3M/C</th>
                            </tr>
                            <tr>
                              <th className="aligned center">4M/C</th>
                            </tr>
                            <tr>
                              <th className="aligned center" rowSpan="11">
                                3제강
                              </th>
                              <th className="aligned center">1전로</th>
                            </tr>
                            <tr>
                              <th className="aligned center">2전로</th>
                            </tr>
                            <tr>
                              <th className="aligned center">1BAP</th>
                            </tr>
                            <tr>
                              <th className="aligned center">2BAP</th>
                            </tr>
                            <tr>
                              <th className="aligned center">보온로</th>
                            </tr>
                            <tr>
                              <th className="aligned center">1RH</th>
                            </tr>
                            <tr>
                              <th className="aligned center">2RH</th>
                            </tr>
                            <tr>
                              <th className="aligned center">LF</th>
                            </tr>
                            <tr>
                              <th className="aligned center">VTD</th>
                            </tr>
                            <tr>
                              <th className="aligned center">1M/C</th>
                            </tr>
                            <tr>
                              <th className="aligned center">2M/C</th>
                            </tr>
                        </tbody>
                        :
                        <tbody>
                          <tr>
                            <th className="aligned center" rowSpan="16">
                            2제강
                            </th>
                            <th className="aligned center">1전로</th>
                          </tr>
                          <tr>
                            <th className="aligned center">2전로</th>
                          </tr>
                          <tr>
                            <th className="aligned center">3전로</th>
                          </tr>
                          <tr>
                            <th className="aligned center">4전로</th>
                          </tr>
                          <tr>
                            <th className="aligned center">1BAP</th>
                          </tr>
                          <tr>
                            <th className="aligned center">2BAP</th>
                          </tr>
                          <tr>
                            <th className="aligned center">3BAP</th>
                          </tr>
                          <tr>
                            <th className="aligned center">4BAP</th>
                          </tr>
                          <tr>
                            <th className="aligned center">1LF</th>
                          </tr>
                          <tr>
                            <th className="aligned center">1RH</th>
                          </tr>
                          <tr>
                            <th className="aligned center">2RH</th>
                          </tr>
                          <tr>
                            <th className="aligned center">3RH</th>
                          </tr>
                          <tr>
                            <th className="aligned center">1M/C</th>
                          </tr>
                          <tr>
                            <th className="aligned center">2M/C</th>
                          </tr>
                          <tr>
                            <th className="aligned center">3M/C</th>
                          </tr>
                          <tr>
                            <th className="aligned center">4M/C</th>
                          </tr>
                          <tr>
                            <th className="aligned center" rowSpan="11">
                              3제강
                            </th>
                            <th className="aligned center">Bloom</th>
                          </tr>
                          <tr>
                            <th className="aligned center">Slab</th>
                          </tr>
                          <tr>
                            <th className="aligned center">1RH</th>
                          </tr>
                          <tr>
                            <th className="aligned center">2LF</th>
                          </tr>
                          <tr>
                            <th className="aligned center">1LF</th>
                          </tr>
                          <tr>
                            <th className="aligned center">2BAP</th>
                          </tr>
                          <tr>
                            <th className="aligned center">1BAP</th>
                          </tr>
                          <tr>
                            <th className="aligned center">2전로</th>
                          </tr>
                          <tr>
                            <th className="aligned center">1전로</th>
                          </tr>
                        </tbody>
                      }
                    </table>
                  </td>
                  <td>
                    <table className="ui table">
                      <tbody>
                        {
                  datas.length > 0 ?
                    datas.map((hour, i) =>
                      <tr key={i}>
                        {
        (hour.mSteWkYrdNo).map((mSteWkYrdNo, i2) =>
          <td key={i2}>
            {
              mSteWkYrdNo.map((data, index) =>
                <LabelView
                  key={index}
                  typeColor={data.color}
                  x={`${data.left}%`}
                  width={`${data.width}%`}
                  text={`${data.text}`}
                  mtlNo={data.mtlNo}
                  prpChargeNo={data.prpChargeNo}
                  planChargeNo={data.planChargeNo}
                  smSteelGrdN={data.smSteelGrdN}
                  mcNo={data.mcNo}
                  tt={data.tt}
                  operStartTime={data.operStartTime}
                  operEndTime={data.operEndTime}
                  datas={data}
                  operFlag={operFlag}
                />
              )
            }
          </td>
        )
      }
                      </tr>
                    )
                    : null
                }
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SteelScheduleMonitoringTableView;

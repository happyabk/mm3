
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { mesAutobind } from '@mes/mes-shared';
import moment from 'moment';

@mesAutobind
@observer
class SteelScheduleMonitoringTooltipView extends Component {

  render() {

    const {
      mtlNo,
      prpChargeNo,
      planChargeNo,
      smSteelGrdN,
      mcNo,
      tt,
      operStartTime,
      operEndTime,
      datas,
      operFlag,
    } = this.props;


    const eqpDormantCdArr = datas.eqpDormantCd !== undefined ? (datas.eqpDormantCd).split('^') : undefined;
    const eqpDormantCdDescArr = datas.eqpDormantCd !== undefined ? (datas.eqpDormantCdDesc).split('^') : undefined;
    const eqpDormantTimeArr = datas.eqpDormantCd !== undefined ? (datas.eqpDormantTime).split('^') : undefined;

    return (
      <div className="table-row fixed pxw-200">
        <table className="ui table center">
          <colgroup>
            <col style={{ width: '20%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '60%' }} />
          </colgroup>
          <tbody>
            <tr>
              <th colSpan={2}>강번</th>
              <td className="left">{mtlNo}</td>
            </tr>
            {
              operFlag === 'C' && datas.opCd !== 'W' ?
                <tr>
                  <th colSpan={2}>준비강번</th>
                  <td className="left">{prpChargeNo}</td>
                </tr>
                : null
            }
            {
              operFlag === '3' ?
                <tr>
                  <th colSpan={2}>준비강번</th>
                  <td className="left">{prpChargeNo}</td>
                </tr>
                : null
            }
            <tr>
              <th colSpan={2}>예정번호</th>
              <td className="left">{planChargeNo}</td>
            </tr>
            <tr>
              <th colSpan={2}>출강목표</th>
              <td className="left">{smSteelGrdN}</td>
            </tr>
            <tr>
              <th colSpan={2}>MC번호</th>
              <td className="left">{mcNo}</td>
            </tr>
            <tr>
              <th colSpan={2}>연연주</th>
              <td className="left">{tt}</td>
            </tr>
            {
              datas.sm2ndRfnCd !== undefined  && operFlag === 'C' ?
                <tr>
                  <th colSpan={2}>2차정련</th>
                  <td className="left">{datas.sm2ndRfnCd || ''}</td>
                </tr>
                : null
            }
            <tr>
              {operFlag === 'C' && (datas.opCd === 'G' || (datas.opCd === 'T' || datas.opCd === 'Q' || datas.opCd === 'R')) ? <th colSpan={2}>도착일시</th> : null }
              {operFlag === 'C' && datas.opCd === 'W' ? <th colSpan={2}>주조개시</th> : null }
              {(operFlag === 'C' && datas.opCd !== 'W' && datas.opCd !== 'G' && datas.opCd !== 'T' && datas.opCd !== 'Q' && datas.opCd !== 'R') || operFlag === '3' ? <th colSpan={2}>개시일시</th> : null }
              <td className="left">{operStartTime !== undefined ? moment(operStartTime).format('MM-DD HH:mm') : ''}</td>
            </tr>
            <tr>
              {operFlag === 'C' && (datas.opCd === 'G' || (datas.opCd === 'T' || datas.opCd === 'Q' || datas.opCd === 'R')) ? <th colSpan={2}>출발일시</th> : null }
              {operFlag === 'C' && datas.opCd === 'W' ? <th colSpan={2}>주조완료</th> : null }
              {(operFlag === 'C' && datas.opCd !== 'W' && datas.opCd !== 'G' && datas.opCd !== 'T' && datas.opCd !== 'Q' && datas.opCd !== 'R') || operFlag === '3' ? <th colSpan={2}>완료일시</th> : null }
              <td className="left">{operEndTime !== undefined ? moment(operEndTime).format('MM-DD HH:mm') : ''}</td>
            </tr>
            {
              operFlag === 'C' && (datas.opCd === 'T' || datas.opCd === 'Q' || datas.opCd === 'R') ?
                <tr>
                  <th colSpan={2}>개시일시</th>
                  <td className="left">{datas.ttStartTime || ''}</td>
                </tr>
                : null
            }
            {
              operFlag === 'C' && (datas.opCd === 'T' || datas.opCd === 'Q' || datas.opCd === 'R') ?
                <tr>
                  <th colSpan={2}>완료일시</th>
                  <td className="left">{datas.ttEndTime || ''}</td>
                </tr>
                : null
            }
            {
              operFlag === 'C' && (datas.opCd === 'T' || datas.opCd === 'Q' || datas.opCd === 'R') ?
                <tr>
                  <th colSpan={2}>작업시간</th>
                  <td className="left">{datas.timeDiffOper || ''}</td>
                </tr>
                : null
            }
            {
              operFlag === 'C' && (datas.opCd === 'T' || datas.opCd === 'Q' || datas.opCd === 'R') ?
                <tr>
                  <th colSpan={2}>총처리시간</th>
                  <td className="left">{datas.tPrcTm || ''}</td>
                </tr>
                : null
            }
            {
             operFlag === 'C' &&  datas.bapBotBbGasFlowQt !== undefined ?
               <tr>
                 <th colSpan={2}>Bubbling유량</th>
                 <td className="left">{datas.bapBotBbGasFlowQt || ''}</td>
               </tr>
               : null
            }

            {/* LF 부분 */}
            {
              operFlag === 'C' && datas.lfPrcPasNumTAstTm !== undefined ?
                <tr>
                  <th colSpan={2}>총승온시간</th>
                  <td className="left">{datas.lfPrcPasNumTAstTm || ''}</td>
                </tr>
                : null
            }
            {
              operFlag === 'C' && datas.lfPrcPasNumTAstTm !== undefined ?
                <tr>
                  <th colSpan={2}>승온시간<br />(1차/2차/3차)</th>
                  <td className="left">{`${datas.lfAstTm1 || ''}/${datas.lfAstTm2 || ''}/${datas.lfAstTm3 || ''}`}</td>
                </tr>
                : null
            }
            {
              operFlag === 'C' && datas.lfPrcPasNumTAstTm !== undefined ?
                <tr>
                  <th colSpan={2}>총승온량(KWh)</th>
                  <td className="left">{datas.lfAstTEFrcUseQt || ''}</td>
                </tr>
                : null
            }
            {
              operFlag === 'C' && datas.lfPrcPasNumTAstTm !== undefined ?
                <tr>
                  <th colSpan={2}>TopBubbling시간</th>
                  <td className="left">{datas.totLfTopBubTm || ''}</td>
                </tr>
                : null
            }
            {
              operFlag === 'C' && datas.lfPrcPasNumTAstTm !== undefined ?
                <tr>
                  <th colSpan={2}>Top 세부<br />(1/2/3/4)</th>
                  <td className="left">{`${datas.lfTopBubTm1 || ''}/${datas.lfTopBubTm2 || ''}/${datas.lfTopBubTm3 || ''}/${datas.lfTopBubTm4 || ''}`}</td>
                </tr>
                : null
            }

            {/* RH 부분 */}
            {
              operFlag === 'C' && datas.rhRiseSoakUseTim !== undefined ?
                <tr>
                  <th colSpan={2}>침적관(상승관)</th>
                  <td className="left">{datas.rhRiseSoakUseTim || ''}</td>
                </tr>
                : null
            }
            {
              operFlag === 'C' && datas.rhRiseSoakUseTim !== undefined ?
                <tr>
                  <th colSpan={2}>침적관(하강관)</th>
                  <td className="left">{datas.rhDwSoakUseTim || ''}</td>
                </tr>
                : null
            }
            {
              operFlag === 'C' && datas.rhRiseSoakUseTim !== undefined ?
                <tr>
                  <th colSpan={2}>Vessel온도<br />(전/후)</th>
                  <td className="left">{`${datas.rhPrcBeVesTm || ''}/${datas.rhPrcAfVesTm || ''}`}</td>
                </tr>
                : null
            }
            {
              operFlag === 'C' && datas.rhRiseSoakUseTim !== undefined ?
                <tr>
                  <th colSpan={2}>총 OB량</th>
                  <td className="left">{datas.rhobTTrnQt || ''}</td>
                </tr>
                : null
            }
            {
              operFlag === 'C' && datas.rhRiseSoakUseTim !== undefined ?
                <tr>
                  <th colSpan={2}>최저 진공도</th>
                  <td className="left">{datas.rhLowestVaccumPnt || ''}</td>
                </tr>
                : null
            }


            {
              operFlag === 'C' && datas.smLdBlwStmInjScTm !== undefined ?
                <tr>
                  <th colSpan={2}>최저 주입개시예정</th>
                  <td className="left">{datas.smLdBlwStmInjScTm || ''}</td>
                </tr>
                : null
            }

            {/* 포항 전로일때만 null이 아닌 값이 있음 */}
            {
              operFlag === 'C' && datas.fceTapholeUseTim !== undefined ?
                <tr>
                  <th colSpan={2}>노체수명</th>
                  <td className="left">{datas.fceUseTim || ''}</td>
                </tr>
                : null
            }
            {
              operFlag === 'C' && datas.fceTapholeUseTim !== undefined ?
                <tr>
                  <th colSpan={2}>출강구수명</th>
                  <td className="left">{datas.fceTapholeUseTim || ''}</td>
                </tr>
                : null
            }
            {
              operFlag === 'C' && datas.fceTapholeUseTim !== undefined ?
                <tr>
                  <th colSpan={2}>취련시간</th>
                  <td className="left">{datas.ldFceOxBwTm || ''}</td>
                </tr>
                : null
            }
            {
              operFlag === 'C' && datas.fceTapholeUseTim !== undefined ?
                <tr>
                  <th colSpan={2}>출강시간</th>
                  <td className="left">{datas.tapTm || ''}</td>
                </tr>
                : null
            }
            {
              operFlag === 'C' && datas.fceTapholeUseTim !== undefined ?
                <tr>
                  <th colSpan={2}>용선성분(Si/P/S)</th>
                  <td className="left">{`${datas.v82Si || ''}/${datas.v84P || ''}/${datas.v85S || ''}`}</td>
                </tr>
                : null
            }
            {
              operFlag === 'C' && datas.fceTapholeUseTim !== undefined ?
                <tr>
                  <th colSpan={2}>취련횟수</th>
                  <td className="left">{datas.reCombusionCnt || ''}</td>
                </tr>
                : null
            }

            {
              operFlag === 'C' && datas.ladInjSatDt !== undefined ?
                <tr>
                  <th colSpan={2}>{operFlag === 'C' ? '주입개시' : '래들주입개시'}</th>
                  <td className="left">{datas.ladInjSatDt || ''}</td>
                </tr>
                : null
            }
            {
              operFlag === 'C' && datas.ladInjDnDt !== undefined ?
                <tr>
                  <th colSpan={2}>{operFlag === 'C' ? '주입완료' : '래들주입완료'}</th>
                  <td className="left">{datas.ladInjDnDt || ''}</td>
                </tr>
                : null
            }

            {
              operFlag === 'C' && datas.ladInjTm !== undefined ?
                <tr>
                  <th colSpan={2}>주입시간</th>
                  <td className="left">{datas.ladInjTm || ''}</td>
                </tr>
                : null
            }
            {
              operFlag === 'C' && datas.leadTimePlan !== undefined && datas.leadTime !== undefined && datas.leadTimeGap !== undefined ?
                <tr>
                  <th rowSpan={3}>Lead<br />Time</th>
                  <th>표준</th>
                  <td className="left">{datas.leadTimePlan || ''}</td>
                </tr>
                : null
            }
            {
              operFlag === 'C' && datas.leadTimePlan !== undefined && datas.leadTime !== undefined && datas.leadTimeGap !== undefined ?
                <tr>
                  <th>실적</th>
                  <td className="left">{datas.leadTime || ''}</td>
                </tr>
                : null
            }
            {
              operFlag === 'C' && datas.leadTimePlan !== undefined && datas.leadTime !== undefined && datas.leadTimeGap !== undefined ?
                <tr>
                  <th>차이</th>
                  <td className="left">{datas.leadTimeGap || ''}</td>
                </tr>
                : null
            }
            {
              operFlag === '3' && datas.leadTimePlan !== undefined && datas.leadTime !== undefined && datas.leadTimeGap !== undefined ?
                <tr>
                  <th>Lead<br />Time</th>
                  <th>실적</th>
                  <td className="left">{datas.leadTime || ''}</td>
                </tr>
                : null
            }
            {
              operFlag === 'C' && datas.ladRdyTm !== undefined ?
                <tr>
                  <th colSpan={2}>준비시간</th>
                  <td className="left">{datas.ladRdyTm || ''}</td>
                </tr>
                : null
            }
            {
              operFlag === 'C' && datas.chargePsOpCd !== undefined ?
                <tr>
                  <th colSpan={2}>통과공정</th>
                  <td className="left">{datas.chargePsOpCd || ''}</td>
                </tr>
                : null
            }
            {
              operFlag === 'C' && datas.strandNum !== undefined ?
                <tr>
                  <th colSpan={2}>Mold수명</th>
                  <td className="left">{`(${datas.strandNum || ''})${datas.moldUseNum || ''}`}</td>
                </tr>
                : null
            }
            {
              operFlag === 'C' && datas.strandNum !== undefined ?
                <tr>
                  <th colSpan={2}>주조시간</th>
                  <td className="left">{datas.timeDiffOper || ''}</td>
                </tr>
                : null
            }
            {
              datas.operDesc !== undefined && datas.operDesc !== '' ?
                <tr>
                  <td colSpan={3} style={{ color: '#CC0099' }}>{datas.operDesc || ''}</td>
                </tr>
                : null
            }
          </tbody>
        </table>
        {
          operFlag === 'C' && eqpDormantCdArr !== undefined ?
            <table className="ui table center">
              <colgroup>
                <col style={{ width: '20%' }} />
                <col style={{ width: '60%' }} />
                <col style={{ width: '20%' }} />
              </colgroup>
              <tbody>
                <tr>
                  <th>코드</th>
                  <th>휴지코드명</th>
                  <th>시간</th>
                </tr>
                {
            eqpDormantCdArr.length > 0 ?
              eqpDormantCdArr.map((eqp, i) =>
                <tr key={i}>
                  <td>{eqpDormantCdArr[i]}</td>
                  <td className="left">{eqpDormantCdDescArr[i]}</td>
                  <td>{eqpDormantTimeArr[i]}</td>
                </tr>
              ) : null }
              </tbody>
            </table>
            : null
        }
      </div>
    );
  }
}

export default SteelScheduleMonitoringTooltipView;

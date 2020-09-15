/*==============================================================================================
* @화면ID(명): m2dc010110(출강Schedule조회)
* Change history
* @2019-11-08;00000;최수지;최초생성
==============================================================================================*/
import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { mesAutobind } from '@mes/mes-shared';
import { Popup, link } from '@mes/mes-ui-react';
import { keyframes } from 'styled-components';
import HeaderRenderView from '../view/HeaderRenderView';
import { DataGridHeightView, PosM2DUtility } from '@/common';

@inject('m2dc010110Store')
@observer
@mesAutobind
class TappingMoltenScheduleBodyContainer extends Component {
  blinker = keyframes`70% { opacity: 0; }`;
  popupStyle = { height: '20px', cursor: 'pointer' };

  columnDefsP=[
    {
      colId: 'mtlNo',
      field: 'mtlNo',
      headerName: '강번',
      width: 60,
      headerComponent: 'HeaderRender',
      headerComponentParams: { header: '전로취련실적관리화면으로 이동합니다.' },
      cellStyle(grid) {
        const style = {};
        if (grid.data.caimACount > 0) { style.backgroundColor = '#ffd700'; }
        else if (grid.data.mlHeavyCount > 0) { style.backgroundColor = '#ffccff'; }
        return style;
      },
      cellRendererParams: {
        //출강취련실적
        onClick: (cProps) => {
          const searchLink = {
            facOpCdN: cProps.data.facOpCdN || undefined,
            mtlNo: cProps.data.mtlNo || undefined,
          };
          const url = PosM2DUtility.menuItemsLink(this.props.allUserInfo, 'm2db020110', '', searchLink);
          this.setPopout(url);
        },
      },
      cellRendererFramework: cProps => {
        const { data, onClick } = cProps;
        const value =  <a onClick = { () => onClick(cProps)}> {cProps.value}</a>;
        let header;
        if (data.caimACount > 0) { header = '자동차강판'; }
        else if (data.mlHeavyCount > 0) { header = '중저후물재 Blow Hole 다발강종'; }
        if (header) {
          return (this.popupView(value, {
            className: 'pop-memo',
            header,
          }));
        }
        return value;
      },
    },
    {
      colId: 'prpChargeNo1',
      field: 'prpChargeNo1',
      headerName: '준비강번',
      width: 60,
    },
    {
      colId: 'indiMtlNo',
      field: 'indiMtlNo',
      headerName: '지시강번',
      width: 60,

      cellStyle(grid) {
        const style = {};
        const { strPrdColor1, strPrdColor2, strPrdColor3, strPrdColor4, strPrdColor5 } = grid.data;
        //CR 하한값>=0.1% 조건인 경우 바탕색을 초록색으로 변경 및 툴팁 표현
        //if (crMinN >= 0.1) { style.backgroundColor = '#66FF66'; }
        if (strPrdColor1) { style.backgroundColor = '#' + strPrdColor1; }
        else if (strPrdColor2) { style.backgroundColor = '#' + strPrdColor2; }
        else if (strPrdColor3) { style.backgroundColor = '#' + strPrdColor3; }
        else if (strPrdColor4) { style.backgroundColor = '#' + strPrdColor4; }
        else if (strPrdColor5) { style.backgroundColor = '#' + strPrdColor5; }
        return style;
      },
      cellRendererFramework: cProps => {
        const { value, data } = cProps;
        const content = (
          <table className="table-row ui table center">
            <thead>
              <tr>
                <th>분류코드</th>
                <th>분류명</th>
                <th>매수</th>
                <th>중량</th>
              </tr>
            </thead>
            <tbody>
              {data.strProductClsCd1 ?
                <tr style ={{ backgroundColor: '#' + data.strPrdColor1  }}>
                  <td>{data.strProductClsCd1}</td>
                  <td>{data.strProductClsNm1}</td>
                  <td>{data.spcCnt1}</td>
                  <td>{data.spcWgt1}</td>
                </tr> : []}
              {data.strProductClsCd2 ?
                <tr style ={{ backgroundColor: '#' + data.strPrdColor2  }}>
                  <td>{data.strProductClsCd2}</td>
                  <td>{data.strProductClsNm2}</td>
                  <td>{data.spcCnt2}</td>
                  <td>{data.spcWgt2}</td>
                </tr> : []}
              {data.strProductClsCd3 ?
                <tr style ={{ backgroundColor: '#' + data.strPrdColor3 }}>
                  <td>{data.strProductClsCd3}</td>
                  <td>{data.strProductClsNm3}</td>
                  <td>{data.spcCnt3}</td>
                  <td>{data.spcWgt3}</td>
                </tr> : []}
              {data.strProductClsCd4 ?
                <tr style ={{ backgroundColor: '#' + data.strPrdColor4 }}>
                  <td>{data.strProductClsCd4}</td>
                  <td>{data.strProductClsNm4}</td>
                  <td>{data.spcCnt4}</td>
                  <td>{data.spcWgt4}</td>
                </tr> : []}
              {data.strProductClsCd5 ?
                <tr style ={{ backgroundColor: '#' + data.strPrdColor5 }}>
                  <td>{data.strProductClsCd5}</td>
                  <td>{data.strProductClsNm5}</td>
                  <td>{data.spcCnt5}</td>
                  <td>{data.spcWgt5}</td>
                </tr> : []}
            </tbody>
          </table>
        );
        return this.popupView(value, { content });
      },
    },
    {
      colId: 'planChargeNo',
      field: 'planChargeNo',
      headerName: `예정번호`,
      width: 65,
      headerComponent: 'HeaderRender',
      headerComponentParams: {
        header: '주편연주지시조회화면으로 이동합니다.',
      },
      cellRendererFramework: cProps => <a onClick={() => cProps.onClick(cProps)}>{cProps.value}</a>,
      cellRendererParams: {
        onClick: () => {
          const url = PosM2DUtility.menuItemsLink(this.props.allUserInfo, 'm2ea031020', '주편연주지시조회',);
          this.setPopout(url);
          // this.setPopout( `/common/m2ea03-front/m2ea031020?layout=hidden`)
        },
      },
    },
    {
      colId: 'smSteelGrdN',
      field: 'smSteelGrdN',
      headerName: '출강목표',
      width: 110,
      cellStyle(grid) {
        const { pplP4ldThwTp, isUltiThinLine, steelMixingFlag } = grid.data;
        const style = { textAlign: 'center' };
        if (pplP4ldThwTp === 'B') { style.backgroundColor = '#ffccff'; }
        if (isUltiThinLine === 'Y') {
          style.color = 'blue';
        } else if (steelMixingFlag === 'Y') {
          style.color = '#d50000';
        }
        return style;
      },
      cellRendererFramework: cProps => {
        const { value, data } = cProps;
        if (data.pplP4ldThwTp === 'B') {
          return (
            this.popupView(value, {
              className: 'pop-memo',
              header: '4전로탈탄가능재',
            })
          );
        }
        return cProps.value;
      },
    },
    {
      colId: 'castMcCntSeq',
      field: 'castMcCntSeq',
      headerName: '연연주',
      width: 50,
      cellStyle(grid) {
        const style = { textAlign: 'center' };
        const { typeFlag } = grid.data;
        if (typeFlag === 'NEW') {
          //'미생산 신강종입니다.'
          style.backgroundColor = '#86E57F';
        } else if (typeFlag === 'OLD') {
          //장기 미생산 강종 tooltip
          style.backgroundColor = '#FAED7D';
        }
        return style;
      },
      cellRendererFramework: cProps => {
        const { value, data } = cProps;
        if (data.typeFlag === 'NEW') {
          return (
            this.popupView(value, {
              className: 'pop-memo',
              header: `미생산 신강종입니다.`,
            })
          );
        } else if (data.typeFlag === 'OLD') {
          return (
            this.popupView(value, {
              className: 'pop-memo',
              header: `장기 미생산 강종`,
              content: `최종생산일: ${data.historyDate}`,
            })
          );
        } else {
          return (value);
        }
      },
    },
    {
      colId: 'sm2ndRfnCd',
      field: 'sm2ndRfnCd',
      headerName: '2차정련',
      width: 50,
      cellStyle(grid) {
        const { data } = grid;
        const style = { textAlign: 'center' };
        if (data.jisCount > 1 || data.euCount > 1) { style.backgroundColor = '#d50000'; }
        else if (data.rhAbleTp === 'A') { style.backgroundColor = ''; }
        else if (data.u50tCount > 1) { style.backgroundColor = 'orange'; }
        return style;
      },
      cellRendererFramework: cProps => {
        const { value, data } = cProps;
        let content;

        if (data.jisCount > 1) {
          if (data.u50tCount > 1) {
            //bgcolor=red
            content = `JIS규격 슬라브 ${data.jisCount}매 편성,후판50T 초과 고급재 ${data.u50tCount}매 포함`;
          } else {
            //bgcolor=red
            content = `JIS규격 슬라브 ${data.jisCount}매 편성`;
          }
        } else if (data.euCount > 1) {
          //bgcolor=red
          content = `EU규격 슬라브 ${data.euCount}매 편성`;
        } else if (data.rhAbleTp === 'A') {
          //bgcolor=
          content = `RH가능재(PZT5B, PZT8D, PZTDS, PZTDQ )`;

        } else if (data.u50tCount > 1) {
          //bgcolor=orange
          content = `후판50T 초과 고급재 ${data.u50tCount}매 포함`;
        } else {
          content = (
            <table className="ui table center table-row">
              <thead>
                <tr><th colSpan={3}>UST탑상</th></tr>
                <tr><th>LOT</th><th>등급</th><th>두께</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data.plUstLot}</td>
                  <td>{data.plUstGrd}</td>
                  <td>{data.pltOrderThick}</td>
                </tr>
              </tbody>
            </table>
          );
        }
        return (this.popupView(value, { content }));
      },
    },
    {
      colId: 'moltenSteelCharCdN',
      field: 'moltenSteelCharCdN',
      headerName: '용강특성',
      width: 60,
      headerComponent: 'HeaderRender',
      headerComponentParams: {
        header: '지시ORDER성분정보조회화면으로 이동합니다.',
      },
      cellRendererFramework: cProps =>  <a onClick={() => cProps.onClick(cProps)}>{cProps.value}</a>,
      cellRendererParams: {
        //지시ORDER성분정보조회
        onClick: (cProps) => {
          const searchLink = {
            facOpCdN: cProps.data.facOpCdN || undefined,
            planChargeNo: cProps.data.planChargeNo || undefined,
            mtlNo: cProps.data.mtlNo || undefined,
          };
          const url = PosM2DUtility.menuItemsLink(this.props.allUserInfo, 'm2dc010220', '', searchLink);
          this.setPopout(url);
        },
      },
    },
    {
      colId: 'orderUsageCdN',
      field: 'orderUsageCdN',
      headerName: '용도',
      width: 40,
      cellRendererFramework: cProps => {
        let vlaue =  cProps.value || '';
        if (vlaue.includes('>')) {
          vlaue = vlaue.split('>')[1].split('</')[0];
        }
        return this.popupView(vlaue, {
          className: 'pop-memo',
          header: cProps.data.orderUsageFullname,
        });
      },

    },
    {
      colId: 'smModExistF',
      field: 'smModExistF',
      headerName: '요령',
      width: 40,
      cellStyle(grid) {
        const style = { color: '#d50000' };
        const { data } = grid;
        if (data.isCompDiffP === 'Y') {
          style.backgroundColor = '';
        }
        return style;
      },
      cellRendererFramework: cProps => {
        const { value, data } = cProps;
        if (data.isCompDiffP === 'Y') {
          return (this.popupView(value, {
            className: 'pop-memo',
            header: '지시성분과 제강요령이 상이함',
          }));
        }
        return value || '';
      },
    },
    {
      colId: 'tapIndiJdgTp',
      field: 'tapIndiJdgTp',
      headerName: '대체',
      width: 40,
    },
    {
      colId: 'specificationCdN',
      field: 'specificationCdN',
      headerName: '규격',
      width: 90,
    },
    {
      colId: 'smDpfDpIndmTp',
      field: 'smDpfDpIndmTp',
      headerName: '탈린',
      width: 40,
    },
    {
      colId: 'steelMixingFlag',
      field: 'steelMixingFlag',
      headerName: '조합',
      width: 40,
      headerComponent: 'HeaderRender',
      headerComponentParams: {
        header: '조합성분지시조회화면으로 이동합니다.',
      },
      cellStyle(grid) {
        const style = {};
        const { data } = grid;
        if (data.steelMixingFlag === 'Y') { style.color = '#d50000'; }
        return style;
      },
      cellRendererParams: {
        onClick: (cProps) => {
          const searchLink = {
            facOpCdN: cProps.data.facOpCdN || undefined,
            mtlNo: cProps.data.mtlNo || undefined,
            planChargeNo: cProps.data.planChargeNo || undefined,
          };
          const url = PosM2DUtility.menuItemsLink(this.props.allUserInfo, 'm2dc010150', '', searchLink);
          this.setPopout(url);
        },
      },
      cellRendererFramework: cProps => {
        const { data } = cProps;
        const value = (
          <a onClick = { () => cProps.onClick(cProps)} style ={{ color: data.steelMixingFlag === 'Y' ? '#d50000' : '' }}>
            {cProps.value}
          </a>
        );
        if (cProps.value === 'Y') {
          const content = (
            <table className="ui table center table-row">
              <thead>
                <tr>
                  <th>출강목표</th>
                  <th>2차정련코드</th>
                </tr>
              </thead>
              <tbody>
                {data.smSteelGrdN1 || data.sm2ndRfnCd1 ?
                  <tr>
                    <td>{data.smSteelGrdN1}</td>
                    <td>{data.sm2ndRfnCd1}</td>
                  </tr> : []
                }
                {data.smSteelGrdN2 || data.sm2ndRfnCd2 ?
                  <tr>
                    <td>{data.smSteelGrdN2}</td>
                    <td>{data.sm2ndRfnCd2}</td>
                  </tr> : []
                }
                {data.smSteelGrdN3 || data.sm2ndRfnCd3 ?
                  <tr>
                    <td>{data.smSteelGrdN3}</td>
                    <td>{data.sm2ndRfnCd3}</td>
                  </tr> : []
                }
                {data.smSteelGrdN4 || data.sm2ndRfnCd4 ?
                  <tr>
                    <td>{data.smSteelGrdN4}</td>
                    <td>{data.sm2ndRfnCd4}</td>
                  </tr> : []
                }
                {data.smSteelGrdN5 || data.sm2ndRfnCd5 ?
                  <tr>
                    <td>{data.smSteelGrdN5}</td>
                    <td>{data.sm2ndRfnCd5}</td>
                  </tr> : []
                }
              </tbody>
            </table>
          );
          return (this.popupView(value, {
            className: 'pop-memo',
            content,
          }));
        }
        return value;
      },
    },
    {
      colId: 'ldEqpNo',
      field: 'ldEqpNo',
      headerName: '로 No',
      width: 40,
      cellStyle(grid) {
        const style = { textAlign: 'center' };
        if (grid.data.ldEqpNoRst === 'R') {
          style.color = '#d50000';
        }
        return style;
      },
    },
    {
      colId: 'tapSatDt',
      field: 'tapSatDt',
      headerName: '출강개시',
      width: 50,
      cellStyle(grid) {
        const style = { textAlign: 'center' };
        if (grid.data.tapSatDtRst === 'R') {
          style.color = '#d50000';
        }
        return style;
      },
    },
    {
      colId: 'bapTrtNo',
      field: 'bapTrtNo',
      headerName: 'BAP No',
      width: 50,

      // headerComponent: 'HeaderRender',
      // headerComponentParams: {
      //   header: '2차정련실적관리(BAP실적)화면으로 이동합니다.',
      // },
      cellRendererFramework: cProps => {
        const { data, value } = cProps;
        if (data.bapTrtNoRst === 'R') {
          return <a onClick={() => cProps.onClick(cProps)}>{value}</a>;
        }
        return value;
      },
      cellRendererParams: {
        onClick: (cProps) => this.trtNoPopup(cProps, 'BAP'),
      },
    },
    {
      colId: 'lfTrtNo',
      field: 'lfTrtNo',
      headerName: 'LF No',
      width: 50,

      // headerComponent: 'HeaderRender',
      // headerComponentParams: {
      //   header: '2차정련실적관리(LF실적)화면으로 이동합니다.',
      // },
      cellRendererFramework: cProps => {
        const { data, value } = cProps;
        if (data.lfTrtNoRst === 'R') {
          return <a onClick={() => cProps.onClick(cProps)}>{value}</a>;
        }
        return value || '';
      },
      cellRendererParams: {
        onClick: (cProps) => this.trtNoPopup(cProps, 'LF'),
      },
    },
    {
      colId: 'rhTrtNo',
      field: 'rhTrtNo',   //ctlActRcvRhTrtNo
      headerName: 'RH No',
      width: 50,

      // headerComponent: 'HeaderRender',
      // headerComponentParams: {
      //   header: '2차정련실적관리(RH실적)화면으로 이동합니다.',
      // },
      cellRendererFramework: cProps => {
        const { data, value } = cProps;
        if (data.rhTrtNoRst === 'R') {
          return <a onClick={() => cProps.onClick(cProps)}>{value}</a>;
        }
        return value || '';
      },
      cellRendererParams: {
        onClick: (cProps) => this.trtNoPopup(cProps, 'RH'),
      },
    },
    {
      colId: 'vtdTrtNo',
      field: 'vtdTrtNo',
      headerName: 'VTD No',
      width: 50,
      cellRendererFramework: cProps => {
        const { data, value } = cProps;
        if (data.vtdTrtNoRst === 'R') {
          return <a onClick={() => cProps.onClick(cProps)}>{value}</a>;
        }
        return value || '';
      },
      cellRendererParams: {
        onClick: (cProps) => this.trtNoPopup(cProps, 'VTD'),
      },
    },
    {
      colId: 'strandSortWthVarF',
      field: 'strandSortWthVarF',
      headerName: '이폭',

    },
    {
      colId: 'strandSortCastWth',
      field: 'strandSortCastWth',
      headerName: '주조폭',

    },
    {
      colId: 'castSatDt',
      field: 'castSatDt',
      headerName: '주조개시',
      width: 50,
      cellStyle(grid) {
        const style = { textAlign: 'center' };
        if (grid.data.castSatDtRst === 'R') {
          style.color = '#d50000';
        }
        return style;
      },
    },
  ];

  columnDefsK=[
    {
      colId: 'mtlNo',
      field: 'mtlNo',
      headerName: '강번',
      width: 60,
      headerComponent: 'HeaderRender',
      headerComponentParams: {
        header: '전로취련실적관리화면으로 이동합니다.',
      },
      cellStyle(grid) {
        const style = {};
        if (grid.data.caimACount > 0) { style.backgroundColor = '#ffd700'; }
        else if (grid.data.mlHeavyCount > 0) { style.backgroundColor = '#ffccff'; }
        return style;
      },
      cellRendererFramework: cProps => {
        const { data, onClick } = cProps;
        const value =  <a onClick = { () => onClick(cProps)}> {cProps.value}</a>;
        let header;
        if (data.caimACount > 0) { header = '자동차강판'; }
        else if (data.mlHeavyCount > 0) { header = '중저후물재 Blow Hole 다발강종'; }
        if (header) {
          return (this.popupView(value, {
            className: 'pop-memo',
            header,
          }));
        }
        return value;
      },
      cellRendererParams: {
        onClick: (cProps) => {
          const searchLink = {
            facOpCdN: cProps.data.facOpCdN || '',
            mtlNo: cProps.data.mtlNo || '',
          };
          const url = PosM2DUtility.menuItemsLink(this.props.allUserInfo, 'm2db020110', '', searchLink);
          this.setPopout(url);
        },
      },
    },
    {
      colId: 'prpChargeNo1',
      field: 'prpChargeNo1',
      headerName: '준비강번',
      width: 60,
    },
    {
      colId: 'indiMtlNo',
      field: 'indiMtlNo',
      headerName: '지시강번',
      width: 60,
      cellStyle(grid) {
        const style = {};
        const { crMinN } = grid.data;
        if (crMinN >= 0.1) { style.backgroundColor = '#66FF66'; }
        return style;
      },
      cellRendererFramework: cProps => {
        const { value, data } = cProps;
        if (data.crMinN >= 0.1) {
          return (this.popupView(value, { header: '[Cr]첨가 스크랩 사용 가능', className: 'pop-memo' }));
        }
        return value;
      },

    },
    {
      colId: 'planChargeNo',
      field: 'planChargeNo',
      headerName: `예정번호`,
      width: 70,
      cellStyle(grid) {
        const style = { textAlign: 'center' };
        const { data, value } = grid;
        if (data.hmInfo) {
          style.backgroundColor = '#' + data.hmColor;
        } else if (value.includes('SPHS')) {
          style.backgroundColor = '#fff9c4';
        } else if (data.poQlyHdmEa > 0) {
          style.backgroundColor = '#82b1ff';
        }
        return style;
      },
      cellRendererFramework: cProps => {
        const { data } = cProps;
        const value = (
          <div
            style ={{ animation: data.hmCount * 1 > 3 ? `${this.blinker} 1s linear infinite` : '' }}
          >
            {cProps.value}
          </div>
        );
        if (data.hmInfo) {
          const content = (
            <table>
              <tr>
                <td>
                  <b>{data.hmDesc + data.hmCount} 매 편성</b>
                </td>
              </tr>
              {data.hmSmRem !== '-' ?
                <tr>제강특기사항 : {data.hmSmRem}</tr>
                : []}
              {data.hmCcRem !== '-' ?
                <tr>연주특기사항 : {data.hmCcRem}</tr>
                : []}
              {data.hmFnRem !== '-' ?
                <tr>연주특기사항 : {data.hmFnRem}</tr>
                : []}
            </table>
          );
          return (this.popupView(value, { content }));
        } else if (data.poFlag) {
          return (this.popupView(value, { header: 'PO재', className: '' }));
        } else if (cProps.value && cProps.value.includes('SPHS')) {
          return (this.popupView(value, { header: '하이밀 용강 이송대상재', className: 'pop-memo' }));
        } else if (data.poQlyHdmEa > 0) {
          return (this.popupView(value, { header: 'PO품질엄격재' + data.poQlyHdmEa + '매 편성', className: 'pop-memo' }));
        }
        return value;
      },
    },
    { //title='비산화원소 첨가강(잔탕 및 SCRAP 분리 회수 대상)'
      colId: 'smSteelGrdN',
      field: 'smSteelGrdN',
      headerName: '출강목표',
      width: 110,
      cellStyle(grid) {
        const style = { textAlign: 'center' };
        const { data } = grid;
        if (data.plateConstCautionFlag === 'Y') {
          style.backgroundColor = '#82b1ff';
        }
        if (data.steelMixingFlag === 'Y') {
          style.color = '#d50000';
        } else if (data.nMax <= 25 ) {
          style.color = 'blue';
        } else if (data.crMax === 0.01 ) {
          style.color = '#d50000';
        }
        if (data.scrapDiviFlag === 'Y') {
          style.fontWeight = 'bold';
        }
        return style;
      },
      cellRendererFramework: cProps => {
        const { data } = cProps;
        let header;

        const value = (
          <div
            style ={{ animation: data.wasteMotorUseFlag === 'Y' ? `${this.blinker} 1s linear infinite` : '' }}
          >
            {cProps.value}
          </div>
        );
        if (data.plateConstCautionFlag === 'Y') {
          header = '후판재 성분범위주의 강종';
        } else if (data.nMax <= 25 ) {
          header = 'N 25ppm이하';
        } else if (data.crMax === 0.01 ) {
          header = '[CR]=100ppm';
        }
        if (header) {
          return (this.popupView(value, { header, className: 'pop-memo' }));
        } else {
          const content = (
            <div className="table-row">
              <table className="ui table center">
                <thead>
                  <tr>
                    <th>Cu하한치</th>
                    <th>Cu목표치</th>
                    <th>Cu상한치</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{data.cuMin}</td>
                    <td>{data.cuAim}</td>
                    <td>{data.cuMax}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
          return this.popupView(value, { content });
        }
      },

    },
    {
      colId: 'castMcCntSeq',
      field: 'castMcCntSeq',
      headerName: '연연주',
      width: 40,
      cellStyle(grid) {
        const style = { textAlign: 'center' };
        const { data } = grid;
        if (data.facOpCdN === '1L1' && data.bapAlonePrcYn === 'Y') {
          style.backgroundColor = 'greenyellow';
        }
        return style;
      },
      cellRendererFramework: cProps => {
        const { value, data } = cProps;
        if (data.facOpCdN === '1L1' && data.bapAlonePrcYn === 'Y') {
          return (this.popupView(value, { header: 'BAP 단독처리 대상재 편성', className: 'pop-memo' }));
        }
        return value || '';
      },

    },
    {
      colId: 'sm2ndRfnCd',
      field: 'sm2ndRfnCd',
      headerName: '2차정련',
      width: 50,
      // headerComponent: 'HeaderRender',
      // headerComponentParams: {
      //   header: '품질Tracking기준 Guidance조회화면으로 이동합니다.',
      // },
      // cellRendererParams: {
      //   onClick: () => {
      //   },
      // },
      cellStyle(grid) {
        const style = { textAlign: 'center' };
        const { data } = grid;
        if (data.jisCount > 1 || data.euCount > 1) {
          style.backgroundColor = '#d50000';
          if (data.moltenSteelCharCdN === 'PZT5B' || data.moltenSteelCharCdN === 'PZT8D' || data.moltenSteelCharCdN === 'PZTDS' || data.moltenSteelCharCdN === 'PZTDQ') {
            style.backgroundColor = '';
          } else if (data.u50tCount > 1) {
            style.backgroundColor = 'orange';
          }
        }
        return style;
      },
      cellRendererFramework: cProps => {
        const {  data, onClick } = cProps;
        const value = <div style={onClick ? this.popupStyle : ({})} onClick={onClick || undefined}>{cProps.value}</div>;
        if (data.jisCount > 1 ) {
          return (this.popupView(value, { className: 'pop-memo',
            header: data.u50tCount > 1 ? `JIS규격 슬라브 ${data.jisCount}매 편성,후판50T 초과 고급재 ${data.u50tCount}매 포함` : `JIS규격 슬라브 ${data.jisCount}매 편성` }));
        } else if (data.euCount > 1) {
          return (this.popupView(value, {
            className: 'pop-memo',
            header: `EU규격 슬라브 ${data.euCount}매 편성`,
            content: (
              <Fragment>
                {data.moltenSteelCharCdN === 'PZT5B' || data.moltenSteelCharCdN === 'PZT8D' || data.moltenSteelCharCdN === 'PZTDS' || data.moltenSteelCharCdN === 'PZTDQ' ?
                  <p>RH가능재(PZT5B, PZT8D, PZTDS, PZTDQ )</p> : []}
                {data.u50tCount > 1 ? <p>{`후판50T 초과 고급재 ${data.u50tCount}매 포함`}</p> : []}
              </Fragment>
            ),
          }));
        }
        return value;
      },

    },
    {
      colId: 'moltenSteelCharCdN',
      field: 'moltenSteelCharCdN',
      headerName: '용강특성',
      headerComponent: 'HeaderRender',
      width: 50,
      headerComponentParams: {
        header: '지시ORDER성분정보조회화면으로 이동합니다.',
      },
      cellStyle(grid) {
        const style = { color: '#d50000' };
        const { data } = grid;
        if (data.smAyfeLcDestF === 'Y' || data.mzCount > 0) {
          //blinker
          style.backgroundColor = '';
          if (data.mzCount > 0) {
            style.color = '#d50000';
          }
        }
        return style;
      },
      cellRendererFramework: cProps => {
        const { data, onClick } = cProps;
        const value = (
          <a onClick={() => onClick(cProps)}
            style ={{ animation: data.smAyfeLcDestF === 'Y' || data.mzCount > 0 ? `${this.blinker} 1s linear infinite` : '' }}
          >{cProps.value}
          </a>
        );
        if (data.mzCount > 0 ) {
          return (this.popupView(value, { className: 'pop-memo',
            header: (
              <Fragment>
                <b>{`ORDER TYPE=MZ(계획재) ${data.mzCount}매 포함`}</b>
                {data.smAyfeLcDestF === 'Y' ? <b>{`저감지시 대상재[${data.smAyfeLcDestConsTp}]`}</b> : ''}
              </Fragment>) }));
        } else if (data.smAyfeLcDestF === 'Y') {
          return (this.popupView(value, {
            className: 'pop-memo',
            header: `저감지시 대상재`,
            content: data.smAyfeLcDestConsTp,
          }));
        }
        return value;
      },
      cellRendererParams: {
        //지시ORDER성분정보조회
        onClick: (cProps) => {

          const searchLink = {
            facOpCdN: cProps.data.facOpCdN || undefined,
            planChargeNo: cProps.data.planChargeNo || undefined,
            mtlNo: cProps.data.mtlNo || undefined,
          };
          const url = PosM2DUtility.menuItemsLink(this.props.allUserInfo, 'm2dc010220', '', searchLink);
          this.setPopout(url);
        },
      },
    },
    {
      colId: 'smModExistF',
      field: 'smModExistF',
      headerName: '요령',
      width: 50,
      cellStyle(grid) {
        const style = { color: '#d50000' };
        const { data } = grid;
        if (data.isCompDiff === 'Y') {
          style.backgroundColor = '';
        }
        return style;
      },
      cellRendererFramework: cProps => {
        const { value, data } = cProps;
        if (data.isCompDiff === 'Y') {
          return (this.popupView(value, {
            className: 'pop-memo',
            header: `지시성분과 제강요령이 상이함`,
          }));
        }
        return value || '';
      },
    },

    {
      colId: 'tapIndiJdgTp',
      field: 'tapIndiJdgTp',
      headerName: '대체',
      width: 40,

    },
    {
      colId: 'specificationCdN',
      field: 'specificationCdN',
      headerName: '규격',

      width: 80,
    },
    {
      colId: 'orderThick',
      field: 'orderThick',
      headerName: '주문두께',
      width: 50,
      headerComponent: 'HeaderRender',
      headerComponentParams: {
        header: '주편연주작업정보조회화면으로 이동합니다.',
      },
      cellStyle(grid) {
        const style = { color: '#d50000' };
        const { data } = grid;
        if (data.hStmMamtSbmFlag === 'Y') { style.backgroundColor = '#ff8a80'; }
        return style;
      },
      cellRendererFramework: cProps => {
        const { data, onClick } = cProps;
        const value = <a onClick={() => onClick(cProps)}>{cProps.value}</a>;
        if (data.hStmMamtSbmFlag === 'Y') {
          return (this.popupView(value, {
            className: 'pop-memo',
            header: `수소 엄격관리 대상재`,
          }));
        }
        return value;
      },
      cellRendererParams: {
        onClick: () => {
          const searchLink = {};
          const url = PosM2DUtility.menuItemsLink(this.props.allUserInfo, 'm2ea031020', '주편연주지시조회', searchLink);
          this.setPopout(url);
        },
      },
    },
    {
      colId: 'smDpfDpIndmTp',
      field: 'smDpfDpIndmTp',
      headerName: '탈린',
      width: 30,

    },
    {
      colId: 'steelMixingFlag',
      field: 'steelMixingFlag',
      headerName: '조합',
      width: 30,
      headerComponent: 'HeaderRender',
      headerComponentParams: {
        header: '조합성분조회화면으로 이동합니다.',
      },
      cellRendererFramework: cProps => {
        const { data } = cProps;
        const value = (
          <a onClick = { () => cProps.onClick(cProps)} style ={{ color: data.steelMixingFlag === 'Y' ? '#d50000' : '' }}>
            {cProps.value}
          </a>
        );
        if (cProps.value === 'Y') {
          const content = (
            <table className="ui table center table-row">
              <thead>
                <tr>
                  <th>출강목표</th>
                  <th>2차정련코드</th>
                </tr>
              </thead>
              <tbody>
                {data.smSteelGrdN1 || data.sm2ndRfnCd1 ?
                  <tr>
                    <td>{data.smSteelGrdN1}</td>
                    <td>{data.sm2ndRfnCd1}</td>
                  </tr> : []
                }
                {data.smSteelGrdN2 || data.sm2ndRfnCd2 ?
                  <tr>
                    <td>{data.smSteelGrdN2}</td>
                    <td>{data.sm2ndRfnCd2}</td>
                  </tr> : []
                }
                {data.smSteelGrdN3 || data.sm2ndRfnCd3 ?
                  <tr>
                    <td>{data.smSteelGrdN3}</td>
                    <td>{data.sm2ndRfnCd3}</td>
                  </tr> : []
                }
                {data.smSteelGrdN4 || data.sm2ndRfnCd4 ?
                  <tr>
                    <td>{data.smSteelGrdN4}</td>
                    <td>{data.sm2ndRfnCd4}</td>
                  </tr> : []
                }
                {data.smSteelGrdN5 || data.sm2ndRfnCd5 ?
                  <tr>
                    <td>{data.smSteelGrdN5}</td>
                    <td>{data.sm2ndRfnCd5}</td>
                  </tr> : []
                }
              </tbody>
            </table>
          );
          return (this.popupView(value, {
            className: 'pop-memo',
            content,
          }));
        }
        return value;
      },
      cellRendererParams: {
        onClick: (cProps) => {
          const searchLink = {
            facOpCdN: cProps.data.facOpCdN || '',
            mtlNo: cProps.data.mtlNo || '',
            planChargeNo: cProps.data.planChargeNo || '',
          };
          const url = PosM2DUtility.menuItemsLink(this.props.allUserInfo, 'm2dc010150', '', searchLink);
          this.setPopout(url);
        },

      },
    },
    {
      colId: 'ldEqpNo',
      field: 'ldEqpNo',
      headerName: '로 No',
      width: 40,
      cellStyle(grid) {
        const style = { textAlign: 'center' };
        if (grid.data.ldEqpNoRst === 'R') {
          style.color = '#d50000';
        }
        return style;
      },
    },
    {
      colId: 'tapSatDt',
      field: 'tapSatDt',
      headerName: '출강개시',
      width: 50,
      cellStyle(grid) {
        const style = { textAlign: 'center' };
        if (grid.data.tapSatDtRst === 'R') {
          style.color = '#d50000';
        }
        return style;
      },

    },
    {
      colId: 'bapTrtNo',
      field: 'bapTrtNo',
      headerName: 'BAP No',
      width: 50,

      // headerComponent: 'HeaderRender',
      // headerComponentParams: {
      //   header: '2차정련실적관리(BAP실적)화면으로 이동합니다',
      // },
      cellRendererFramework: cProps => {
        const { data, value } = cProps;
        if (data.bapTrtNoRst === 'R') {
          return <a onClick={() => cProps.onClick(cProps)}>{value}</a>;
        }
        return value || '';
      },
      cellRendererParams: {
        onClick: (cProps) => this.trtNoPopup(cProps, 'BAP'),
      },
    },
    {
      colId: 'lfTrtNo',
      field: 'lfTrtNo',
      headerName: 'LF No',
      width: 50,

      //headerComponent: 'HeaderRender',
      // headerComponentParams: {
      //   header: '2차정련실적관리(LF실적)화면으로 이동합니다',
      // },
      cellRendererFramework: cProps => {
        const { data, value } = cProps;
        if (data.lfTrtNoRst === 'R') {
          return <a onClick={() => cProps.onClick(cProps)}>{value}</a>;
        }
        return value || '';
      },
      cellRendererParams: {
        onClick: (cProps) => this.trtNoPopup(cProps, 'LF'),
      },
    },
    {
      colId: 'rhTrtNo',
      field: 'rhTrtNo',   //ctlActRcvRhTrtNo
      headerName: 'RH No',
      width: 50,

      // headerComponent: 'HeaderRender',
      // headerComponentParams: {
      //   header: '2차정련실적관리(RH실적)화면으로 이동합니다',
      // },
      cellRendererFramework: cProps => {
        const { data, value } = cProps;
        if (data.rhTrtNoRst === 'R') {
          return <a onClick={() => cProps.onClick(cProps)}>{value}</a>;
        }
        return value || '';
      },
      cellRendererParams: {
        onClick: (cProps) => this.trtNoPopup(cProps, 'RH'),
      },
    },
    {
      colId: 'vtdTrtNo',
      field: 'vtdTrtNo',
      headerName: 'VTD No',
      width: 50,

      // headerComponent: 'HeaderRender',
      // headerComponentParams: {
      //   header: '2차정련실적관리(VTD실적)화면으로 이동합니다',
      // },
      cellRendererFramework: cProps => {
        const { data, value } = cProps;
        if (data.vtdTrtNoRst === 'R') {
          return <a onClick={() => cProps.onClick(cProps)}>{value}</a>;
        }
        return value || '';
      },
      cellRendererParams: {
        onClick: (cProps) => this.trtNoPopup(cProps, 'VTD'),
      },
    },
    {
      colId: 'strandSortWthVarF',
      field: 'strandSortWthVarF',
      headerName: '이폭',
      width: 30,

    },
    {
      colId: 'smCcLmcOpPtTp',
      field: 'smCcLmcOpPtTp',
      headerName: '이강종 LMC',
      width: 70,

    },
    {
      colId: 'strandSortCastWth',
      field: 'strandSortCastWth',
      headerName: '주조폭',
      width: 70,

      cellRendererFramework: cProps => {
        const { data, value } = cProps;
        const content = (
          <table className="ui table center table-row">
            <thead>
              <tr>
                <th>주조속도</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data.cvtCastSpdTarg}</td>
              </tr>
            </tbody>
          </table>
        );
        return (this.popupView(value, {
          className: 'pop-memo',
          content,
        }));

      },
    },
    {
      colId: 'castSatDt',
      field: 'castSatDt',
      headerName: '주조개시',
      width: 50,
      cellStyle(grid) {
        const style = { textAlign: 'center'  };
        if (grid.data.castSatDtRst === 'R') {
          style.color = '#d50000';
        }
        return style;
      },
    },
  ];

  popupView(value, option) {
    return (
      <Popup
        trigger={
          <div style={this.popupStyle}>
            <Popup.Content>{value}</Popup.Content>
          </div>
        }
        position="right center"
        hoverable
        {...option}
        // header = {header}
        // content={content}
        // className="pop-memo"
      />
    );
  }

  /*2차정련실적관리 popup url*/
  trtNoPopup(params, factory) {
    const searchLink = {
      factory,
      facOpCdN: params.data.facOpCdN ? params.data.facOpCdN[0] : '',
      mtlNo: params.data.mtlNo || '',
      fieldNum: params.value || '',
      //prcPasNum: '',
    };
    const url = PosM2DUtility.menuItemsLink(this.props.allUserInfo, 'm2db030110', '', searchLink);
    this.setPopout(url);
  }

  setPopout(url) {
    link.loadParent(url.link, url.text);
  }

  render() {
    const {
      rowData,
    } = this.props.m2dc010110Store;
    const { constantsCodes, onGridReady } = this.props;
    return (
      <Fragment>
        <DataGridHeightView
          columnDefs={
            constantsCodes ? this['columnDefs' + constantsCodes.plantFlag] : []
          }
          rowData={rowData}
          onGridReady={onGridReady}
          option={{
            //suppressColumnVirtualisation: true,
            suppressAnimationFrame: true,
            //overlayLoadingTemplate: '데이터를 불러오는 중...',
            //overlayNoRowsTemplate: rowData ? '조회된 데이터가 없습니다.' : '데이터를 불러오는 중...',
            swHover: true, //낮은우선순위 Hover 적용
            suppressMovableColumns: false,
            //enableRangeSelection: true,
            // gridOptions: { copyHeadersToClipboard: true },
            getRowStyle({ data }) {
              const styler = {};
              //생산관제 지시강번 Schedule일때 조건
              if (data.nowFlag === 'Y') { styler.backgroundColor = '#e0f7fa'; }
              return styler;
            },
            frameworkComponents: {
              HeaderRender: HeaderRenderView(),
            },
          }}
        />
      </Fragment>
    );
  }
}

export default TappingMoltenScheduleBodyContainer;

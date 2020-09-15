/*==============================================================================================
* @화면ID(명): m2de010110(제강연주생산계획등록)
* Change history
* @2019-12-27;00000;최수지;최초생성
==============================================================================================*/
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { mesAutobind } from '@mes/mes-shared';
import {
  dialog,
  message,
  Segment,
  ControlLine,
  Button,
} from '@mes/mes-ui-react';

import { DataGridHeightView } from '@/common';
import ExcelUploadContainer from './ExcelUploadContainer';
import CalculationView from '../view/CalculationView';

@inject('m2de010110Store')
@observer
@mesAutobind
class BodyContainer extends Component {

  //전장입량 계산(포:1제강,2제강,3제강), 조강량 계산(포:1연주,2연주,4연주)
  onCompute(prdPlnBeChQt, facCd, operFlag, chk1, chk2, chk3, chk4) {

    if (prdPlnBeChQt === '' ) {
      if (facCd === '1' || facCd === '2' || facCd === '3') {
        //M22JS2247=전장입량을 입력하세요.
        dialog.alert(message('M00999071', ['전장입량']));

      } else {
        dialog.alert(message('M00999071', ['조강량']));
      }

      return false;
    } else if (prdPlnBeChQt >= 400) {
      if (facCd === '1' || facCd === '2' || facCd === '3') {
      //M22JS2248=전장입량은 400톤을 넘을 수 없습니다.
        dialog.alert(message('M22JS2248'));
      } else {
        //dialog.alert('조강량은 400톤을 넘을 수 없습니다.');
        dialog.alert(message('M22JS2161', ['조강량은 400톤을 넘을 수 없습니다.']));

      }
      return false;
    }

    const rowNode =  this.grid.api.getRenderedNodes();
    let chkArr = [];
    let chk = false;

    let sumRow1 = 0;
    let sumRow2 = 0;
    let sumRow3 = 0;
    let sumRow4 = 0;

    let ctKey = 'prdPlnChargeCnt'; //ct
    let prdKey = ''; //

    //1제강
    if (facCd === '1') { ctKey += '1';  prdKey = 'prdPlnBeChQt1';  chkArr = [chk1, chk2, chk3]; }

    //제2강
    if (facCd === '2' ) { ctKey += '2';  prdKey = 'prdPlnBeChQt2'; chkArr = [chk1, chk2, chk3]; }

    //제3강
    if (facCd === '3' ) { ctKey += '7'; prdKey = 'prdPlnBeChQt3'; chkArr = [chk1, chk2, chk3]; }

    //1연주
    if (facCd === '4' ) { ctKey += '5'; prdKey = 'prdPlnCrudeSteQt1'; chkArr = [chk1, chk2, chk3, chk4]; }

    //2연주
    if (facCd === '5' ) { ctKey += '6'; prdKey = 'prdPlnCrudeSteQt2'; chkArr = [chk1, chk2, chk3, chk4]; }

    //3연주, 4연주
    if (facCd === '6' || facCd === '7') { ctKey += '9'; prdKey = 'prdPlnCrudeSteQt3'; chkArr = [chk1, chk2]; }


    for (let i = 0; i < rowNode.length; i++) {

      const datas = rowNode[i].data;
      let sum = 0;

      for (let j = 0; j < chkArr.length; j++) {

        const no = j + 1;
        const ct = datas[ ctKey + no];

        if (ct) {
          if (chkArr[j]) {
            chk = true;
            const amount = ct * prdPlnBeChQt * 1;
            sum += amount;
            if (no === 1) { sumRow1 += amount; }
            if (no === 2) { sumRow2 += amount; }
            if (no === 3) { sumRow3 += amount; }
            if (no === 4) { sumRow4 += amount; }
            rowNode[i].setDataValue(prdKey + no, amount > 0 ? amount : '');
          }
          if (!ct) {
            rowNode[i].setDataValue(prdKey + no, '');
          }
        }
      }

      // 열계
      rowNode[i].setDataValue(prdKey + 0, sum > 0 ? sum : '');

      if (chk) {
        //행 계
        this.grid.api.pinnedRowModel.pinnedBottomRows[0].setDataValue(prdKey + 1, sumRow1 > 0 ? sumRow1 : '');
        this.grid.api.pinnedRowModel.pinnedBottomRows[0].setDataValue(prdKey + 2, sumRow2 > 0 ? sumRow2 : '');
        this.grid.api.pinnedRowModel.pinnedBottomRows[0].setDataValue(prdKey + 3, sumRow3 > 0 ? sumRow3 : '');
        this.grid.api.pinnedRowModel.pinnedBottomRows[0].setDataValue(prdKey + 4, sumRow4 > 0 ? sumRow4 : '');

        //열 총계
        const sumRowAll = sumRow1 + sumRow2 + sumRow3 + sumRow4;
        this.grid.api.pinnedRowModel.pinnedBottomRows[0].setDataValue(prdKey + 0, sumRowAll > 0 ? sumRowAll : '');
      }
    }
    return null;
  }

  //용강량 계산(포:1연주,2연주,4연주)(광:1연주)
  calculate(prdPlnBeChQt2, facCd, operFlag, chk1, chk2, chk3, chk4) {

    if (prdPlnBeChQt2 === '' ) {
      //M22JS2249=용강량을 입력하세요.
      // dialog.alert(message('M22JS2249'));
      dialog.alert(message('M00999071', ['용강량']));

      return false;
    } else if (prdPlnBeChQt2 >= 400) {
      //M22JS2250=용강량은 400톤을 넘을 수 없습니다.
      dialog.alert(message('M22JS2250'));
      return false;
    }

    const rowNode =  this.grid.api.getRenderedNodes();
    let chkArr = [];
    let chk = false;

    let sumRow1 = 0;
    let sumRow2 = 0;
    let sumRow3 = 0;
    let sumRow4 = 0;

    let ctKey = 'prdPlnChargeCnt'; //ch
    let prdKey = ''; //

    //1연주
    if (facCd === '4' ) { ctKey += '5'; prdKey = 'prdPlnImptMSteQt1'; chkArr = [chk1, chk2, chk3, chk4]; }

    //2연주
    if (facCd === '5' ) { ctKey += '6'; prdKey = 'prdPlnImptMSteQt2'; chkArr = [chk1, chk2, chk3, chk4]; }

    //3연주, 4연주
    if (facCd === '6' || facCd === '7') { ctKey += '9'; prdKey = 'prdPlnImptMSteQt3'; chkArr = [chk1, chk2]; }

    for (let i = 0; i < rowNode.length; i++) {
      const datas = rowNode[i].data;
      let sum = 0;

      for (let j = 0; j < chkArr.length; j++) {
        let no = j + 1;
        if (operFlag === 'P' && facCd === '4' && no === 3) { no = 5; }
        const ct = datas[ ctKey + no];

        if (ct && chkArr[j]) {
          chk = true;
          const amount = ct * prdPlnBeChQt2 * 1;
          sum += amount;
          if (no === 1) { sumRow1 += amount; }
          if (no === 2) { sumRow2 += amount; }
          if (no === 3) { sumRow3 += amount; }
          if (no === 4) { sumRow4 += amount; }

          //량
          rowNode[i].setDataValue(prdKey + no, amount > 0 ? amount : '');
        }
      }
      // 열계
      rowNode[i].setDataValue(prdKey + 0, sum > 0 ? sum : '');
    }
    if (chk) {
      //행 계
      this.grid.api.pinnedRowModel.pinnedBottomRows[0].setDataValue(prdKey + 1, sumRow1 > 0 ? sumRow1 : '');
      this.grid.api.pinnedRowModel.pinnedBottomRows[0].setDataValue(prdKey + 2, sumRow2 > 0 ? sumRow2 : '');
      this.grid.api.pinnedRowModel.pinnedBottomRows[0].setDataValue(prdKey + 3, sumRow3 > 0 ? sumRow3 : '');
      this.grid.api.pinnedRowModel.pinnedBottomRows[0].setDataValue(prdKey + 4, sumRow4 > 0 ? sumRow4 : '');

      //열 총계
      const sumRowAll = sumRow1 + sumRow2 + sumRow3 + sumRow4;
      this.grid.api.pinnedRowModel.pinnedBottomRows[0].setDataValue(prdKey + 0, sumRowAll > 0 ? sumRowAll : '');
    }
    return null;
  }

  render() {
    const {
      constantsCodes,
      onGridReady,
      gridRender,
      frameworkComponents,
      onSave,
      onExcelDownload,
    } = this.props;

    const {
      rowData,
      sumRow,
      facCd,
    } = this.props.m2de010110Store;

    return (
      <Segment>
        <ControlLine
          rightItems={[
            <ExcelUploadContainer
              constantsCodes ={constantsCodes}
              onExcelDownload={onExcelDownload}
              gridRender={gridRender}
              frameworkComponents={frameworkComponents}
            />,
          ]}
        />
        <ControlLine
          leftItems={[
            <Button
              content="저장"
              onClick={onSave}
              security={['m2de010110_f002']}
              //style={{ display: this.props.saveBuDisplay }}
            />,
          ]}
          rightItems={[
            <CalculationView
              constantsCodes={constantsCodes}
              facCd={facCd}
              onCompute={this.onCompute}
              calculate={this.calculate}
            />,
          ]}
        />
        <DataGridHeightView
          columnDefs={gridRender(facCd)}
          rowData={rowData}
          onGridReady = {params => {
            this.grid = params;
            onGridReady(params);
          }}
          diff = {15} //오차값 보정
          option={{
            pinnedBottomRowData: sumRow,
            frameworkComponents,
          }}
        />
      </Segment>
    );
  }
}
export default BodyContainer;

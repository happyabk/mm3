/*==============================================================================================
* @화면ID(명): m2de010110(제강연주생산계획등록)
* Change history
* @2019-08-04;00000;최수지;최초생성
==============================================================================================*/
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { mesAutobind } from '@mes/mes-shared';
import { ContentLayout, dialog, message, notification  } from '@mes/mes-ui-react';
import InputStyled from '@/components/DataGrid/inputStyled';
import { SteelConstantsCodes, PosM2DUtility } from '@/common';

import InputEditor from '../view/InputEditor';

import SearchContainer from './SearchContainer';
import ModalContainer from './ModalContainer';
import BodyContainer from './BodyContainer';

@inject('m2de010110Store')
@observer
@mesAutobind
class DailyProductionPlanningContainer extends Component {
  state = {
    constantsCodes: {},
  };


  masterDate= {
    colId: 'masterDate',
    field: 'masterDate',
    headerName: '일자',
    //pinned: 'left',
    suppressSizeToFit: true,
    width: 70,
    cellClass: (params) => this.sumCellClass(params),
  };

  columnDefs = {
    //제1강
    col1: [
      this.masterDate,
      {
        colId: 'col1_1',
        field: 'col1_1',
        headerName: '1전로',
        children: [
          {
            colId: 'prdPlnChargeCnt11',
            field: 'prdPlnChargeCnt11',
            headerName: 'Ch수',
            editable: (e) => this.hadleFocus(e),
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnChargeCnt31',
            field: 'prdPlnChargeCnt31',
            editable: (e) => this.hadleFocus(e),
            singleClickEdit: true,
            headerName: '탈린',
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnBeChQt11',
            field: 'prdPlnBeChQt11',
            editable: (e) => this.hadleFocus(e),
            singleClickEdit: true,
            headerName: '전장',

            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnHmr11',
            field: 'prdPlnHmr11',
            editable: (e) => this.hadleFocus(e),
            singleClickEdit: true,
            headerName: 'HMR',

            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'eqpDormantPlnTm11',
            field: 'eqpDormantPlnTm11',
            editable: (e) => this.hadleFocus(e),
            singleClickEdit: true,
            headerName: '휴지',

            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
        ],
      },
      {
        colId: 'col2',
        field: 'col2',
        headerName: '2전로',
        children: [
          { colId: 'prdPlnChargeCnt12', field: 'prdPlnChargeCnt12', headerName: 'Ch수', editable: (e) => this.hadleFocus(e), singleClickEdit: true,  //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25 },
          { colId: 'prdPlnChargeCnt32', field: 'prdPlnChargeCnt32', headerName: '탈린', editable: (e) => this.hadleFocus(e), singleClickEdit: true,  //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25 },
          { colId: 'prdPlnBeChQt12', field: 'prdPlnBeChQt12', headerName: '전장', editable: (e) => this.hadleFocus(e), singleClickEdit: true,  //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25 },
          { colId: 'prdPlnHmr12', field: 'prdPlnHmr12', headerName: 'HMR', editable: (e) => this.hadleFocus(e), singleClickEdit: true,  //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25 },
          { colId: 'eqpDormantPlnTm12', field: 'eqpDormantPlnTm12', headerName: '휴지', editable: (e) => this.hadleFocus(e), singleClickEdit: true,  //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25 },
        ],
      },
      {
        colId: 'col3',
        field: 'col3',
        headerName: '3전로',
        children: [
          {
            colId: 'prdPlnChargeCnt13',
            field: 'prdPlnChargeCnt13',
            headerName: 'Ch수', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnChargeCnt33',
            field: 'prdPlnChargeCnt33',
            headerName: '탈린', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnBeChQt13',
            field: 'prdPlnBeChQt13',
            headerName: '전장', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnHmr13',
            field: 'prdPlnHmr13',
            headerName: 'HMR', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'eqpDormantPlnTm13',
            field: 'eqpDormantPlnTm13',
            headerName: '휴지', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
        ],
      },
      {
        colId: 'col4',
        field: 'col4',
        headerName: '계',
        children: [
          {
            colId: 'prdPlnChargeCnt10',
            field: 'prdPlnChargeCnt10',
            headerName: 'Ch수',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
          {
            colId: 'prdPlnChargeCnt30',
            field: 'prdPlnChargeCnt30',
            headerName: '탈린',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
          {
            colId: 'prdPlnBeChQt10',
            field: 'prdPlnBeChQt10',
            headerName: '전장',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
          {
            colId: 'prdPlnHmr10',
            field: 'prdPlnHmr10',
            headerName: 'HMR',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
          {
            colId: 'eqpDormantPlnTm10',
            field: 'eqpDormantPlnTm10',
            headerName: '휴지',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
        ],
      },
    ],

    //포항,제2강
    col2P: [
      this.masterDate,
      {
        colId: 'col1',
        field: 'col1',
        headerName: '1전로',
        children: [
          {
            colId: 'prdPlnChargeCnt21',
            field: 'prdPlnChargeCnt21',
            headerName: 'Ch수', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnChargeCnt41',
            field: 'prdPlnChargeCnt41',
            headerName: '탈린', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnBeChQt21',
            field: 'prdPlnBeChQt21',
            headerName: '전장', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnHmr21',
            field: 'prdPlnHmr21',
            headerName: 'HMR', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'eqpDormantPlnTm21',
            field: 'eqpDormantPlnTm21',
            headerName: '휴지', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
        ],
      },
      {
        colId: 'col2',
        field: 'col2',
        headerName: '2전로',
        children: [
          {
            colId: 'prdPlnChargeCnt22',
            field: 'prdPlnChargeCnt22',
            headerName: 'Ch수', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnChargeCnt42',
            field: 'prdPlnChargeCnt42',
            headerName: '탈린', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnBeChQt22',
            field: 'prdPlnBeChQt22',
            headerName: '전장', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnHmr22',
            field: 'prdPlnHmr22',
            headerName: 'HMR', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'eqpDormantPlnTm22',
            field: 'eqpDormantPlnTm22',
            headerName: '휴지', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
        ],
      },
      {
        colId: 'col3',
        field: 'col3',
        headerName: '3전로',
        children: [
          {
            colId: 'prdPlnChargeCnt23',
            field: 'prdPlnChargeCnt23',
            headerName: 'Ch수', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnChargeCnt43',
            field: 'prdPlnChargeCnt43',
            headerName: '탈린', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnBeChQt23',
            field: 'prdPlnBeChQt23',
            headerName: '전장', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnHmr23',
            field: 'prdPlnHmr23',
            headerName: 'HMR', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'eqpDormantPlnTm23',
            field: 'eqpDormantPlnTm23',
            headerName: '휴지', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
        ],
      },
      {
        colId: 'col4',
        field: 'col4',
        headerName: '4전로',
        children: [
          {
            colId: 'prdPlnChargeCnt24',
            field: 'prdPlnChargeCnt24',
            headerName: 'Ch수', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnChargeCnt44',
            field: 'prdPlnChargeCnt44',
            headerName: '탈린', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnBeChQt24',
            field: 'prdPlnBeChQt24',
            headerName: '전장', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnHmr24',
            field: 'prdPlnHmr24',
            headerName: 'HMR', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'eqpDormantPlnTm24',
            field: 'eqpDormantPlnTm24',
            headerName: '휴지', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
        ],
      },
      {
        colId: 'col5',
        field: 'col5',
        headerName: '계',
        children: [
          {
            colId: 'prdPlnChargeCnt20',
            field: 'prdPlnChargeCnt20',
            headerName: 'Ch수',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
          {
            colId: 'prdPlnChargeCnt40',
            field: 'prdPlnChargeCnt40',
            headerName: '탈린',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
          {
            colId: 'prdPlnBeChQt20',
            field: 'prdPlnBeChQt20',
            headerName: '전장',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
          {
            colId: 'prdPlnHmr20',
            field: 'prdPlnHmr20',
            headerName: 'HMR',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
          {
            colId: 'eqpDormantPlnTm20',
            field: 'eqpDormantPlnTm20',
            headerName: '휴지',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
        ],
      },
    ],

    //포항,제3강
    col3P: [
      this.masterDate,
      {
        colId: 'col1',
        field: 'col1',
        headerName: '1전로',
        children: [
          {
            colId: 'prdPlnChargeCnt71',
            field: 'prdPlnChargeCnt71',
            headerName: 'Ch수', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnChargeCnt81',
            field: 'prdPlnChargeCnt81',
            headerName: '탈린', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnBeChQt31',
            field: 'prdPlnBeChQt31',
            headerName: '전장', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnHmr31',
            field: 'prdPlnHmr31',
            headerName: 'HMR', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'eqpDormantPlnTm31',
            field: 'eqpDormantPlnTm31',
            headerName: '휴지', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
        ],
      },
      {
        colId: 'col2',
        field: 'col2',
        headerName: '2전로',
        children: [
          {
            colId: 'prdPlnChargeCnt72',
            field: 'prdPlnChargeCnt72',
            headerName: 'Ch수', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnChargeCnt82',
            field: 'prdPlnChargeCnt82',
            headerName: '탈린', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnBeChQt32',
            field: 'prdPlnBeChQt32',
            headerName: '전장', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnHmr32',
            field: 'prdPlnHmr32',
            headerName: 'HMR', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'eqpDormantPlnTm32',
            field: 'eqpDormantPlnTm32',
            headerName: '휴지', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
        ],
      },
      {
        colId: 'col3',
        field: 'col3',
        headerName: '3전로',
        children: [
          {
            colId: 'prdPlnChargeCnt73',
            field: 'prdPlnChargeCnt73',
            headerName: 'Ch수',
            editable: (e) => this.hadleFocus(e),

            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnChargeCnt83',
            field: 'prdPlnChargeCnt83',
            headerName: '탈린',
            editable: (e) => this.hadleFocus(e),

            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnBeChQt33',
            field: 'prdPlnBeChQt33',
            headerName: '전장',
            editable: (e) => this.hadleFocus(e),

            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnHmr33',
            field: 'prdPlnHmr33',
            headerName: 'HMR',
            editable: (e) => this.hadleFocus(e),

            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'eqpDormantPlnTm33',
            field: 'eqpDormantPlnTm33',
            headerName: '휴지',
            editable: (e) => this.hadleFocus(e),

            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
        ],
      },
      {
        colId: 'col4',
        field: 'col4',
        headerName: '계',
        children: [
          {
            colId: 'prdPlnChargeCnt70',
            field: 'prdPlnChargeCnt70',
            headerName: 'Ch수',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
          {
            colId: 'prdPlnChargeCnt80',
            field: 'prdPlnChargeCnt80',
            headerName: '탈린',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
          {
            colId: 'prdPlnBeChQt30',
            field: 'prdPlnBeChQt30',
            headerName: '전장',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
          {
            colId: 'prdPlnHmr30',
            field: 'prdPlnHmr30',
            headerName: 'HMR',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
          {
            colId: 'eqpDormantPlnTm30',
            field: 'eqpDormantPlnTm30',
            headerName: '휴지',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
        ],
      },
    ],

    //포항,1연주
    col4P: [
      this.masterDate,
      {
        colId: 'col1',
        field: 'col1',
        headerName: 'Slab',
        children: [
          {
            colId: 'prdPlnChargeCnt51',
            field: 'prdPlnChargeCnt51',
            headerName: 'Ch수', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnCrudeSteQt11',
            field: 'prdPlnCrudeSteQt11',
            headerName: '조강량', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnImptMSteQt11',
            field: 'prdPlnImptMSteQt11',
            headerName: '주편톤/Ch', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'eqpDormantPlnTm51',
            field: 'eqpDormantPlnTm51',
            headerName: '휴지', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
        ],
      },
      {
        colId: 'col2',
        field: 'col2',
        headerName: '1Bloom',
        children: [
          {
            colId: 'prdPlnChargeCnt52',
            field: 'prdPlnChargeCnt52',
            headerName: 'Ch수', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnCrudeSteQt12',
            field: 'prdPlnCrudeSteQt12',
            headerName: '조강량', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnImptMSteQt12',
            field: 'prdPlnImptMSteQt12',
            headerName: '주편톤/Ch', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'eqpDormantPlnTm52',
            field: 'eqpDormantPlnTm52',
            headerName: '휴지', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
        ],
      },
      {
        colId: 'col3',
        field: 'col3',
        headerName: '2Bloom',
        children: [
          {
            colId: 'prdPlnChargeCnt55',
            field: 'prdPlnChargeCnt55',
            headerName: 'Ch수', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnCrudeSteQt15',
            field: 'prdPlnCrudeSteQt15',
            headerName: '조강량', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnImptMSteQt15',
            field: 'prdPlnImptMSteQt15',
            headerName: '주편톤/Ch', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'eqpDormantPlnTm55',
            field: 'eqpDormantPlnTm55',
            headerName: '휴지', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
        ],
      },
      {
        colId: 'col4',
        field: 'col4',
        headerName: 'Billet',
        children: [
          {
            colId: 'prdPlnChargeCnt54',
            field: 'prdPlnChargeCnt54',
            headerName: 'Ch수', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnCrudeSteQt14',
            field: 'prdPlnCrudeSteQt14',
            headerName: '조강량', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnImptMSteQt14',
            field: 'prdPlnImptMSteQt14',
            headerName: '주편톤/Ch', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'eqpDormantPlnTm54',
            field: 'eqpDormantPlnTm54',
            headerName: '휴지', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
        ],
      },
      {
        colId: 'col5',
        field: 'col5',
        headerName: '계',
        children: [
          {
            colId: 'prdPlnChargeCnt50',
            field: 'prdPlnChargeCnt50',
            headerName: 'Ch수',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
          {
            colId: 'prdPlnCrudeSteQt10',
            field: 'prdPlnCrudeSteQt10',
            headerName: '조강량',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
          {
            colId: 'prdPlnImptMSteQt10',
            field: 'prdPlnImptMSteQt10',
            headerName: '주편톤/Ch',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
          {
            colId: 'eqpDormantPlnTm50',
            field: 'eqpDormantPlnTm50',
            headerName: '휴지',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
        ],
      },
    ],

    //광양,제2강
    col2K: () => [
      this.columnDefs.col2P[0],
      this.columnDefs.col2P[1],
      this.columnDefs.col2P[2],
      this.columnDefs.col2P[3],
      this.columnDefs.col2P[5],
    ],

    //광양,제3강
    col3K: () => [
      this.columnDefs.col3P[0],
      this.columnDefs.col3P[1],
      this.columnDefs.col3P[2],
      {
        colId: 'col4',
        field: 'col4',
        headerName: '계',
        children: [
          {
            colId: 'prdPlnChargeCnt70',
            field: 'prdPlnChargeCnt70',
            headerName: 'Ch수',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
          {
            colId: 'prdPlnChargeCnt80',
            field: 'prdPlnChargeCnt80',
            headerName: '탈린',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
          // {
          //   colId: 'prdPlnChargeCnt701',
          //   field: 'prdPlnChargeCnt701',
          //   headerName: 'CEM',
          //   width: 25,
          //   cellClass: 'yellow-bg lighten-1',
          // },
          {
            colId: 'prdPlnBeChQt30',
            field: 'prdPlnBeChQt30',
            headerName: '전장',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
          {
            colId: 'prdPlnHmr30',
            field: 'prdPlnHmr30',
            headerName: 'HMR',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
          {
            colId: 'eqpDormantPlnTm30',
            field: 'eqpDormantPlnTm30',
            headerName: '휴지',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
        ],
      },
    ],

    //광항,1연주
    col4K: [
      this.masterDate,
      {
        colId: 'col1',
        field: 'col1',
        headerName: '1M/C',
        children: [
          {
            colId: 'prdPlnChargeCnt51',
            field: 'prdPlnChargeCnt51',
            headerName: 'Ch수', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnCrudeSteQt11',
            field: 'prdPlnCrudeSteQt11',
            headerName: '조강량', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnImptMSteQt11',
            field: 'prdPlnImptMSteQt11',
            headerName: '주편톤/Ch', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'eqpDormantPlnTm51',
            field: 'eqpDormantPlnTm51',
            headerName: '휴지', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
        ],
      },
      {
        colId: 'col2',
        field: 'col2',
        headerName: '2M/C',
        children: [
          {
            colId: 'prdPlnChargeCnt52',
            field: 'prdPlnChargeCnt52',
            headerName: 'Ch수', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnCrudeSteQt12',
            field: 'prdPlnCrudeSteQt12',
            headerName: '조강량', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnImptMSteQt12',
            field: 'prdPlnImptMSteQt12',
            headerName: '주편톤/Ch', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'eqpDormantPlnTm52',
            field: 'eqpDormantPlnTm52',
            headerName: '휴지', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
        ],
      },
      {
        colId: 'col3',
        field: 'col3',
        headerName: '3M/C',
        children: [
          {
            colId: 'prdPlnChargeCnt53',
            field: 'prdPlnChargeCnt53',
            headerName: 'Ch수', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnCrudeSteQt13',
            field: 'prdPlnCrudeSteQt13',
            headerName: '조강량', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnImptMSteQt13',
            field: 'prdPlnImptMSteQt13',
            headerName: '주편톤/Ch', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'eqpDormantPlnTm53',
            field: 'eqpDormantPlnTm53',
            headerName: '휴지', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
        ],
      },
      {
        colId: 'col4',
        field: 'col4',
        headerName: '4M/C',
        children: [
          {
            colId: 'prdPlnChargeCnt54',
            field: 'prdPlnChargeCnt54',
            headerName: 'Ch수', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnCrudeSteQt14',
            field: 'prdPlnCrudeSteQt14',
            headerName: '조강량', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnImptMSteQt14',
            field: 'prdPlnImptMSteQt14',
            headerName: '주편톤/Ch', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'eqpDormantPlnTm54',
            field: 'eqpDormantPlnTm54',
            headerName: '휴지', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
        ],
      },
      {
        colId: 'col5',
        field: 'col5',
        headerName: '계',
        children: [
          {
            colId: 'prdPlnChargeCnt50',
            field: 'prdPlnChargeCnt50',
            headerName: 'Ch수',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
          {
            colId: 'prdPlnCrudeSteQt10',
            field: 'prdPlnCrudeSteQt10',
            headerName: '조강량',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
          {
            colId: 'prdPlnImptMSteQt10',
            field: 'prdPlnImptMSteQt10',
            headerName: '주편톤/Ch',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
          {
            colId: 'eqpDormantPlnTm50',
            field: 'eqpDormantPlnTm50',
            headerName: '휴지',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
        ],
      },
    ],

    //2연주
    col5: [
      this.masterDate,
      {
        colId: 'col1',
        field: 'col1',
        headerName: '1M/C',
        children: [
          {
            colId: 'prdPlnChargeCnt61',
            field: 'prdPlnChargeCnt61',
            headerName: 'Ch수', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnCrudeSteQt21',
            field: 'prdPlnCrudeSteQt21',
            headerName: '조강량', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnImptMSteQt21',
            field: 'prdPlnImptMSteQt21',
            headerName: '주편톤/Ch', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'eqpDormantPlnTm61',
            field: 'eqpDormantPlnTm61',
            headerName: '휴지', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
        ],
      },
      {
        colId: 'col2',
        field: 'col2',
        headerName: '2M/C',
        children: [
          {
            colId: 'prdPlnChargeCnt62',
            field: 'prdPlnChargeCnt62',
            headerName: 'Ch수', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnCrudeSteQt22',
            field: 'prdPlnCrudeSteQt22',
            headerName: '조강량', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnImptMSteQt22',
            field: 'prdPlnImptMSteQt22',
            headerName: '주편톤/Ch', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'eqpDormantPlnTm62',
            field: 'eqpDormantPlnTm62',
            headerName: '휴지', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
        ],
      },
      {
        colId: 'col3',
        field: 'col3',
        headerName: '3M/C',
        children: [
          {
            colId: 'prdPlnChargeCnt63',
            field: 'prdPlnChargeCnt63',
            headerName: 'Ch수', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnCrudeSteQt23',
            field: 'prdPlnCrudeSteQt23',
            headerName: '조강량', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnImptMSteQt23',
            field: 'prdPlnImptMSteQt23',
            headerName: '주편톤/Ch', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'eqpDormantPlnTm63',
            field: 'eqpDormantPlnTm63',
            headerName: '휴지', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
        ],
      },
      {
        colId: 'col4',
        field: 'col4',
        headerName: '4M/C',
        children: [
          {
            colId: 'prdPlnChargeCnt64',
            field: 'prdPlnChargeCnt64',
            headerName: 'Ch수', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnCrudeSteQt24',
            field: 'prdPlnCrudeSteQt24',
            headerName: '조강량', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnImptMSteQt24',
            field: 'prdPlnImptMSteQt24',
            headerName: '주편톤/Ch', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'eqpDormantPlnTm64',
            field: 'eqpDormantPlnTm64',
            headerName: '휴지', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
        ],
      },
      {
        colId: 'col5',
        field: 'col5',
        headerName: '계',
        children: [
          {
            colId: 'prdPlnChargeCnt60',
            field: 'prdPlnChargeCnt60',
            headerName: 'Ch수',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
          {
            colId: 'prdPlnCrudeSteQt20',
            field: 'prdPlnCrudeSteQt20',
            headerName: '조강량',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
          {
            colId: 'prdPlnImptMSteQt20',
            field: 'prdPlnImptMSteQt20',
            headerName: '주편톤/Ch',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
          {
            colId: 'eqpDormantPlnTm60',
            field: 'eqpDormantPlnTm60',
            headerName: '휴지',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
        ],
      },
    ],

    //3연주
    col6: [
      this.masterDate,
      {
        colId: 'col1',
        field: 'col1',
        headerName: '1M/C',
        children: [
          {
            colId: 'prdPlnChargeCnt91',
            field: 'prdPlnChargeCnt91',
            headerName: 'Ch수', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnCrudeSteQt31',
            field: 'prdPlnCrudeSteQt31',
            headerName: '조강량', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnImptMSteQt31',
            field: 'prdPlnImptMSteQt31',
            headerName: '주편톤/Ch', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'eqpDormantPlnTm71',
            field: 'eqpDormantPlnTm71',
            headerName: '휴지', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
        ],
      },
      {
        colId: 'col2',
        field: 'col2',
        headerName: '2M/C',
        children: [
          {
            colId: 'prdPlnChargeCnt92',
            field: 'prdPlnChargeCnt92',
            headerName: 'Ch수', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnCrudeSteQt32',
            field: 'prdPlnCrudeSteQt32',
            headerName: '조강량', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnImptMSteQt32',
            field: 'prdPlnImptMSteQt32',
            headerName: '주편톤/Ch', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'eqpDormantPlnTm72',
            field: 'eqpDormantPlnTm72',
            headerName: '휴지', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
        ],
      },
      {
        colId: 'col3',
        field: 'col3',
        headerName: '계',
        children: [
          {
            colId: 'prdPlnChargeCnt90',
            field: 'prdPlnChargeCnt90',
            headerName: 'Ch수',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
          {
            colId: 'prdPlnCrudeSteQt30',
            field: 'prdPlnCrudeSteQt30',
            headerName: '조강량',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
          {
            colId: 'prdPlnImptMSteQt30',
            field: 'prdPlnImptMSteQt30',
            headerName: '주편톤/Ch',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
          {
            colId: 'eqpDormantPlnTm70',
            field: 'eqpDormantPlnTm70',
            headerName: '휴지',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
        ],
      },
    ],

    //4연주
    col7: [
      this.masterDate,
      {
        colId: 'col1',
        field: 'col1',
        headerName: 'Slab',
        children: [
          {
            colId: 'prdPlnChargeCnt91',
            field: 'prdPlnChargeCnt91',
            headerName: 'Ch수', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnCrudeSteQt31',
            field: 'prdPlnCrudeSteQt31',
            headerName: '조강량', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnImptMSteQt31',
            field: 'prdPlnImptMSteQt31',
            headerName: '주편톤/Ch', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'eqpDormantPlnTm71',
            field: 'eqpDormantPlnTm71',
            headerName: '휴지', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
        ],
      },
      {
        colId: 'col2',
        field: 'col2',
        headerName: 'Bloom',
        children: [
          {
            colId: 'prdPlnChargeCnt92',
            field: 'prdPlnChargeCnt92',
            headerName: 'Ch수', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnCrudeSteQt32',
            field: 'prdPlnCrudeSteQt32',
            headerName: '조강량', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'prdPlnImptMSteQt32',
            field: 'prdPlnImptMSteQt32',
            headerName: '주편톤/Ch', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
          {
            colId: 'eqpDormantPlnTm72',
            field: 'eqpDormantPlnTm72',
            headerName: '휴지', editable: (e) => this.hadleFocus(e), singleClickEdit: true,
            //cellRenderer: 'inputRender',
            cellEditor: 'inputEditor',
            cellClass: (params) => this.sumCellClass(params),
            width: 25,
          },
        ],
      },
      {
        colId: 'col3',
        field: 'col3',
        headerName: '계',
        children: [
          {
            colId: 'prdPlnChargeCnt90',
            field: 'prdPlnChargeCnt90',
            headerName: 'Ch수',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
          {
            colId: 'prdPlnCrudeSteQt30',
            field: 'prdPlnCrudeSteQt30',
            headerName: '조강량',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
          {
            colId: 'prdPlnImptMSteQt30',
            field: 'prdPlnImptMSteQt30',
            headerName: '주편톤/Ch',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
          {
            colId: 'eqpDormantPlnTm70',
            field: 'eqpDormantPlnTm70',
            headerName: '휴지',
            width: 25,
            cellClass: 'yellow-bg lighten-1',
          },
        ],
      },
      {
        colId: 'col4',
        field: 'col4',
        headerName: '이송',
        children: [
          {
            colId: 'plnTrs4',
            field: 'plnTrs4',
            headerName: '4연주',
            width: 25,
          },
          {
            colId: 'plnTrs23',
            field: 'plnTrs23',
            headerName: '2,3연주',
            width: 25,
          },
        ],
      },
    ],
  };


  frameworkComponents = {
    inputEditor: InputEditor({ onChange: this.onChange }),
    inputRender: (props) => {
      if (this.hadleFocus(props)) {
        return <InputStyled value={props.value} />;
      } else {
        return (<div>{props.value || ''}</div>);
      }
    },
  };

  async componentDidMount() {
    const constantsCodes =  await SteelConstantsCodes.constantsCodes();
    const getAllUserInfo = await PosM2DUtility.getAllUserInfo();
    const { setFacCd } = this.props.m2de010110Store;

    if (getAllUserInfo.facOpCdN) {
      this.userInfoFacOpCd = getAllUserInfo.facOpCdN;
      setFacCd(getAllUserInfo.facOpCdN[0]);
    }

    this.setState(
      { constantsCodes },
      () => this.onSearch()
    );
  }

  sumCellClass = (grid) => { if (grid.data.masterDate === '계') { return 'yellow-bg lighten-1'; } return ''; };

  hadleFocus = (e) => {
    if (e.data.masterDate === '계') {
      return false;
    }
    return true;
  };


  gridRender = (facCd) => {
    const plantFlag = this.state.constantsCodes.plantFlag;
    const { columnDefs } = this;

    if (plantFlag) {
      let namekey = facCd + plantFlag;
      if (facCd === '1' || facCd === '5' || facCd === '6' || facCd === '7') {
        namekey = facCd;
      }
      namekey = 'col' + namekey;

      if (namekey === 'col2K' || namekey === 'col3K') {
        return columnDefs[namekey]();
      } else {
        return columnDefs[namekey];
      }
    } else {
      return [];
    }
  };

  onChange(value, props) {

    const {
      rowData,
    } = this.props.m2de010110Store;
    const rowNode =  props.api.getRenderedNodes()[props.rowIndex];
    const pinnedBottomRows = this.grid.api.pinnedRowModel.pinnedBottomRows[0];
    const colId = props.colDef.field;
    const id = colId.substr(0, colId.length - 1) + '';
    const data = props.data;

    let sum = value * 1 || 0;
    let sum2 = value * 1 || 0;
    let sum3 = 0;


    //제강공장 HMR 평균
    if (colId.includes('prdPlnHmr')) {
      const average = this.grid.columnApi.columnController.columnDefs.length - 2;
      let average2 = 1;
      if (value === '') { average2 = 0; }

      rowData.map((row, i) => {
        if (i !== props.rowIndex && row[colId]) {
          average2 += 1;
          sum2 += row[colId] * 1;
        }
      });

      sum2 /= average2;
      pinnedBottomRows.setDataValue(colId,  sum2.toFixed(1) * 1 || ''); //행 계

      for (let i = 1; i <= average; i++) {
        if (colId !== id + i) {
          sum += data[id + i] * 1 || 0;
        }

        if (pinnedBottomRows.data[id + i]) {
          sum3 += pinnedBottomRows.data[id + i] * 1;
        }
      }
      sum /= average;
      console.log(average);
      rowNode.setDataValue(id + 0, sum.toFixed(1) * 1 || ''); //열 계
      sum3 /= average;
      pinnedBottomRows.setDataValue(id + 0, sum3.toFixed(1) * 1 || ''); //열 총계


    //햡계
    } else {

      //열 계
      if (props.data[id + 1] && (colId !== id + '1')) { sum += props.data[id + 1] * 1; }
      if (props.data[id + 2] && (colId !== id + '2')) { sum += props.data[id + 2] * 1; }
      if (props.data[id + 3] && (colId !== id + '3')) { sum += props.data[id + 3] * 1; }
      if (props.data[id + 4] && (colId !== id + '4')) { sum += props.data[id + 4] * 1; }
      rowNode.setDataValue(id + 0, sum || '');

      //행 계
      for (let i = 0; i < rowData.length; i++) {
        if ((i !== props.rowIndex ) && rowData[i][colId]) {
          sum2 += rowData[i][colId] * 1;
        }
      }
      pinnedBottomRows.setDataValue(colId, sum2 || '');

      //열 총계
      if (pinnedBottomRows.data[id + 1]) { sum3 += pinnedBottomRows.data[id + 1] * 1; }
      if (pinnedBottomRows.data[id + 2]) { sum3 += pinnedBottomRows.data[id + 2] * 1; }
      if (pinnedBottomRows.data[id + 3]) { sum3 += pinnedBottomRows.data[id + 3] * 1; }
      if (pinnedBottomRows.data[id + 4]) { sum3 += pinnedBottomRows.data[id + 4] * 1; }
      pinnedBottomRows.setDataValue(id + 0, sum3 || '');
    }



  }

  onSearch(onMessage) {
    const { onSearch, facCd, mpPlanDate } = this.props.m2de010110Store;
    const operFlag = this.state.constantsCodes.operFlag;
    onSearch(
      {
        operFlag,
        facCd,
        mpPlanDate,
      }
    )
      .then(() => {
        if (!onMessage) {
          if (this.userInfoFacOpCd) {
            this.setState({
              saveBuDisplay: PosM2DUtility.saveBuDisplay(this.userInfoFacOpCd, facCd + 'L1'),
            });
          }
          notification(message('M2LNT0012'));  // 조회가 완료되었습니다.

        }

      });
  }

  async onSave() {
    const { onSave, rowData } = this.props.m2de010110Store;
    const operFlag = this.state.constantsCodes.operFlag;
    if (await dialog.confirm(message('M22JS1209'))) {
      onSave({
        operFlag,
        rowData,
      })
        .then(() => {
          this.onSearch(true);
          notification(message('M00999105'));
        });
    }
  }

  //엑셀 다운로드
  onExcelDownload() {
    this.grid.api.exportDataAsExcel({
      columnGroups: true, //다중헤더
      fileName: '제강연주생산계획',
      sheetName: '제강연주생산계획',
    });
  }

  render() {
    const { constantsCodes } = this.state;

    return (
      <ContentLayout>
        <ContentLayout.Header title = "제강연주생산계획등록" />
        <SearchContainer
          constantsCodes ={constantsCodes}
          onSearch={this.onSearch}
        />
        <ModalContainer
          constantsCodes ={constantsCodes}
          onSearch={this.onSearch}
        />

        {/* <ExcelUploadContainer
          constantsCodes ={constantsCodes}
          onSave={this.onSave}
          onExcelDownload={this.onExcelDownload}
          gridRender={this.gridRender}
          frameworkComponents={this.frameworkComponents}
        /> */}

        <BodyContainer
          saveBuDisplay={this.state.saveBuDisplay}
          constantsCodes ={constantsCodes}
          onGridReady = {params => this.grid = params}
          gridRender={this.gridRender}
          frameworkComponents={this.frameworkComponents}

          onSave={this.onSave}
          onExcelDownload={this.onExcelDownload}
        />
      </ContentLayout>
    );
  }
}
export default DailyProductionPlanningContainer;

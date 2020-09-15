/*==============================================================================================
* @화면ID(명): m2de010110(제강연주생산계획등록)
* Change history
* @2020-04-21;00000;최수지;최초생성
==============================================================================================*/
import React, { Component, createRef } from 'react';
import { inject, observer } from 'mobx-react';
import { mesAutobind } from '@mes/mes-shared';
import { DataGrid, dialog, message } from '@mes/mes-ui-react';

import ButtonView from '../view/ButtonView';

@inject('m2de010110Store')
@observer
@mesAutobind
class ExcelUploadContainer extends Component {

  dataGrid1 = createRef();
  dataGrid2 = createRef();
  dataGrid3 = createRef();
  dataGrid4 = createRef();
  dataGrid5 = createRef();
  dataGrid6 = createRef();
  dataGrid7 = createRef();

  //다중 그리드 엑셀 다운로드
  onBtnExportMultiGrid() {
    // const { dataGrid1, dataGrid2, dataGrid3, dataGrid4, dataGrid5, dataGrid6, dataGrid7 } = this.props.m2de010110Store;
    const { dataGrid1, dataGrid2, dataGrid3, dataGrid4, dataGrid5, dataGrid6, dataGrid7 } = this;
    const operFlag = this.props.constantsCodes.operFlag;

    const grids = operFlag === '3' ?
      [
        { dataGrid: dataGrid1, sheetName: '1제강' },
        { dataGrid: dataGrid2, sheetName: '2제강' },
        { dataGrid: dataGrid3, sheetName: '후판제강' },
        { dataGrid: dataGrid4, sheetName: '1연주' },
        { dataGrid: dataGrid5, sheetName: '2연주' },
        { dataGrid: dataGrid6, sheetName: '후판연주' },
      ]
      :
      [
        { dataGrid: dataGrid1, sheetName: '1제강' },
        { dataGrid: dataGrid2, sheetName: '2제강' },
        { dataGrid: dataGrid3, sheetName: '3제강' },
        { dataGrid: dataGrid4, sheetName: '1연주' },
        { dataGrid: dataGrid5, sheetName: '2연주' },
        { dataGrid: dataGrid7, sheetName: '4연주' },
      ];

    const params = {
      fileName: '전공장_제강연주생산계획',
      columnGroups: true,
    };

    DataGrid.exportDataAsExcel(grids, params);
  }

  //엑셀 업로드
  async onExcelUpload() {
    const { mpPlanDate, setModel } = this.props.m2de010110Store;
    const yyyy = mpPlanDate.substring(0, 4);
    const mm = mpPlanDate.substring(5, 7);
    if (await dialog.confirm(
      //yyyy + '년 ' + mm + '월 데이터를 Excel Import하려합니다. \n계속하시겠습니까?'
      message('M22JS2251', [yyyy, mm])
    )) {
      setModel({ open: true });
      // this.setState({ default: true });
    }
  }

  render() {
    const {
      //constantsCodes,
      onExcelDownload,
      // onExcelUpload,
      gridRender,
      frameworkComponents,
    } = this.props;

    const {
      rowData,
      sumRow,
    } = this.props.m2de010110Store;
    return (
      <React.Fragment>
        <ButtonView
          onExcelDownload={onExcelDownload}
          onBtnExportMultiGrid = {this.onBtnExportMultiGrid}
          onExcelUpload={this.onExcelUpload}
        />
        <div
          style={{ display: 'none' }}
        >
          <DataGrid
            columnDefs={gridRender('1')}
            rowData={rowData}
            pinnedBottomRowData = {sumRow}
            //ref={(dataGrid1) => setDataGrid1(dataGrid1)}
            ref={(dataGrid) => this.dataGrid1 = dataGrid}
            autoSizeMenual
            frameworkComponents={frameworkComponents}
          />
          <DataGrid
            columnDefs={gridRender('2')}
            rowData={rowData}
            pinnedBottomRowData = {sumRow}
            //ref={(dataGrid2) => setDataGrid2(dataGrid2)}
            ref={(dataGrid) => this.dataGrid2 = dataGrid}

            autoSizeMenual
            frameworkComponents={frameworkComponents}
          />
          <DataGrid
            columnDefs={gridRender('3')}
            rowData={rowData}
            pinnedBottomRowData = {sumRow}
            // ref={(dataGrid3) => setDataGrid3(dataGrid3)}
            ref={(dataGrid) => this.dataGrid3 = dataGrid}

            autoSizeMenual
            frameworkComponents={frameworkComponents}
          />
          <DataGrid
            columnDefs={gridRender('4')}
            rowData={rowData}
            pinnedBottomRowData = {sumRow}
            //ref={(dataGrid4) => setDataGrid4(dataGrid4)}
            ref={(dataGrid) => this.dataGrid4 = dataGrid}
            autoSizeMenual
            frameworkComponents={frameworkComponents}
          />
          <DataGrid
            columnDefs={gridRender('5')}
            rowData={rowData}
            pinnedBottomRowData = {sumRow}
            //ref={(dataGrid5) => setDataGrid5(dataGrid5)}
            ref={(dataGrid) => this.dataGrid5 = dataGrid}

            autoSizeMenual
            frameworkComponents={frameworkComponents}
          />
          <DataGrid
            columnDefs={gridRender('6')}
            rowData={rowData}
            pinnedBottomRowData = {sumRow}
            // ref={(dataGrid6) => setDataGrid6(dataGrid6)}
            ref={(dataGrid) => this.dataGrid6 = dataGrid}

            autoSizeMenual
            frameworkComponents={frameworkComponents}
          />
          <DataGrid
            columnDefs={gridRender('7')}
            rowData={rowData}
            pinnedBottomRowData = {sumRow}
            //ref={(dataGrid7) => setDataGrid7(dataGrid7)}
            ref={(dataGrid) => this.dataGrid7 = dataGrid}

            autoSizeMenual
            frameworkComponents={frameworkComponents}
          />
        </div>
      </React.Fragment>

    );
  }
}
export default ExcelUploadContainer;

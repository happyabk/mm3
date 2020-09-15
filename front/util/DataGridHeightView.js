/*==============================================================================================
* @FileName : 공통 DataGrid Height View
* Change history
* @수정 날짜;SCR_NO;수정자;수정내용
* @2020-03-01;00000;최수지;최초생성
==============================================================================================*/

import React, { Component, Fragment } from 'react';
import { mesAutobind } from '@mes/mes-shared';
import { DataGrid } from '@mes/mes-ui-react';

@mesAutobind
class DataGridHeightView extends Component {
  state = { gridHeight: -1 };

  componentDidMount() {
    this.onUpdateGridHeight();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.rowData !== this.props.rowData) {
      this.onUpdateGridHeight();
    }
  }

  onGridReady() {
    this.onUpdateGridHeight();
  }

  onUpdateGridHeight() {
    if ( this.dataGrid ) {
      const diffPadding = 16; // 그리드에 적용된 margin 또는 padding 값에 따른 오차값 보정
      const wh = window.innerHeight;
      const gh = this.getTopPosition(this.dataGrid.gridRef);
      const resultHeight = wh - gh - diffPadding;
      // 데이터그리드의 height update
      this.setState({
        gridHeight: resultHeight,
      });
    }
  }

  getTopPosition(el) {
    let yPos = 0;
    while (el) {
      if (el.tagName === 'BODY') {
        yPos += (el.offsetTop + el.clientTop);
      } else {
        yPos += (el.offsetTop + el.clientTop);
      }
      el = el.offsetParent;
    }
    return yPos;
  }

  render() {
    const {
      onGridReady,
      columnDefs,
      rowData,
      option,
      minHeight,
    } = this.props;

    return (
      <Fragment>
        <DataGrid
          minHeight={(rowData && rowData.length > 0) && !minHeight ? -1 : this.state.gridHeight  }
          maxHeight={this.state.gridHeight}
         // height={this.state.gridHeight}

          ref={node => this.dataGrid = node}
          onGridReady={gridApi => {
            this.onGridReady();
            if (onGridReady) { onGridReady(gridApi); }
          }}
          columnDefs={columnDefs}
          rowData={rowData}
          {...option}
        />
      </Fragment>

    );
  }
}
export default DataGridHeightView;

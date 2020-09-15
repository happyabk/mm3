import React, { Component } from 'react';
import { Button } from '@mes/mes-ui-react';
import { mesAutobind } from '@mes/mes-shared';

@mesAutobind
class ButtonView extends Component {

  render() {
    //
    const {
      onExcelDownload,
      onExcelUpload,
      onBtnExportMultiGrid,
    } = this.props;

    return (
      <React.Fragment>

        <Button content="엑셀 다운로드" onClick={onExcelDownload} />
        <Button content="전체공장 엑셀 다운로드" onClick={onBtnExportMultiGrid} />
        <Button content="엑셀 업로드" onClick={onExcelUpload} security={['m2de010110_f002']} />

      </React.Fragment>
    );
  }
}

export default ButtonView;

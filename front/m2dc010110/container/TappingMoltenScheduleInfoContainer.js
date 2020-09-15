/*==============================================================================================
* @화면ID(명): m2dc010110(출강Schedule조회)
* Change history
* @2019-08-29;00000;최수지;최초생성
==============================================================================================*/
import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { mesAutobind } from '@mes/mes-shared';
import { ControlLine, Button } from '@mes/mes-ui-react';


@inject('m2dc010110Store')
@observer
@mesAutobind
class TappingMoltenScheduleInfoContainer extends Component {
  render() {
    const { onExport } = this.props;
    const {
      time,
    } = this.props.m2dc010110Store;
    return (
      <Fragment>
        <ControlLine
          leftItems={[<p>최종지시편성일시: {time}</p>]}
          rightItems={[<Button onClick={onExport}>엑셀 다운로드</Button>]}
        />
      </Fragment>
    );
  }
}

export default TappingMoltenScheduleInfoContainer;

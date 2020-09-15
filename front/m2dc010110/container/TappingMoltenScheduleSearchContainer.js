/*==============================================================================================
* @화면ID(명): m2dc010110(출강Schedule조회)
* Change history
* @2019-11-01;00000;최수지;최초생성
==============================================================================================*/
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { mesAutobind } from '@mes/mes-shared';

import TappingMoltenScheduleSearchView from '../view/TappingMoltenScheduleSearchView';
import { MaterialNoFindContainer } from '../../m2db010010';

@inject(
  'm2dc010110Store',
  'm2dc010110publicCodeStore',
  'materialNoFindStore',
)
@observer
@mesAutobind
class TappingMoltenScheduleSearchContainer extends Component {

  //강번
  setMtlNo(e, v) {
    const {
      setMtlNo,
      facOpCdN,
      lovFacOpCdN,
    } = this.props.m2dc010110publicCodeStore;
    if (!isNaN(v.value.substr(2))) {
      if (facOpCdN === lovFacOpCdN[0].value) { setMtlNo(this.props.mtlNoCode[0] + v.value.substr(2, 5)); }
      if (facOpCdN === lovFacOpCdN[1].value) { setMtlNo(this.props.mtlNoCode[1] + v.value.substr(2, 5)); }
      if (facOpCdN === lovFacOpCdN[2].value) { setMtlNo(this.props.mtlNoCode[2] + v.value.substr(2, 5)); }
    }
  }

  //공장
  setFacOpCdN(e, v) {
    const { setFacOpCdN, setMtlNo, lovFacOpCdN } = this.props.m2dc010110publicCodeStore;
    if (v.value === lovFacOpCdN[0].value) { setMtlNo(this.props.mtlNoCode[0]); }
    if (v.value === lovFacOpCdN[1].value) { setMtlNo(this.props.mtlNoCode[1]); }
    if (v.value === lovFacOpCdN[2].value) { setMtlNo(this.props.mtlNoCode[2]); }
    setFacOpCdN(v.value);
  }

  render() {
    const {
      lovFacOpCdN,
      facOpCdN,
      setFacOpCdN,

      lovMcNo,
      mcNo,
      setMcNo,

      lovLdNo,
      ldNo,
      setLdNo,

      mtlNo,
      setMtlNo,
    } = this.props.m2dc010110publicCodeStore;

    const {
      open,
      setOpen,
      setSearch,
      findTable,
    } = this.props.materialNoFindStore;

    return (
      <React.Fragment>
        <TappingMoltenScheduleSearchView
          onSearch={() => this.props.onSearch(true)}
          lovFacOpCdN={lovFacOpCdN}
          facOpCdN={facOpCdN}
          setFacOpCdN={(e, v) => {
            this.setFacOpCdN(e, v);
            this.props.onSearch();
          }}

          lovMcNo={lovMcNo}
          mcNo={mcNo}
          setMcNo={(e, v) => {
            setMcNo(v.value);
            this.props.onSearch();

          }}

          lovLdNo={lovLdNo}
          ldNo={ldNo}
          setLdNo={(e, v) => {
            setLdNo(v.value);
            this.props.onSearch();
          }}

          mtlNo={mtlNo}
          setMtlNo={this.setMtlNo}
          onMtlNoSearch={() => {
            setSearch(mtlNo);
            setOpen(true);
            findTable(mtlNo);
          }}
        />
        <MaterialNoFindContainer
          open={open}
          onClickLink={(e, data) => {
            setMtlNo(data.mtlNo);
            setOpen(false);
            if (data.mtlNo.substr(0, 2) === this.props.mtlNoCode[0]) { setFacOpCdN(lovFacOpCdN[0].value); }
            if (data.mtlNo.substr(0, 2) === this.props.mtlNoCode[1]) { setFacOpCdN(lovFacOpCdN[1].value); }
            if (data.mtlNo.substr(0, 2) === this.props.mtlNoCode[2]) { setFacOpCdN(lovFacOpCdN[2].value); }
          }}
          onClose={() => { setOpen(false); }}
        />
      </React.Fragment>
    );
  }
}
export default TappingMoltenScheduleSearchContainer;

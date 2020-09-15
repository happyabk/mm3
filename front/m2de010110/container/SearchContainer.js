/*==============================================================================================
* @화면ID(명): m2de010110(제강연주생산계획등록)
* Change history
* @2019-12-02;00000;최수지;최초생성
==============================================================================================*/
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { mesAutobind } from '@mes/mes-shared';

import SearchView from '../view/SearchView';

@inject('m2de010110Store')
@observer
@mesAutobind
class SearchContainer extends Component {
  state = {
    facCdLov: [],
  };

  componentDidUpdate(prevProps) {
    if (this.props.constantsCodes !== prevProps.constantsCodes) {
      this.setFacCdLov();
    }
  }

  setFacCdLov() {

    const { plantFlag } = this.props.constantsCodes;
    const facCdLov = [];
    facCdLov.push({ text: '1제강', value: '1' });
    facCdLov.push({ text: '2제강', value: '2' });
    facCdLov.push({ text: '3제강', value: '3' });
    facCdLov.push({ text: '1연주', value: '4' });
    facCdLov.push({ text: '2연주', value: '5' });
    facCdLov.push({ text: plantFlag === 'K' ? '3연주' : '4연주', value: plantFlag === 'K' ? '6' : '7' });
    this.setState({ facCdLov });
  }

  render() {
    const { onSearch } = this.props;
    const {
      facCd,
      setFacCd,
      mpPlanDate,
      setMpPlanDate,
    } = this.props.m2de010110Store;

    return (
      <SearchView
        onSearch = {onSearch}

        facCdLov = {this.state.facCdLov}
        facCd = {facCd}
        setFacCd={setFacCd}

        mpPlanDate={mpPlanDate}
        setMpPlanDate={setMpPlanDate}
      />
    );
  }
}
export default SearchContainer;

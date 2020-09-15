/*==============================================================================================
* @화면ID(명): m2dc010110(출강Schedule조회)
* Change history
* @2019-08-29;00000;최수지;최초생성
==============================================================================================*/
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { mesAutobind } from '@mes/mes-shared';
import { ContentLayout, Segment, auth, notification, message } from '@mes/mes-ui-react';
import qs from 'qs';

import { SteelConstantsCodes } from '@/common';

import ContentLayoutHeaderContainer from './ContentLayoutHeaderContainer';
import TappingMoltenScheduleSearchContainer from './TappingMoltenScheduleSearchContainer';
import TappingMoltenScheduleInfoContainer from './TappingMoltenScheduleInfoContainer';
import TappingMoltenScheduleBodyContainer from './TappingMoltenScheduleBodyContainer';

@inject(
  'm2dc010110Store',
  'm2dc010110publicCodeStore',
)
@observer
@mesAutobind
class TappingMoltenScheduleContainer extends Component {

  state = {
    constantsCodes: null,  //시소구분
    mtlNoCode: [],  //강번코드
    allUserInfo: {},
  };

  async componentDidMount() {
    this.constantsCodes = await SteelConstantsCodes.constantsCodes();
    this.setState({
      constantsCodes: this.constantsCodes,
      mtlNoCode: this.constantsCodes.mtlNoCode,
    });
    auth.getAllUserInfo()
      .then((allUserInfo) => {
        this.setState({ allUserInfo });
      });

    const { onFacOpCdN, onMcNo, onLdNo, setMtlNo, setMcNo, setLdNo } = this.props.m2dc010110publicCodeStore;
    onFacOpCdN() //공장
      .then(() => onMcNo({ key: '0', text: '전체', value: '0' }))//McNo
      .then(() => onLdNo({ key: '0', text: '전체', value: '0' }))//로
      .then(() => {
        const search =  qs.parse(this.props.location.search);
        const { mcNo, ldNo, mtlNo } = search;
        const facOpCdN = search.facOpCdN || search['?facOpCdN'];
        if (facOpCdN) {
          const { lovFacOpCdN, setFacOpCdN } = this.props.m2dc010110publicCodeStore;
          setFacOpCdN( lovFacOpCdN[facOpCdN[0] - 1].value);
        }
        if (mcNo) { setMcNo(mcNo); }
        if (ldNo) { setLdNo(ldNo); }
        if (mtlNo) {
          setMtlNo(mtlNo);
        } else {
          const getFacOpCdN = this.props.m2dc010110publicCodeStore.facOpCdN;
          setMtlNo(this.state.mtlNoCode[getFacOpCdN[0] - 1]);
        }
        this.onSearch(true);
      });
  }

  getUrl = () => {
    const { facOpCdN, mcNo, ldNo, mtlNo } = this.props.m2dc010110publicCodeStore;
    return {
      worksCode: this.constantsCodes.worksCode,
      operFlag: this.constantsCodes.operFlag,
      facOpCdN,
      mcNo,
      ldNo,
      mtlNo,
    };
  };

  //조회
  onSearch(reset) {
    const { onSearch } = this.props.m2dc010110Store;
    const keys = this.getUrl();
    onSearch(keys)
      .then((success) => {
        if (success) {
          if (reset) {
            if (this.setInterval) {
              clearInterval(this.setInterval);
              this.setInterval = null;
            }
            this.setInterval = setInterval(() => this.autoRefresh(), 30000);
            notification(message('M2LNT0012'));
          }

        } else {
          clearInterval(this.setInterval);
          this.setInterval = null;
        }
      });
  }

  autoRefresh() {
    const { onAutoRefreshSearch } = this.props.m2dc010110Store;
    const keys = this.getUrl();
    onAutoRefreshSearch(keys);
  }

  //엑셀다운로드
  onExport() {
    const exportExcelParams = {
      allColumns: true,
      fileName: '출강Schedule조회',
      sheetName: '출강Schedule조회',
    };
    this.gridApi.api.exportDataAsExcel(exportExcelParams);
  }


  render() {
    return (
      <ContentLayout>
        <ContentLayoutHeaderContainer
          title="출강Schedule조회"
          allUserInfo={this.state.allUserInfo}
        />
        <TappingMoltenScheduleSearchContainer
          onSearch={this.onSearch}
          // autoRefresh={this.autoRefresh}
          mtlNoCode={this.state.mtlNoCode}
        />

        <Segment>
          <TappingMoltenScheduleInfoContainer
            onExport={this.onExport}
          />
          <TappingMoltenScheduleBodyContainer
            constantsCodes={this.state.constantsCodes}
            onGridReady={gridApi => this.gridApi = gridApi}
            allUserInfo={this.state.allUserInfo}
          />
        </Segment>
      </ContentLayout>
    );
  }
}

export default TappingMoltenScheduleContainer;

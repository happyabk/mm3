

import React, { Component } from 'react';
import { mesAutobind } from '@mes/mes-shared';
import { inject, observer } from 'mobx-react';

import { ContentLayout, auth, Segment } from '@mes/mes-ui-react';
//page
import moment from 'moment';
import SteelScheduleMonitoringSearchView from '../view/SteelScheduleMonitoringSearchView';
import SteelScheduleMonitoringTableView from '../view/SteelScheduleMonitoringTableView';

@inject('steelScheduleMonitoringStore')
@observer
@mesAutobind
class SteelScheduleMonitoringContainer extends Component {

  async componentDidMount() {

    await auth.getUserInfo()
      .then((userInfo) => {
        this.props.steelScheduleMonitoringStore.setWorksCode(userInfo.plantFlag);
        this.props.steelScheduleMonitoringStore.setUserInfo(userInfo);
        if (userInfo.plantFlag === 'P') {
          this.props.steelScheduleMonitoringStore.setOperFlag('C');
        } else if (userInfo.plantFlag === 'K') {
          this.props.steelScheduleMonitoringStore.setOperFlag('3');
        }
      });

    this.onSearch();
  }

  onSearch() {
    const { steelScheduleMonitoringStore } = this.props;
    const operFlag = steelScheduleMonitoringStore.operFlag;
    const date = moment(steelScheduleMonitoringStore.date).format('YYYY-MM-DD HH:mm:ss');
    // steelScheduleMonitoringStore.setDate();

    steelScheduleMonitoringStore.findData(operFlag, date);
    console.log('조회');
  }

  setDate(e) {
    this.props.steelScheduleMonitoringStore.setDate(e);
  }

  render() {

    const { steelScheduleMonitoringStore } = this.props;

    return (
      <ContentLayout>
        <ContentLayout.Header title = "제강연주Schedule모니터링" />
        <SteelScheduleMonitoringSearchView
          onSearch={this.onSearch}
          date={steelScheduleMonitoringStore.date}
          setDate={this.setDate}
        />
        <Segment>
        <SteelScheduleMonitoringTableView
          datas={steelScheduleMonitoringStore.datas}
          operFlag={steelScheduleMonitoringStore.operFlag}
          date={steelScheduleMonitoringStore.date}
        />
        </Segment>
      </ContentLayout>
    );
  }
}

export default SteelScheduleMonitoringContainer;

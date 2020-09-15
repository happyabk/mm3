/*================================================================================
 * @화면ID(명): m2dd010100(제강조업종합현황)
 * Change history
 * @수정 날짜;SCR_NO;수정자;수정내용
 *
 * @2019-08-02;00000;최지수;최초생성
==================================================================================*/

import React, { Component } from 'react';
import { mesAutobind, context } from '@mes/mes-shared';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import qs from 'qs';
import { ContentLayout, Portlet, auth, link } from '@mes/mes-ui-react';
// page
import MonitoringSearchView from '../view/MonitoringSearchView';
// 포항
import PmonitoringChartView from '../view/P/PmonitoringChartView';
import PmonitoringChart1View from '../view/P/PmonitoringChart1View';
import PmonitoringChart2View from '../view/P/PmonitoringChart2View';
import PmonitoringChart3View from '../view/P/PmonitoringChart3View';
// 광양
import KmonitoringChartView from '../view/K/KmonitoringChartView';
import KmonitoringChart1View from '../view/K/KmonitoringChart1View';
import KmonitoringChart2View from '../view/K/KmonitoringChart2View';
import KmonitoringChart3View from '../view/K/KmonitoringChart3View';

@inject('monitoringStore')
@inject('steelCastMonitoringStore')
@observer
@mesAutobind
class MonitoringContainer extends Component {

  state = {
    chk1: true,
    timer: null,
  };

  async componentDidMount() {

    await auth.getUserInfo()
        .then((userInfo) => {
          this.props.monitoringStore.setWorksCode(userInfo.plantFlag);
          this.props.monitoringStore.setUserInfo(userInfo);
          if(userInfo.plantFlag === 'P') {
            const data = [
              { id: 'p1', type: 'type1.5', height: 34, component: PmonitoringChartView},
              { id: 'p2', type: 'type3', height: 34, component: PmonitoringChart1View},
              { id: 'p3', type: 'type2', height: 25, component: PmonitoringChart2View},
              { id: 'p4', type: 'type2', height: 25, component: PmonitoringChart3View},
            ];
            this.props.monitoringStore.setOperFlag('C');
            this.props.monitoringStore.setAddData(data);
            this.props.monitoringStore.setPortletData(data);
          } else if(userInfo.plantFlag === 'K') {
            const data = [
              { id: 'p1', type: 'type1.5', height: 34, component: KmonitoringChartView},
              { id: 'p2', type: 'type3', height: 34, component: KmonitoringChart1View},
              { id: 'p3', type: 'type2', height: 25, component: KmonitoringChart2View},
              { id: 'p4', type: 'type2', height: 25, component: KmonitoringChart3View},
            ];
            this.props.monitoringStore.setOperFlag('3');
            this.props.monitoringStore.setAddData(data);
            this.props.monitoringStore.setPortletData(data);
          }
        });

        const query = qs.parse((window.location.search).substring((window.location.search).indexOf('?') +1));
        const date = 'date';
        if(query.date2 !== undefined) {
          this.setDate([query[date], query.date2]);
        }
        if(query.NS_FKEY !== undefined) {
          this.props.monitoringStore.setNsFkey((query.NS_FKEY).substring(10, 15));
        }

    this.onSearch();
    this.autoRefreshControl(true);
  }

  // 조회
  onSearch(e, fromDay, toDay) {
    console.log('조회');
    let timer=this.state.timer;
    this.setState({
      timer: clearTimeout(timer),
    });
    const result = {
      operFlag: this.props.monitoringStore.operFlag,
      fromDay: fromDay !== undefined && typeof fromDay !== 'object' ? fromDay : moment(this.props.monitoringStore.date[0]).format('YYYYMMDD'),
      toDay: toDay !== undefined ? toDay : moment(this.props.monitoringStore.date[1]).format('YYYYMMDD'),
    };

    this.props.monitoringStore.findIronChart(result);
    this.props.monitoringStore.findSteelData(result);
    this.props.monitoringStore.findCastData(result);

    this.autoRefreshControl(true);
  }

  // checkbox
  changeCheck(e, data) {
    this.setState(data.changed);
    this.autoRefreshControl(data.changed.chk1);
  }

  // 오토리프레쉬 실행/정지 메소드
  autoRefreshControl(param) {
    const timer = this.state.timer;
    if (param === true) {
      this.setState({
        timer: setTimeout(this.onSearch.bind(this, true), 600000),
      });
    } else {
      this.setState({
        timer: clearTimeout(timer),
      });
    }

  }

  // 일계 버튼
  onClickDay(e, data) {
    console.log('일계');
    const { monitoringStore } = this.props;
    monitoringStore.setDay(data.value);
    const date = monitoringStore.date;
    if (date !== undefined) {
      // const fromDay = moment(date[1]).subtract(1,'days');
      const fromDay = moment(date[1]).format('YYYYMMDD');
      const toDay = moment(date[1]).format('YYYYMMDD');

      this.setDate([fromDay, toDay]);
      this.onSearch(null, fromDay, toDay);
    } else {
      const today = moment().format('YYYYMMDD');
      const fromDay = moment(today).format('YYYYMMDD');
      const toDay = today;

      this.setDate([fromDay, toDay]);
      this.onSearch(null, fromDay, toDay);
    }
  }

  // 주계 버튼
  onClickWeek(e, data) {
    const { monitoringStore } = this.props;
    monitoringStore.setDay(data.value);
    const date = monitoringStore.date;
    if (date !== undefined) {
      const fromDay = moment(date[1]).subtract(6,'days').format('YYYYMMDD');
      const toDay = moment(date[1]).format('YYYYMMDD');

      this.setDate([fromDay, toDay]);
      this.onSearch(null, fromDay, toDay);
    } else {
      const today = moment().format('YYYYMMDD');
      const fromDay = moment(today).subtract(6,'days').format('YYYYMMDD');
      const toDay = today;

      this.setDate([fromDay, toDay]);
      this.onSearch(null, fromDay, toDay);
    }
  }

  // 월계 버튼
  onClickMonth(e, data) {
    const { monitoringStore } = this.props;
    monitoringStore.setDay(data.value);
    const date = monitoringStore.date;
    if (date !== undefined) {

      const fromDay = (moment(date[1]).date(1)).format('YYYYMMDD');
      const toDay = moment(date[1]).format('YYYYMMDD');

      this.setDate([fromDay, toDay]);
      this.onSearch(null, fromDay, toDay);
    } else {
      const today = moment().format('YYYYMMDD');
      const fromDay = (moment().date(1)).format('YYYYMMDD');
      const toDay = today;

      this.setDate([fromDay, toDay]);
      this.onSearch(null, fromDay, toDay);
    }
  }

  // 차트 버튼
  onClickChart() {
    this.props.history.push(`/m2dd010100`);
  }

  // 테이블 버튼
  onClickTable() {
    const date = this.props.monitoringStore.date;
    this.props.steelCastMonitoringStore.setDate(date);
    // this.props.history.push(`${context.path()}/m2dd010110`);
    link.loadSelf(`${context.path()}/m2dd010110?layout=hidden&NS_FKEY=m2dd010110${this.props.monitoringStore.nsFkey}&date=${date[0]}&date2=${date[1]}`, '제강연주조업모니터링');
  }

  renderCustomizedLabel({ cx, cy, midAngle, innerRadius, outerRadius, index }) {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        <tspan x={x} y={y}>{`${this.props.monitoringStore.iron !== undefined ? this.props.monitoringStore.iron.pie[index].name : null}`}</tspan>
        <tspan x={x} y={y + 12}>{`${this.props.monitoringStore.iron !== undefined ? this.props.monitoringStore.iron.pie[index].value : null}`}</tspan>
      </text>
    );
  }

  setDate(data) {
    this.props.monitoringStore.setDate(data);
  }

  handleHelp() {
    console.log('도움말');
  }

  setHandler(handler) {
    this.setState({ handler });
  }

  invokeHandler(type, args) {
    if (this.state.handler[type]) {
      this.state.handler[type](...args);
    }
  }

  handleRemove(item) {
    const portletData = this.props.monitoringStore.portletData;
    const newData = portletData.filter((addItem) => addItem.id !== item.id);
    this.props.monitoringStore.setPortletData(newData);
  }

  handleAdd(item) {
    const portletData = this.props.monitoringStore.portletData;
    const newData = portletData;
    newData.push({ id: item.id, type: item.type, component: item.component });
    this.props.monitoringStore.setPortletData(newData);
  }



  render() {

    const { monitoringStore } = this.props;

    return (
      <ContentLayout className="ly-comprehensive">
        <Portlet.Header
          title="제강조업 종합현황"
          invokeHandler={this.invokeHandler}
          onHelp={this.handleHelp}
        />

        <MonitoringSearchView
          chk1={this.state.chk1}
          onSearch={this.onSearch}
          changeCheck={this.changeCheck}
          onClickDay={this.onClickDay}
          onClickWeek={this.onClickWeek}
          onClickMonth={this.onClickMonth}
          onClickChart={this.onClickChart}
          onClickTable={this.onClickTable}
          day={monitoringStore.day}
          setDate={this.setDate}
          date={monitoringStore.date}
        />
        <Portlet.Container setHandler={this.setHandler}>
          <Portlet.Content
            addData={monitoringStore.addData}
            portletData={monitoringStore.portletData}
            onRemove={this.handleRemove}
            onAdd={this.handleAdd}
          >
          </Portlet.Content>
        </Portlet.Container>
      </ContentLayout>

    );
  }
}

export default MonitoringContainer;

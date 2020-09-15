import { observable, action, computed, toJS } from 'mobx';
import { mesAutobind, instance } from '@mes/mes-shared';
// import { auth } from '@mes/mes-ui-react';
import moment from 'moment';

import DailyProductionPlanningRepository from '../repository/DailyProductionPlanningRepository';

@mesAutobind
class DailyProductionPlanningStore {
  @instance(DailyProductionPlanningRepository.instance)
  static instance;

  @observable
  _modal = { open: false };

  @computed
  get modal() { return toJS(this._modal); }

  @action
  setModel(v) { this._modal = v; }

  @observable
  _facCd = '1';

  @computed
  get facCd() { return toJS(this._facCd); }

  @action
  setFacCd(v) {
    this._facCd = v;
  }

  // @observable
  // _chk= {
  //   chk1: true, //1전로
  //   chk2: true, //2전로
  //   chk3: true, //3전로
  //   chk4: true, //4전로
  // };

  // @computed
  // get chk() { return toJS(this._chk); }

  // @action
  // setChk(v) {
  //   this._chk = v;
  // }

  //조회월
  @observable
  _mpPlanDate=moment().format('YYYY-MM');

  @computed
  get mpPlanDate() { return toJS(this._mpPlanDate); }

  @action
  setMpPlanDate(v) {
    this._mpPlanDate = v;
  }


  @observable
  _columnDefs;

  @computed
  get columnDefs() {
    return toJS(this._columnDefs);
  }

  //data
  @observable
  _rowData = [];

  @computed
  get rowData() {
    return toJS(this._rowData);
  }

  //합계 row
  @observable
  _sumRow = [{ mpPlanDate: '계' }];

  @computed
  get sumRow() {
    return toJS(this._sumRow);
  }

  @action
  onSearch(url) {
    this._rowData = [];
    this._sumRow = [];
    return Promise.all([
      DailyProductionPlanningRepository.instance.onSearch(url),
      DailyProductionPlanningRepository.instance.onSum(url),
    ]).then(action(data => {
      this._rowData = data[0];
      this._sumRow = [data[1]];
    }));

    // DailyProductionPlanningRepository.instance.onSearch(url)
    //   .then(action(data => { this._rowData = data; }));
    // DailyProductionPlanningRepository.instance.onSum(url)
    //   .then(action(data => { this._sumRow = [data]; }));
  }

  @action
  onCompute(rData) {
    this._rowData = rData;
  }

  @action
  onSave(url) {
    return DailyProductionPlanningRepository.instance.onSave(url);
  }

  @action
  fileUpload(url) {
    DailyProductionPlanningRepository.instance.fileUpload(url);
  }

  @action
  calculate(rData) {
    this._rowData = rData;
  }
}

export default DailyProductionPlanningStore;

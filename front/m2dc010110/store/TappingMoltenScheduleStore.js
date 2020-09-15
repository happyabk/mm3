import { observable, action, computed, toJS } from 'mobx';
import { mesAutobind, instance } from '@mes/mes-shared';
import TappingMoltenScheduleRepository from '../repository/TappingMoltenScheduleRepository';

@mesAutobind
class TappingMoltenScheduleStore {

  @instance(TappingMoltenScheduleRepository.instance)
  static instance;

  @observable
  _time = '';

  @observable
  _rowData = [];

  @computed
  get time() { return toJS(this._time); }

  @computed
  get rowData() {
    return  this._rowData ? this._rowData.slice() : [];
  }

  @action
  set(datas) {
    if (datas[0] || datas[1]) {
      this._time = datas[0];
      this._rowData = datas[1];
      return true;
    } else {
      return false;
    }
  }

  @action
  onSearch(url) {
    this._rowData = [];
    return Promise.all([
      TappingMoltenScheduleRepository.instance.onTime(url),
      TappingMoltenScheduleRepository.instance.onSchedule(url),
    ])
      .then(datas => this.set(datas));
  }

  @action
  onAutoRefreshSearch(url) {
    this._rowData = [];
    return Promise.all([
      TappingMoltenScheduleRepository.instance.onTime(url),
      TappingMoltenScheduleRepository.instance.onAutoRefreshSearch(url),
    ])
      .then(datas => this.set(datas));
  }

}

export default TappingMoltenScheduleStore;

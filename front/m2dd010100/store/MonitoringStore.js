import { observable, action, computed, toJS } from 'mobx';
import { mesAutobind, instance } from '@mes/mes-shared';
import moment from 'moment';
import MonitoringRepository from '../repository/MonitoringRepository';

@mesAutobind
class MonitoringStore {

  @instance(MonitoringRepository.instance)
  static instance;

  repository;

  constructor(repository) {
    this.repository = repository;
  }

  @observable
  _iron;

  @observable
  _steel;

  @observable
  _cast;

  @observable
  worksCode = 'P';

  @observable
  operFlag = this.worksCode === 'P' ? 'C' : '3';

  @observable
  userInfo = {};

  @observable
  nsFkey = '';

  @observable
  day = 'month';

  @observable
  _date = [moment().date(1).format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')];

  @observable
  _addData = [];

  @observable
  _portletData = [];

  @computed
  get date() {
    return toJS(this._date);
  }

  @computed
  get iron() {
    return toJS(this._iron);
  }

  @computed
  get steel() {
    return toJS(this._steel);
  }

  @computed
  get cast() {
    return toJS(this._cast);
  }

  @computed
  get addData() {
    return toJS(this._addData);
  }

  @computed
  get portletData() {
    return toJS(this._portletData);
  }

  // 용선 조회
  @action
  findIronChart(data) {
    return this.repository.findIronChart(data)
      .then((iron) => this._iron = iron);
  }

  // 제강 조회
  @action
  findSteelData(data) {
    return this.repository.findSteelData(data)
      .then((steel) => this._steel = steel);
  }

  // 연주 조회
  @action
  findCastData(data) {
    return this.repository.findCastData(data)
      .then((cast) => this._cast = cast);
  }

  @action
  setDate(data) {
    this._date = data;
  }

  @action
  setDay(data) {
    this.day = data;
  }

  @action
  setWorksCode(data) {
    console.log(data);
    this.worksCode = data;
  }

  @action
  setUserInfo(data) {
    this.userInfo = data;
  }

  @action
  setOperFlag(data) {
    console.log(data);
    this.operFlag = data;
  }

  @action
  setNsFkey(data) {
    this.nsFkey = data;
  }

  @action
  setAddData(data) {
    this._addData = data;
  }

  @action
  setPortletData(data) {
    this._portletData = data;
  }

}

export default MonitoringStore;


import React from 'react';
import { observable, action, computed, toJS } from 'mobx';
import { mesAutobind, instance } from '@mes/mes-shared';
import { notification, message } from '@mes/mes-ui-react';
import moment from 'moment';
import SteelScheduleMonitoringRepository from '../repository/SteelScheduleMonitoringRepository';
import SteelScheduleMonitoringModel from '../model/SteelScheduleMonitoringModel';

@mesAutobind
class SteelScheduleMonitoringStore {

  @instance(SteelScheduleMonitoringRepository.instance)
  static instance;

  repository;

  constructor(repository) {
    this.repository = repository;
  }


  @observable
  worksCode = 'K';

  @observable
  operFlag = this.worksCode === 'K' ? '3' : 'C';

  @observable
  userInfo = {};

  @observable
  date = moment().format('YYYY-MM-DD HH:mm:ss');

  @observable
  _converter = [];

  @observable
  _second = {};

  @observable
  _cast = {};

  @observable
  _datas = [];

  @computed
  get converter() {
    return toJS(this._converter);
  }

  @computed
  get second() {
    return toJS(this._second);
  }

  @computed
  get cast() {
    return toJS(this._cast);
  }

  @computed
  get datas() {
    return toJS(this._datas);
  }

  @action
  setWorksCode(data) {
    this.worksCode = data;
  }

  @action
  setUserInfo(data) {
    this.userInfo = data;
  }

  @action
  setOperFlag(data) {
    this.operFlag = data;
  }

  @action
  setDate(data) {
    console.log(data);
    this.date = data;
  }

  @action
  findConverter(operFlag, date) {
    return this.repository.findConverter(operFlag, date);
    // .then((data) => this._converter = SteelScheduleMonitoringModel.findConverter(data, operFlag));
  }

  @action
  findSecond(operFlag, date) {
    return this.repository.findSecond(operFlag, date);
    // .then((data) => this._second = SteelScheduleMonitoringModel.findSecond(data, operFlag));
  }

  @action
  findCast(operFlag, date) {
    return this.repository.findCast(operFlag, date);
    // .then((data) => this._cast = SteelScheduleMonitoringModel.findCast(data, operFlag));
  }

  @action
  findData(operFlag, date) {
    // return this.repository.findConverter(operFlag, date)
    //   .then((data) => {
    //     this._converter = SteelScheduleMonitoringModel.findConverter(data, operFlag)
    //     return this.repository.findSecond(operFlag, date)
    //       .then((data2) => {
    //         this._second = SteelScheduleMonitoringModel.findSecond(data2, operFlag)
    //         return this.repository.findCast(operFlag, date)
    //           .then((data3) => {
    //             this._cast = SteelScheduleMonitoringModel.findCast(data3, operFlag)

    //             if(operFlag === 'C') {
    //               this._datas = [ ...this.converter[1], ...this.second[1], ...this.cast[1], ...this.cast[2], ...this.converter[2], ...this.second[2]];
    //             } else {
    //               this._datas = [ ...this.converter[0], ...this.second[0], ...this.cast[0], ...this.converter[1], ...this.second[1], ...this.cast[1], ...this.converter[2], ...this.second[2], ...this.cast[2]]
    //             }

    //           });
    //       });
    //   });



    Promise.all([this.findConverter(operFlag, moment(date).format('YYYYMMDDHH')), this.findSecond(operFlag, moment(date).format('YYYYMMDDHH')), this.findCast(operFlag, moment(date).format('YYYYMMDDHH'))])
      .then((value) => {

        const converter = SteelScheduleMonitoringModel.findConverter(value[0], operFlag, date);
        const second = SteelScheduleMonitoringModel.findSecond(value[1], operFlag, date);
        const cast = SteelScheduleMonitoringModel.findCast(value[2], operFlag, date);

        if (Object.prototype.toString.call(value) === '[object Array]' || value === '') {
          notification(message('M22JS2161', ['조회되었습니다.']));
        } else {
          notification(message('M22JS2161', [value]));
        }
        if (operFlag === 'C') {
          this._datas = [ ...converter[1], ...second[1], ...cast[1], ...cast[2], ...second[2], ...converter[2]];
        } else {
          this._datas = [ ...converter[0], ...second[0], ...cast[0], ...converter[1], ...second[1], ...cast[1], ...converter[2], ...second[2], ...cast[2]];
        }

      });

  }


}

export default SteelScheduleMonitoringStore;

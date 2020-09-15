
import axios from 'axios';
import { instance } from '@mes/mes-shared';
import MonitoringModel from '../model/MonitoringModel';

class MonitoringRepository {

  @instance
  static instance;

  // 용선 조회
  findIronChart(data) {
    return axios.get(`/m2de01-report/monitoring/iron/${data.operFlag}/${data.fromDay}/${data.toDay}`)
      .then(response => MonitoringModel.findIronChart(response.data, data.operFlag));
  }

  // 제강 조회
  findSteelData(data) {
    return axios.get(`/m2de01-report/monitoring/steel/${data.operFlag}/${data.fromDay}/${data.toDay}`)
      .then(response => MonitoringModel.findSteelData(response.data, data.operFlag));
  }

  // 연주 조회
  findCastData(data) {
    return axios.get(`/m2de01-report/monitoring/cast/${data.operFlag}/${data.fromDay}/${data.toDay}`)
      .then(response => MonitoringModel.findCastData(response.data, data.operFlag));
  }

}

export default MonitoringRepository;

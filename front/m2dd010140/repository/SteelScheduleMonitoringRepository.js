
import axios from 'axios';
import { instance } from '@mes/mes-shared';

class SteelScheduleMonitoringRepository {

  @instance
    static instance;

  // 전로
  findConverter(operFlag, date) {
    return axios.get(`/m2d000-composite/monitoring/schedule/converter/${operFlag}/${date}`)
      .then(response => response && response.data);
  }

  // 2차정련
  findSecond(operFlag, date) {
    return axios.get(`/m2d000-composite/monitoring/schedule/second/${operFlag}/${date}`)
      .then(response => response && response.data);
  }

  // 연주
  findCast(operFlag, date) {
    return axios.get(`/m2d000-composite/monitoring/schedule/cast/${operFlag}/${date}`)
      .then(response => response && response.data);
  }

}

export default SteelScheduleMonitoringRepository;

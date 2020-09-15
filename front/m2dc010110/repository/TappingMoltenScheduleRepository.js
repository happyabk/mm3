import axios from 'axios';
import { instance, mesAutobind } from '@mes/mes-shared';
// import { notification, message } from '@mes/mes-ui-react';



@mesAutobind
class TappingMoltenScheduleRepository {
  @instance
  static instance;

  //지시지편성일시
  onTime(url) {
    return axios.get(`/m2dc01-material/view/steel-tapping-schedule/opIndiCompTm?`
      + `operFlag=${url.operFlag}`
      + `&facOpCdN=${url.facOpCdN}`)
      .then(response => response.data);
  }

  //조회버튼
  onSchedule(url ) {
    //return axios.get(`m2dc01-material/view/steel-tapping-schedule`
    return axios.get(`m2dc01-material/view/steel-tapping-schedule/steelTappingScheduleQuery`
    + `?worksCode=${url.worksCode}`
    + `&operFlag=${url.operFlag}`
    + `&facOpCdN=${url.facOpCdN}`
    + `&ldNo=${url.ldNo}`
    + `&mcNo=${url.mcNo}`
    + `&mtlNo=${url.mtlNo}`)
      .then(response => response.data)
      .catch(() => false);
  }

  onAutoRefreshSearch(url ) {
    return axios.get(`m2dc01-material/view/steel-tapping-schedule/steelTappingScheduleQueryRefresh`
    + `?worksCode=${url.worksCode}`
    + `&operFlag=${url.operFlag}`
    + `&facOpCdN=${url.facOpCdN}`
    + `&ldNo=${url.ldNo}`
    + `&mcNo=${url.mcNo}`
    + `&mtlNo=${url.mtlNo}`)
      .then(response => response.data)
      .catch(() => false);
  }

  //History
  // onHistory(url) {
  //   return axios.get(`m2dc01-material/view/steel-tapping-schedule/productionHistory`
  //   + `?worksCode=${url.worksCode}`
  //   + `&operFlag=${url.operFlag}`
  //   + `&facOpCdN=${url.facOpCdN}`
  //   )
  //     .then(response => response.data);
  // }
}
export default  TappingMoltenScheduleRepository;

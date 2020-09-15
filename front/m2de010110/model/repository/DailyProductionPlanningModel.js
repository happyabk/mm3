import axios from 'axios';
import { instance, mesAutobind } from '@mes/mes-shared';
import { dialog, message, notification } from '@mes/mes-ui-react';


import DailyProductionPlanningModel from '../model/DailyProductionPlanningModel';

@mesAutobind
class DailyProductionPlanningRepository {
  @instance
  static instance;

  //조회
  onSearch(url) {
    return axios.get(`m2drq0-readonly/report/production/daily/${url.operFlag}/${url.mpPlanDate}`)
      .then(response => DailyProductionPlanningModel.fromApiModels(response.data));
  }

  //합계조회
  onSum(url) {
    return axios.get(`m2drq0-readonly/report/production/sum/${url.operFlag}/${url.mpPlanDate}`)
      .then(response => response.data);
  }

  //저장
  onSave(url) {
    return axios.put(`m2de01-report/production-planning/monthPlan/${url.operFlag}`, url.rowData);
    // .then(response => (response.status === 200 ? dialog.alert('정상적으로 저장 되었습니다.') : dialog.alert(message('M27JS1275'))))
  }

  //엑셀업로드
  fileUpload(url) {
    return axios.post('m2de01-report/production-planning/uploadEcmExcelFile', url.data)
      .then(response => (response.status === 200 ? notification(message('M00999104')) : dialog.error(message('M27JS1275'))))
      .catch(() => null);
  }
}
export default  DailyProductionPlanningRepository;


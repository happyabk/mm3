/*==============================================================================================
* @FileName : 공통 masterCode Store
* Change history
* @수정 날짜;SCR_NO;수정자;수정내용
* @2019-08-01;00000;최수지;최초생성
==============================================================================================*/

import { observable, action, computed, toJS } from 'mobx';
import { mesAutobind, instance } from '@mes/mes-shared';
import { auth } from '@mes/mes-ui-react';
import axios from 'axios';
import { PosM2DUtility } from '@/common';

@mesAutobind
class MasterCodeStore {

  @instance
  static instance;

  async setLovDefault(response, all, setLov) {
    const getAllUserInfo = await PosM2DUtility.getAllUserInfo();
    const lov = await PosM2DUtility.masterDataLovModel(response.data, all);
    this[setLov](getAllUserInfo.facOpCdN || lov[0].value, lov);
  }

  /* 강번-------------------------------------------------------*/
  @observable
  _mtlNo = '';

  @computed
  get mtlNo() { return toJS(this._mtlNo); }

  @action
  setMtlNo(value) { this._mtlNo = value; }
  /*end ----------------------------------------------------------*/

  /**제강공장코드-------------------------------------------------------*/
  @observable
  _facOpCdN = '';

  @observable
  _lovFacOpCdN=[{ value: '', text: '' }];

  @computed
  get facOpCdN() { return toJS(this._facOpCdN); }

  @computed
  get lovFacOpCdN() { return toJS(this._lovFacOpCdN); }

  @action
  setFacOpCdN(value) { this._facOpCdN = value; }

  @action
  setLovFacOpCdN(value, lov) {
    this._facOpCdN = value;
    this._lovFacOpCdN = lov;
  }



  onFacOpCdN(all) {
    if (!this.userInfo) {
      return auth.getUserInfo()
        .then((get) => {
          this.userInfo = get;
          return axios.get(`/m2dc01-material/view/lovFacOpCdN/${get.plantFlag}`)
            .then(response => this.setLovDefault(response, all, 'setLovFacOpCdN'));
        });
    } else {
      return axios.get(`/m2dc01-material/view/lovFacOpCdN/${this.userInfo.plantFlag}`)
        .then(response => this.setLovDefault(response, all, 'setLovFacOpCdN'));
    }
  }
  /*end ----------------------------------------------------------*/


  /**제강공장코드 123 -------------------------------------------------------*/
  @observable
  _facOpCdNNo = '';

  @observable
  _lovFacOpCdNNo=[{ value: '', text: '' }];

  @computed
  get facOpCdNNo() { return toJS(this._facOpCdNNo); }

  @computed
  get lovFacOpCdNNo() { return toJS(this._lovFacOpCdNNo); }

  @action
  setFacOpCdNNo(value) { this._facOpCdNNo = value; }

  @action
  setLovFacOpCdNNo(value, lov) {
    this._facOpCdNNo = value[0];
    this._lovFacOpCdNNo = lov;
  }


  onFacOpCdNNo(all) {
    if (!this.userInfo) {
      return auth.getUserInfo()
        .then((get) => {
          this.userInfo = get;
          return axios.get(`/m2dc01-material/view/lovFacOpCdNOnlyNumber/${get.plantFlag}`)
            .then(response => this.setLovDefault(response, all, 'setLovFacOpCdNNo'));
        });
    } else {
      return axios.get(`/m2dc01-material/view/lovFacOpCdNOnlyNumber/${this.userInfo.plantFlag}`)
        .then(response => this.setLovDefault(response, all, 'setLovFacOpCdNNo'));
    }
  }
  /*end ----------------------------------------------------------*/

  /**mcNo -------------------------------------------------------*/
  @observable
  _mcNo = '';

  @observable
  _lovMcNo=[{ value: '', text: '' }];

  @computed
  get mcNo() { return toJS(this._mcNo); }

  @computed
  get lovMcNo() { return toJS(this._lovMcNo); }

  @action
  setMcNo(value) { this._mcNo = value; }

  onMcNo(all) {
    return axios.get(`m2dc01-material/view/lovMcNo`)
      .then(action(response => {
        const lov = PosM2DUtility.masterDataLovModel(response.data, all);
        this._mcNo = lov[0].value;
        this._lovMcNo = lov;
      }));
  }
  /*end ----------------------------------------------------------*/


  /*제강요령문서유형 ----------------------------------------------------------*/
  @observable
  _smEdmsDocType = '';

  @observable
  _lovSmEdmsDocType=[{ value: '', text: '' }];

  @computed
  get smEdmsDocType() { return toJS(this._smEdmsDocType); }

  @computed
  get lovSmEdmsDocType() { return toJS(this._lovSmEdmsDocType); }

  @action
  setSmEdmsDocType(value) { this._smEdmsDocType = value; }

  onSmEdmsDocType(all) {
    return axios.get(`m2dc01-material/view/lovMethodDocumentTypeCode`)
      .then(action(response => {
        const lov = PosM2DUtility.masterDataLovModel(response.data, all);
        this._smEdmsDocType = lov[0].value;
        this._lovSmEdmsDocType = lov;
      }));
  }
  /*end ----------------------------------------------------------*/


  /*제강요령설계품종 ----------------------------------------------------------*/
  @observable
  _smModDesnItemTp = '';

  @observable
  _lovSmModDesnItemTp=[{ value: '', text: '' }];

  @computed
  get smModDesnItemTp() { return toJS(this._smModDesnItemTp); }

  @computed
  get lovSmModDesnItemTp() { return toJS(this._lovSmModDesnItemTp); }

  @action  setSmModDesnItemTp(value) { this._smModDesnItemTp = value; }  @action  setLovSmModDesnItemTp(response, all) {
    const lov = PosM2DUtility.masterDataLovModel(response.data, all);
    this._smModDesnItemTp = lov[0].value;
    this._lovSmModDesnItemTp = lov;
  }

  onSmModDesnItemTp(all) {    if (!this.userInfo) {
    return auth.getUserInfo()
      .then((get) => {
        this.userInfo = get;
        return axios.get(`m2dc01-material/view/lovMethodDesignItemType/${get.plantFlag}`)
          .then(response => this.setLovSmModDesnItemTp(response, all));
      });
  } else {
    return axios.get(`m2dc01-material/view/lovMethodDesignItemType/${this.userInfo.plantFlag}`)
      .then(response => this.setLovSmModDesnItemTp(response, all));
  }
  }
  /*end ----------------------------------------------------------*/


  /*로ldNo ----------------------------------------------------------*/
  @observable
  _ldNo = '';

  @observable
  _lovLdNo=[{ value: '', text: '' }];

  @computed
  get ldNo() { return toJS(this._ldNo); }

  @computed
  get lovLdNo() { return toJS(this._lovLdNo); }

  @action
  setLdNo(value) { this._ldNo = value; }

  onLdNo(all) {
    return axios.get(`m2dc01-material/view/lovLdNo`)
      .then(action(response => {
        const lov = PosM2DUtility.masterDataLovModel(response.data, all);
        this._ldNo = lov[0].value;
        this._lovLdNo = lov;
      }));
  }
  /*end ----------------------------------------------------------*/


  /**원소명 ----------------------------------------------------------*/
  @observable
  _lovChemicalElementSymbol = '';

  @computed
  get lovChemicalElementSymbol() {
    return toJS(this._lovChemicalElementSymbol);
  }

  onLovChemicalElement(all) {
    return axios.get(`m2dc01-material/view/steel-making-method-key-unmapping/lovChemicalElement`)
      .then(action(response => {
        const lov = PosM2DUtility.masterDataLovModel(response.data, all);
        this._lovChemicalElementSymbol = lov;
      }));
  }
  /*end ----------------------------------------------------------*/


  /**지정대상 ----------------------------------------------------------*/
  @observable
  _lovChemicalElementRangeTp = '';

  @computed
  get lovChemicalElementRangeTp() {
    return toJS(this._lovChemicalElementRangeTp);
  }

  onLovChemicalElementRangeTp(all) {
    return axios.get(`m2dc01-material/view/steel-making-method-key-unmapping/lovRangeType`)
      .then(action(response => {
        const lov = PosM2DUtility.masterDataLovModel(response.data, all);
        this._lovChemicalElementRangeTp = lov;
      }));
  }
  /*end ----------------------------------------------------------*/

}

export default MasterCodeStore;

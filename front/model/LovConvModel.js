
class LovConvModel {
  
  //-------------------------------------------------------------------------
  //배열 형식을 lov로변경하기위한 함수1
  //-------------------------------------------------------------------------
  static toLovConvArr(arrData, key, val) {
    const lovRow = arrData.map((k) => ({ key: k[key], value: k[key], text: k[val] } ));
    return lovRow;
  }


  //-------------------------------------------------------------------------
  //object형식을 lov로변경하기위한 함수1  (/masterdata/{codetype}/{category})
  //-------------------------------------------------------------------------
  static toLovConv(mastData) {
    const obj = mastData;
    const lovRow = Object.keys(obj).map((k) => ({ key: k, value: k, text: obj[k] } ));
    return lovRow;
  }

  //-------------------------------------------------------------------------
  //object형식을 lov로변경하기위한 함수1  (/masterdata/{codetype}/{category})
  //-------------------------------------------------------------------------
  static toLovConvAddNull(mastData) {
    const obj = mastData;
    const lovRow = Object.keys(obj).map((k) => ({ key: k, value: k, text: obj[k] } ));
    lovRow.unshift({ key: '', value: '', text: '' });
    return lovRow;
  }


  //-------------------------------------------------------------------------
  //object형식을 lov로변경하기위한 함수1  (/masterdata/{codetype}/{category})
  // key : value 형태로 보여주는..
  //-------------------------------------------------------------------------
  static toLovConvKeyValType(mastData) {
    const obj = mastData;
    const lovRow = Object.keys(obj).map((k) => ({ key: k, value: k, text: `${k} : ${obj[k]}` } ));
    return lovRow;
  }

  //-------------------------------------------------------------------------
  //object형식을 lov로변경하기위한 함수1  (/masterdata/{codetype}/{category})
  //-------------------------------------------------------------------------
  static toLovConvModels(mastData) {
    const obj = [mastData.result];
    const lovRow = Object.keys(obj).map((k) => ({ key: k, value: k, text: obj[k] } ));
    return lovRow;
  }

  //-------------------------------------------------------------------------
  //object형식에서 사용자권한별 lov값만 뽑아와서 lov로변경하기위한 함수1  (/posrule/{codetype} getPosRule)
  //-------------------------------------------------------------------------
  static toLovUserConvModels(mastData) {
    const obj = mastData.result;
    const objValue = Object.keys(obj).filter(data => data.substr(0, 9) === 'LOV_VALUE');
    const arrLov = [];
    objValue.map((k) => {
      if (obj[k] !== '') {
        arrLov.push({ key: obj[k], value: obj[k], text: obj['LOV_KEY' + (k.substr(9, 1))] });
      }
    });
    return arrLov;
  }
  

  //-------------------------------------------------------------------------
  //object형식에서 사용자권한별 lov값만 뽑아와서 lov로변경하기위한 함수2  (/posrule/{codetype} getPosRule)
  //위에 함수명이 user이 붙어있어서 맘에 안들어서 아래로 바꿈
  //-------------------------------------------------------------------------
  static toLovCdConvModels(mastData) {
    const obj = mastData.result;
    const objValue = Object.keys(obj).filter(data => data.substr(0, 9) === 'LOV_VALUE');
    const arrLov = [];
    objValue.map((k) => {
      if (obj[k] !== '') {
        arrLov.push({ key: obj[k], value: obj[k], text: obj['LOV_KEY' + (k.substr(9, 1))] });
      }
    });
    return arrLov;
  }

  //-------------------------------------------------------------------------
  // 다음형태로 리턴되는 rule 의  key value text 형태로변환
  // ex. {PROMPT: "강편 장입 Schedule 조회", LOV_VALUE: "ALL", LOV_KEY: "전체"}
  //-------------------------------------------------------------------------
  static toLovCdConv(mastData) {
    const arr = mastData.result;
    if (arr === '' || arr === undefined) {
      return [];
    }
    const arrLov = arr.map((k) => ({ key: k.LOV_VALUE, value: k.LOV_VALUE, text: k.LOV_KEY }));
    return arrLov;
  }

  //-------------------------------------------------------------------------
  //object형식에서 사용자권한별 lov값만 뽑아와서 lov로변경하기위한 함수3  (/posrule/{codetype} getPosRule)
  //전체 LOV 값을 가져오는 경우 형태가 맞지 않아서 mastData.result 길이 조건으로 분기시키도록 추가 작성
  //-------------------------------------------------------------------------
  static toLovCdConvModels2(mastData) {
    const obj = mastData.result;

    if (mastData.result.length === 1) {
      const objValue = Object.keys(obj).filter(data => data.substr(0, 9) === 'LOV_VALUE');
      const arrLov = [];
      objValue.map((k) => {
        if (obj[k] !== '') {
          arrLov.push({ key: obj[k], value: obj[k], text: obj['LOV_KEY' + (k.substr(9, 1))] });
        }
      });
      console.log(arrLov);
      return arrLov;
    } else {
      console.log('길이가 1보다 김');
      const arrLov = [];
      for (let i = 0; i < obj.length; i++) {
        const obj2 = obj[i];
        const objValue = Object.keys(obj2).filter(data => data.substr(0, 9) === 'LOV_VALUE');
        objValue.map((k) => {
          if (obj2[k] !== '') {
            arrLov.push({ key: obj2[k], value: obj2[k], text: obj2['LOV_KEY' + (k.substr(9, 1))] });
          }
        });
      }
      console.log(arrLov);
      return arrLov;
    }

    // return null;
  }


  static toDomainModel(list) {
    // TODO: 도메인 모델 객체 형태로 변환
    return list;
  }
 
 

}

class StatusModel {
  constructor(status = {}) {
    Object.assign(this, status);
  }
}
 

export default LovConvModel;

export {
  LovConvModel,
};

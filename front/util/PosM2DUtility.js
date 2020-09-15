
import numeral from 'numeral';
import qs from 'qs';

class PosM2DUtility {
  constructor(data = {}) {
    if (!data) {
      data = {};
    }
    Object.assign(this, data);
  }

  /*-------------------------------------------------------
    배열인지 확인 함수
    obj : Json 객체 리스트
  -------------------------------------------------------*/
  static isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  }

/*-------------------------------------------------------
    * 연관메뉴 link
    *
    * @param allUserInfo : 권한 유틸,사용자 전체 권한 정보 (auth.getAllUserInfo()) (필
    * @param id : 화면 id (필
    * @param linkName : 화면 text 이름
    * @param search : link search 값
    * @param changeLink : link 변수 값
  -------------------------------------------------------*/
  static menuItemsLink(allUserInfo = {}, id, linkName, search, changeLink) {
    const { NS_RKEY } = qs.parse(window.location.search.split('?')[1]);
    let windowLink = window.origin;


    let text = linkName || id;
    const urlfro = `/common/${id.substr(0, 6)}-front/${changeLink || id}`;
    if (windowLink.includes('posco')) {
      windowLink +=  urlfro;
    } else {
      windowLink += `/${id}`;
    }
    if (allUserInfo.authUrls) {
      const authUrl = allUserInfo.authUrls[urlfro];
      if (authUrl && NS_RKEY) {
        authUrl.forEach(
          menu => {
            if (menu.menuListKey === NS_RKEY) {
              text = menu.name;
              const rightSearch = {
                NS_FKEY: menu.func,
                NS_RKEY: menu.menuListKey,
                ...search,
              };
              windowLink += `?` + qs.stringify(rightSearch);
            }
          }
        );
      } else {
        windowLink += ( search ? '?' + qs.stringify(search) : '');
      }
    }
    return { text, link: windowLink, target: '_parent' };
  }


  /*-------------------------------------------------------
    체크박스 선택한 row만 임의의 배열에 담아두는..
    dataList: 선택된 row 넣어두는 배열
    param   : 선택된 row
  -------------------------------------------------------*/
  static onRowSelected(selectList, param) {
    const objData = param.data;

    if (selectList.length > 0) {
      const chkList = selectList.filter(d => d.rowIndex === param.rowIndex);
      if (chkList.length > 0) {
        return selectList.filter(d => d.rowIndex !== param.rowIndex);
      } else {
        objData.rowIndex = param.rowIndex;
        selectList.push(objData);
      }
    } else {
      objData.rowIndex = param.rowIndex;
      selectList.push(objData);
    }

    return selectList;
  }


  // //-------------------------------------------------------------------------
  // //object형식에서 값 찾기  (/masterdata/{codetype}/{category})
  // //-------------------------------------------------------------------------
  // static toObjConvModels(mastData) {
  //   // console.log(mastData)
  //   let obj = [mastData.result];
  //   const lovRow = Object.keys(obj).map(function(k) {
  //                 return {"key":k, "value":k, "text":obj[k]} ;
  //               });
  //   return lovRow;
  // }


  /*-------------------------------------------------------
  // DOQ 항목 편집용
  //  [{key: "customerNumber", value: "A1294"}] 형태의 배열을 하나의 Object로 리턴
  -------------------------------------------------------*/
  static onKeyValueObj(arrList) {
    // console.log("PosM2DUtility - onKeyValueObj-------------------------------")
    const objList = {};
    arrList.map((key, idx) => {
      objList[key.key] = key.value;
      // console.log(key["key"]+" / "+key["value"])
    });
    return objList;
  }

  /*-------------------------------------------------------
  // DOQ 항목 편집용 - 리스트에서 주문번호만 뽑을려고
  // 배열로 리턴
  -------------------------------------------------------*/
  static onOrderNumberObj(dataList) {
    const arrList = [];
    dataList.map((key, idx) => {
      arrList.push(key.orderHeadLineNo);
    });
    const rtnList = arrList.filter((item, index) => arrList.indexOf(item) === index);
    return rtnList;
  }


  /*-------------------------------------------------------
  // 날짜타입 변경
  // e : true(시작일), false(끝날)
  // dt : 날짜.(yyyy-MM-dd)
  // return :  시작일 : yyyy-MM-dd 00:00:00, 종료일 : yyyy-MM-dd 23:59:59
  -------------------------------------------------------*/
  static onDateType(e, dt) {
    // 날짜  YYYY-MM-DD
    // var dayRegExp = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;
    // 시간  HH24:mm (24시간)
    // var timeRegExp = /^([1-9]|[01][0-9]|2[0-3]):([0-5][0-9])$/;
    // 복합 YYYYMMDD HH24:mm (중간 공백)
    // let startTimeRegExp = /^([1-9]|[01][0-9]|2[0-3]):([0-5][0-9])$/;
    // let endTimeRegExp = /^([1-9]|[01][0-9]|2[0-3]):([0-5][0-9])$/;

    // let RegExp = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])\s([1-9]|[01][0-9]|2[0-3]):([0-5][0-9])$/;
    if (!dt.RegExp && e) {
      return dt + ' 00:00:00';
    } else if (!dt.RegExp && !e) {
      return dt + ' 23:59:59';
    }
  }

  /*-------------------------------------------------------
  // 천단위 콤마
  // num : 입력숫자값
  -------------------------------------------------------*/
  static numberWithCommas(num) {
    if (num === undefined || num === '') {
      return 0;
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  /*-------------------------------------------------------
  // 천단위 콤마 - 0일때 리턴값 '', 빈값들어와도 '' 리턴
  // num : 입력숫자값
  -------------------------------------------------------*/
  static numWithCommas(num) {
    if (num === undefined || num === '') {
      return '';
    }
    const rtnNum = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return Number(rtnNum) === 0 ? '' : rtnNum;
  }

  /*-------------------------------------------------------
  // 배열 중복제거
  // arr : 배열값
  -------------------------------------------------------*/
  static arrDuplicate(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index); //중복제거
  }


  /*-------------------------------------------------------
  // arrDecode decode 문 과 동일하게 처리함
  //let arrVal = ["abc","1","a","2","b","xx"]
  -------------------------------------------------------*/
  static arrDecode(arrVal) {
    for (let i = 1; i < arrVal.length; i++) {

      const arrNo = arrVal.length - Number(1);
      if (i === arrNo) {
        return arrVal[i];
      }

      if (i % 2 === 1) {
        // console.log(arrVal[i]+" /" +i +" / "+ arrVal.length)
        if (arrVal[0] === arrVal[i]) {
          return arrVal[i + 1];
        }
      }
    }
  }


  /*-------------------------------------------------------
   * 문자열이 빈 문자열인지 체크하여 결과값을 리턴한다.
   * @param str       : 체크할 문자열
  -------------------------------------------------------*/
  static isEmpty(str) {
    if (typeof str === 'undefined' || str === null || str === '') {
      return true;
    } else {
      return false;
    }

  }

  /*-------------------------------------------------------
   * 문자열이 빈 문자열인지 체크하여 기본 문자열로 리턴한다.
   * @param str           : 체크할 문자열
   * @param defaultStr    : 문자열이 비어있을경우 리턴할 기본 문자열
  -------------------------------------------------------*/
  static nvl(str, defaultStr) {
    if (typeof str === 'undefined' || str === null || str === '') {
      str = defaultStr;
    }
    return str;
  }

  /*-------------------------------------------------------
   * 최대값 리턴
   * @param name : 체크할 이름
   * @param data : json 리스트
  -------------------------------------------------------*/
  static rowMax(name, data) {
    if (data.length === 0) {
      return '';
    }
    const rtnVal =      data.sort((a, b) =>  // 내림차순
      (a[name] > b[name] ? -1 : a[name] < b[name] ? 1 : 0)
    )[0];

    return rtnVal[name];
  }

  /*-------------------------------------------------------
* 체크하는 항목이 조회한 데이터에 없으면(null 혹은 undefined) 대체할 데이터를 리턴한다.
* @param checkData           : 체크할 데이터
* @param replaceData    : 해당 데이터가 없을 경우 리턴할 값
-------------------------------------------------------*/
  static replaceNull(checkData, replaceData) {
    if (checkData === undefined || checkData === null || checkData === 'NaN') {
      return replaceData;
    } else {
      return checkData;
    }
  }

  /*
  *  Object의 format을 ###,###로 변경하는 method 이다.
  */
  static getCommaFormat(data) {
    if (data === undefined) {
      return data;
    }

    if (numeral(data).value() === null) {
      return data;
    }

    return numeral(data).format('0,0,0');
  }



}


export default PosM2DUtility;

export {
  PosM2DUtility,
};

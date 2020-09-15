
class OrderByModel {
  constructor(data = {}) {
    if (!data) {
      data = {};
    }
    Object.assign(this, data);
  }
   
  /*-------------------------------------------------------
      orderBy 함수
      rowData : Json 객체 리스트
      orderById : orderBy할 항목 -  object값으로 받음 (ex.{name1:asc, name2:desc, name3:asc})
    -------------------------------------------------------*/
  static orderBy(rowData, orderById) {
    const obj = orderById;
    let objSort = 0;
        
    const sortList = rowData.sort((current, previous) => {
      const objSortVal = Object.keys(obj).map((k) => {
        if (obj[k] === 'asc') {
          return current[k] < previous[k] ? -1 : current[k] > previous[k] ? 1 : 0;
        } else {
          return current[k] > previous[k] ? -1 : current[k] < previous[k] ? 1 : 0;
        }
      });
 
      for (let i = 0; objSortVal.length > i; i++) {
        if (objSortVal[i] === 0) {
          if (objSortVal.length <= i + 1) {
            objSort = objSortVal[i + 1];
          }
        } else {
          objSort = objSortVal[i];
          break;
        }
      }
      return objSort;

    });
    return sortList;
 
  }

  

}
  
  
export default OrderByModel;
  
export {
  OrderByModel,
};
  

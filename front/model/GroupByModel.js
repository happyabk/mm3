
class GroupByModel {
  constructor(data = {}) {
    if (!data) {
      data = {};
    }
    Object.assign(this, data);
  }


  // static numberOfCipers(index, digits) {
  //   index += '';
  //   return index.length >= digits ? index : new Array(digits - index.length + 1).join('0') + index;
  // }
  /*
      groupBy 함수
      collection : Json 객체 리스트
      property : groupBy할 속성
     */
  static groupBy2(collection, property) {
    let i = 0; let val; let index; const values = []; const
      result = [];
    for (; i < collection.length; i++) {
      val = collection[i][property];
      index = values.indexOf(val);
      if (index > -1) {
        result[index].push(collection[i]);
      } else {
        values.push(val);
        result.push([collection[i]]);
      }
    }
    return result;
  }

  /*-------------------------------------------------------
      toMakeGroupId 그룹바이 id 생성
      rowData : 오브젝트 항목
      groupById : groupBy할 항목 - 배열값으로 받음
    -------------------------------------------------------*/
  static toMakeGroupId(row, groupById) {
    // let rowVal = groupById.map(k => row[k] )
    const rowVal = groupById.map((k) => {
      if (typeof row[k] === 'object') { //툴팁된항목이면 오브젝트라서 항목 체크함
        // console.log(row[k].value)
        // console.log("===>"+row[k])
        return row[k].value;
      }
      return row[k];
    });
    const gId = rowVal.join('');
    const rtnRow = { ...row, groupId: gId };
    return rtnRow;
  }

  /*-------------------------------------------------------
      groupBy 함수
      rowData   : Json 객체 리스트
      groupById : groupBy할 항목 - 배열값으로 받음
      sumId     : sum   - 배열값으로 받음 - 입력받은 항목명 그대로 리턴
      cntId     : count - 단일항목 - 입력받은 항목명 그대로 리턴
      maxId     : max   - 배열값으로 받음 - 입력받은 항목명뒤에 Max 붙여서 리턴함( ex.aaaMax ) 앞에 max 붙일려고 햇는데 항목명이랑 붙이면 카멜 이상해서..ex)maxaaBb
      minId     : min   - 배열값으로 받음 - 입력받은 항목명뒤에 Max 붙여서 리턴함( ex.aaaMin )
    -------------------------------------------------------*/
  static groupBy(rowData, groupById, sumId, cntId, maxId, minId) {
    const groupByData = rowData.map(row => GroupByModel.toMakeGroupId(row, groupById));
    const groups = _.groupBy(groupByData, 'groupId' );
    let seq = 0;
    let objVal = {};

    const resultData = _.map(groups, (value, groupId) => {
      seq++;
      objVal = {
        groupId,
        rowSeq: seq,
        [cntId]: value.length,
      };
      groupById.map(g => objVal[g] = value[0][g]);
      sumId.map(s => objVal[s] =                                     _.reduce(value, (total, o) => {
        if ( typeof (o[s]) === 'undefined') {
          return Number(total);
        } else {
          return Number(total) + Number(o[s]);
        }
      }, Number(0)
      )
      );

      //최대값
      if (typeof (maxId) !== 'undefined') {
        maxId.map(m => objVal[m + 'Max'] = _.reduce(value, (previous, current) => {
          // console.log( previous+":"+current+":"+typeof(current[m]))
          if ( typeof (current[m]) === 'undefined') {
            return '';
          } else {
            return previous > current[m] ? previous : current[m];
          }
        }, ''
        )
        );
      }
      //최소값
      if (typeof (minId) !== 'undefined') {
        minId.map(m => objVal[m + 'Min'] = _.reduce(value, (pre, cur) => {
          // console.log( pre+":"+cur+":"+typeof(cur[m]))
          if (pre !== '') {
            if ( typeof (cur[m]) === 'undefined') {
              return '';
            } else {
              return pre < cur[m] ? pre : cur[m];
            }
          }
        }, ''
        )
        );
      }


      return objVal;
    });
    return resultData;
  }



}


export default GroupByModel;

export {
  GroupByModel,
};


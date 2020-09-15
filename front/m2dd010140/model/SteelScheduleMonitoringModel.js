import { mesAutobind } from '@mes/mes-shared';
import moment from 'moment';
import React from 'react';

@mesAutobind
class SteelScheduleMonitoringModel {

  static findConverter(data, operFlag, date) {

    let result = [];

    for (let i = 0; i < data.length; i++) {
      data[i].operStartTime = data[i].operStartTime !== undefined ? moment(data[i].operStartTime).format('YYYY-MM-DD HH:mm:ss') : undefined;
      data[i].operEndTime = data[i].operEndTime !== undefined ? moment(data[i].operEndTime).format('YYYY-MM-DD HH:mm:ss') : undefined;
      const per = 100 / 60;
      const operStartTime = moment(data[i].operStartTime).format('mm');
      const leftTime = operStartTime;
      const widthTime = data[i].operEndTime !== undefined ? moment(data[i].operEndTime).diff(data[i].operStartTime, ('minute')) : undefined;
      const left = leftTime * per;
      const width = widthTime * per;
      const text = (data[i].mtlNo).substring(5, 7);
      const colorNo = data[i].mcNo;
      let color = null;
      if (colorNo === '1') {
        color = '#93BAED';
      } else if (colorNo === '2') {
        color = '#BCE67F';
      } else if (colorNo === '3') {
        color = '#EBB488';
      } else if (colorNo === '4') {
        color = '#F2D962';
      }

      data[i].left = left;
      data[i].width = width;
      data[i].text = text;
      data[i].color = color;
    }

    const f11 = data.filter(datas => datas.facOpCdN === '1L1' && datas.mSteWkYrdNo === '1');
    const f12 = data.filter(datas => datas.facOpCdN === '1L1' && datas.mSteWkYrdNo === '2');
    const f13 = data.filter(datas => datas.facOpCdN === '1L1' && datas.mSteWkYrdNo === '3');
    const f21 = data.filter(datas => datas.facOpCdN === '2L1' && datas.mSteWkYrdNo === '1');
    const f22 = data.filter(datas => datas.facOpCdN === '2L1' && datas.mSteWkYrdNo === '2');
    const f23 = data.filter(datas => datas.facOpCdN === '2L1' && datas.mSteWkYrdNo === '3');
    const f24 = data.filter(datas => datas.facOpCdN === '2L1' && datas.mSteWkYrdNo === '4');
    const f31 = data.filter(datas => datas.facOpCdN === '3L1' && datas.mSteWkYrdNo === '1');
    const f32 = data.filter(datas => datas.facOpCdN === '3L1' && datas.mSteWkYrdNo === '2');

    const fac1 = [ f11, f12, f13 ];
    const fac2 = operFlag === '3' ? [ f21, f22, f23 ] : [ f21, f22, f23, f24 ];
    const fac3 = operFlag === '3' ? [ f31, f32 ] : [ f32, f31 ];
    const hour1 = [
      { mSteWkYrdNo: []},
      { mSteWkYrdNo: []},
      { mSteWkYrdNo: []},
    ];

    const hour2 = operFlag === '3' ?
      [
        { mSteWkYrdNo: []},
        { mSteWkYrdNo: []},
        { mSteWkYrdNo: []},
      ]
      :
      [
        { mSteWkYrdNo: []},
        { mSteWkYrdNo: []},
        { mSteWkYrdNo: []},
        { mSteWkYrdNo: []},
      ];

    const hour3 = [
      { mSteWkYrdNo: []},
      { mSteWkYrdNo: []},
    ];

    for (let i = 0; i < hour1.length; i++) {
      for (let j = 0; j < 25; j++) {
        hour1[i].mSteWkYrdNo.push([]);
      }
    }

    for (let i = 0; i < hour2.length; i++) {
      for (let j = 0; j < 25; j++) {
        hour2[i].mSteWkYrdNo.push([]);
      }
    }

    for (let i = 0; i < hour3.length; i++) {
      for (let j = 0; j < 25; j++) {
        hour3[i].mSteWkYrdNo.push([]);
      }
    }

    for (let i = 0; i < fac1.length; i++) {
      for (let j = 0; j < 25; j++) {
        const time = (moment(date).subtract(8, 'hour')).add(j, 'hour').format('YYYY-MM-DD HH:00:00');
        let time2 = null;
        if (j !== 0) {
          time2 = (moment(date).subtract(8, 'hour')).add(j - 1, 'hour').format('YYYY-MM-DD HH:00:00');
        }
        for (let o = 0; o < fac1[i].length; o++) {
          const dates = moment(fac1[i][o].operStartTime).format('YYYY-MM-DD HH:mm:ss');
          if (time > dates) {
            if (j !== 0) {
              if (time2 < dates) {
                hour1[i].mSteWkYrdNo[j].push(fac1[i][o]);
              }
            } else {
              hour1[i].mSteWkYrdNo[j].push(fac1[i][o]);
            }
          }
        }
      }
    }

    for (let i = 0; i < fac2.length; i++) {
      for (let j = 0; j < 25; j++) {
        const time = (moment(date).subtract(8, 'hour')).add(j, 'hour').format('YYYY-MM-DD HH:00:00');
        let time2 = null;
        if (j !== 0) {
          time2 = (moment(date).subtract(8, 'hour')).add(j - 1, 'hour').format('YYYY-MM-DD HH:00:00');
        }
        for (let o = 0; o < fac2[i].length; o++) {
          const dates = moment(fac2[i][o].operStartTime).format('YYYY-MM-DD HH:mm:ss');
          if (time > dates) {
            if (j !== 0) {
              if (time2 < dates) {
                hour2[i].mSteWkYrdNo[j].push(fac2[i][o]);
              }
            } else {
              hour2[i].mSteWkYrdNo[j].push(fac2[i][o]);
            }
          }
        }
      }
    }

    for (let i = 0; i < fac3.length; i++) {
      let color = null;
      for (let j = 0; j < 25; j++) {
        const time = (moment(date).subtract(8, 'hour')).add(j, 'hour').format('YYYY-MM-DD HH:00:00');
        let time2 = null;
        if (j !== 0) {
          time2 = (moment(date).subtract(8, 'hour')).add(j - 1, 'hour').format('YYYY-MM-DD HH:00:00');
        }
        for (let o = 0; o < fac3[i].length; o++) {
          const dates = moment(fac3[i][o].operStartTime).format('YYYY-MM-DD HH:mm:ss');
          if (fac3[i][o].mcNo === '1') {
            color = '#99BA99';
          } else if (fac3[i][o].mcNo === '2') {
            color = '#FFBAFF';
          }
          fac3[i][o].color = color;
          if (time > dates) {
            if (j !== 0) {
              if (time2 < dates) {
                hour3[i].mSteWkYrdNo[j].push(fac3[i][o]);
              }
            } else {
              hour3[i].mSteWkYrdNo[j].push(fac3[i][o]);
            }
          }
        }
      }
    }

    result = [ hour1, hour2, hour3 ];
    return result;

  }

  static findSecond(data, operFlag, date) {

    let result = [];

    for (let i = 0; i < data.length; i++) {
      data[i].operStartTime = data[i].operStartTime !== undefined ? moment(data[i].operStartTime).format('YYYY-MM-DD HH:mm:ss') : undefined;
      data[i].operEndTime = data[i].operEndTime !== undefined ? moment(data[i].operEndTime).format('YYYY-MM-DD HH:mm:ss') : undefined;
      const per = 100 / 60;
      const operStartTime = moment(data[i].operStartTime).format('mm');
      const leftTime = operStartTime;
      const widthTime = data[i].operEndTime !== undefined ? moment(data[i].operEndTime).diff(data[i].operStartTime, ('minute')) : undefined;
      const left = leftTime * per;
      const width = widthTime * per;
      const text = (data[i].mtlNo).substring(5, 7);
      const colorNo = data[i].mcNo;
      let color = null;
      if (colorNo === '1') {
        color = '#93BAED';
      } else if (colorNo === '2') {
        color = '#BCE67F';
      } else if (colorNo === '3') {
        color = '#EBB488';
      } else if (colorNo === '4') {
        color = '#F2D962';
      }

      data[i].left = left;
      data[i].width = width;
      data[i].text = text;
      data[i].color = color;
    }

    const f11 = data.filter(datas => datas.facOpCdN === '1L1' && datas.opCd === 'Q' && datas.mSteWkYrdNo === '1');
    const f12 = data.filter(datas => datas.facOpCdN === '1L1' && datas.opCd === 'Q' && datas.mSteWkYrdNo === '2');
    const f13 = data.filter(datas => datas.facOpCdN === '1L1' && datas.opCd === 'Q' && datas.mSteWkYrdNo === '3');
    const f14 = data.filter(datas => datas.facOpCdN === '1L1' && datas.opCd === 'R' && datas.mSteWkYrdNo === '1');
    const f15 = data.filter(datas => datas.facOpCdN === '1L1' && datas.opCd === 'R' && datas.mSteWkYrdNo === '2');
    const f16 = data.filter(datas => datas.facOpCdN === '1L1' && datas.opCd === 'R' && datas.mSteWkYrdNo === '3');
    const f17 = data.filter(datas => datas.facOpCdN === '1L1' && datas.opCd === 'T' && datas.mSteWkYrdNo === '1');

    const f21 = data.filter(datas => datas.facOpCdN === '2L1' && datas.opCd === 'Q' && datas.mSteWkYrdNo === '1');
    const f22 = data.filter(datas => datas.facOpCdN === '2L1' && datas.opCd === 'Q' && datas.mSteWkYrdNo === '2');
    const f23 = data.filter(datas => datas.facOpCdN === '2L1' && datas.opCd === 'Q' && datas.mSteWkYrdNo === '3');
    const f24 = data.filter(datas => datas.facOpCdN === '2L1' && datas.opCd === 'Q' && datas.mSteWkYrdNo === '4');
    const f25 = data.filter(datas => datas.facOpCdN === '2L1' && datas.opCd === 'R' && datas.mSteWkYrdNo === '1');
    const f26 = data.filter(datas => datas.facOpCdN === '2L1' && datas.opCd === 'R' && datas.mSteWkYrdNo === '2');
    const f27 = data.filter(datas => datas.facOpCdN === '2L1' && datas.opCd === 'R' && datas.mSteWkYrdNo === '3');
    const f28 = data.filter(datas => datas.facOpCdN === '2L1' && datas.opCd === 'T' && datas.mSteWkYrdNo === '1');

    const f31 = data.filter(datas => datas.facOpCdN === '3L1' && datas.opCd === 'Q' && datas.mSteWkYrdNo === '1');
    const f32 = data.filter(datas => datas.facOpCdN === '3L1' && datas.opCd === 'Q' && datas.mSteWkYrdNo === '2');
    const f33 = data.filter(datas => datas.facOpCdN === '3L1' && datas.opCd === 'R' && datas.mSteWkYrdNo === '1');
    const f34 = data.filter(datas => datas.facOpCdN === '3L1' && datas.opCd === 'R' && datas.mSteWkYrdNo === '2');
    const f35 = data.filter(datas => datas.facOpCdN === '3L1' && datas.opCd === 'T' && datas.mSteWkYrdNo === '1');
    const f36 = data.filter(datas => datas.facOpCdN === '3L1' && datas.opCd === 'T' && datas.mSteWkYrdNo === '2');
    const f37 = [];
    const f38 = [];



    const fac1 = [ f11, f12, f13, f14, f15, f16, f17 ];
    const fac2 = operFlag === '3' ?
      [ f21, f22, f23, f25, f26, f27, f28 ]
      :
      [ f21, f22, f23, f24, f28, f25, f26, f27 ];
    const fac3 = operFlag === '3' ?
      [ f31, f32, f37, f33, f34, f35, f38 ]
      :
      [ f33, f36, f35, f32, f31 ];


    const hour1 = [
      { mSteWkYrdNo: []},
      { mSteWkYrdNo: []},
      { mSteWkYrdNo: []},
      { mSteWkYrdNo: []},
      { mSteWkYrdNo: []},
      { mSteWkYrdNo: []},
      { mSteWkYrdNo: []},
    ];

    const hour2 = operFlag === '3' ?
      [
        { mSteWkYrdNo: []},
        { mSteWkYrdNo: []},
        { mSteWkYrdNo: []},
        { mSteWkYrdNo: []},
        { mSteWkYrdNo: []},
        { mSteWkYrdNo: []},
        { mSteWkYrdNo: []},
      ]
      :
      [
        { mSteWkYrdNo: []},
        { mSteWkYrdNo: []},
        { mSteWkYrdNo: []},
        { mSteWkYrdNo: []},
        { mSteWkYrdNo: []},
        { mSteWkYrdNo: []},
        { mSteWkYrdNo: []},
        { mSteWkYrdNo: []},
      ];

    const hour3 = operFlag === '3' ?
      [
        { mSteWkYrdNo: []},
        { mSteWkYrdNo: []},
        { mSteWkYrdNo: []},
        { mSteWkYrdNo: []},
        { mSteWkYrdNo: []},
        { mSteWkYrdNo: []},
        { mSteWkYrdNo: []},
      ]
      :
      [
        { mSteWkYrdNo: []},
        { mSteWkYrdNo: []},
        { mSteWkYrdNo: []},
        { mSteWkYrdNo: []},
        { mSteWkYrdNo: []},
      ];

    for (let i = 0; i < hour1.length; i++) {
      for (let j = 0; j < 25; j++) {
        hour1[i].mSteWkYrdNo.push([]);
      }
    }

    for (let i = 0; i < hour2.length; i++) {
      for (let j = 0; j < 25; j++) {
        hour2[i].mSteWkYrdNo.push([]);
      }
    }

    for (let i = 0; i < hour3.length; i++) {
      for (let j = 0; j < 25; j++) {
        hour3[i].mSteWkYrdNo.push([]);
      }
    }

    for (let i = 0; i < fac1.length; i++) {
      for (let j = 0; j < 25; j++) {
        const time = (moment(date).subtract(8, 'hour')).add(j, 'hour').format('YYYY-MM-DD HH:00:00');
        let time2 = null;
        if (j !== 0) {
          time2 = (moment(date).subtract(8, 'hour')).add(j - 1, 'hour').format('YYYY-MM-DD HH:00:00');
        }
        for (let o = 0; o < fac1[i].length; o++) {
          const dates = moment(fac1[i][o].operStartTime).format('YYYY-MM-DD HH:mm:ss');
          if (time > dates) {
            if (j !== 0) {
              if (time2 < dates) {
                hour1[i].mSteWkYrdNo[j].push(fac1[i][o]);
              }
            } else {
              hour1[i].mSteWkYrdNo[j].push(fac1[i][o]);
            }
          }

        }
      }
    }

    for (let i = 0; i < fac2.length; i++) {
      for (let j = 0; j < 25; j++) {
        const time = (moment(date).subtract(8, 'hour')).add(j, 'hour').format('YYYY-MM-DD HH:00:00');
        let time2 = null;
        if (j !== 0) {
          time2 = (moment(date).subtract(8, 'hour')).add(j - 1, 'hour').format('YYYY-MM-DD HH:00:00');
        }
        for (let o = 0; o < fac2[i].length; o++) {
          const dates = moment(fac2[i][o].operStartTime).format('YYYY-MM-DD HH:mm:ss');
          if (time > dates) {
            if (j !== 0) {
              if (time2 < dates) {
                hour2[i].mSteWkYrdNo[j].push(fac2[i][o]);
              }
            } else {
              hour2[i].mSteWkYrdNo[j].push(fac2[i][o]);
            }
          }
        }
      }
    }

    for (let i = 0; i < fac3.length; i++) {
      let color = null;
      for (let j = 0; j < 25; j++) {
        const time = (moment(date).subtract(8, 'hour')).add(j, 'hour').format('YYYY-MM-DD HH:00:00');
        let time2 = null;
        if (j !== 0) {
          time2 = (moment(date).subtract(8, 'hour')).add(j - 1, 'hour').format('YYYY-MM-DD HH:00:00');
        }
        for (let o = 0; o < fac3[i].length; o++) {
          const dates = moment(fac3[i][o].operStartTime).format('YYYY-MM-DD HH:mm:ss');
          if (fac3[i][o].mcNo === '1') {
            color = '#99BA99';
          } else if (fac3[i][o].mcNo === '2') {
            color = '#FFBAFF';
          }
          fac3[i][o].color = color;
          if (time > dates) {
            if (j !== 0) {
              if (time2 < dates) {
                hour3[i].mSteWkYrdNo[j].push(fac3[i][o]);
              }
            } else {
              hour3[i].mSteWkYrdNo[j].push(fac3[i][o]);
            }
          }
        }
      }
    }

    result = [ hour1, hour2, hour3 ];
    console.log(result);

    return result;
  }


  static findCast(data, operFlag, date) {

    let result = [];

    for (let i = 0; i < data.length; i++) {
      data[i].operStartTime = data[i].operStartTime !== undefined ? moment(data[i].operStartTime).format('YYYY-MM-DD HH:mm:ss') : undefined;
      data[i].operEndTime = data[i].operEndTime !== undefined ? moment(data[i].operEndTime).format('YYYY-MM-DD HH:mm:ss') : undefined;
      const per = 100 / 60;
      const operStartTime = moment(data[i].operStartTime).format('mm');
      const leftTime = operStartTime;
      const widthTime = data[i].operEndTime !== undefined ? moment(data[i].operEndTime).diff(data[i].operStartTime, ('minute')) : undefined;
      const left = leftTime * per;
      const width = widthTime * per;
      const text = data[i].mtlNo !== undefined ? (data[i].mtlNo).substring(5, 7) : null;
      const colorNo = data[i].mcNo;
      let color = null;
      if (colorNo === '1') {
        color = '#93BAED';
      } else if (colorNo === '2') {
        color = '#BCE67F';
      } else if (colorNo === '3') {
        color = '#EBB488';
      } else if (colorNo === '4') {
        color = '#F2D962';
      }

      data[i].left = left;
      data[i].width = width;
      data[i].text = text;
      data[i].color = color;
    }

    const f11 = data.filter(datas => datas.facOpCdN === '1L1' && datas.mSteWkYrdNo === '1');
    const f12 = data.filter(datas => datas.facOpCdN === '1L1' && datas.mSteWkYrdNo === '2');
    const f13 = data.filter(datas => datas.facOpCdN === '1L1' && datas.mSteWkYrdNo === '3');
    const f14 = data.filter(datas => datas.facOpCdN === '1L1' && datas.mSteWkYrdNo === '4');

    const f21 = data.filter(datas => datas.facOpCdN === '2L1' && datas.mSteWkYrdNo === '1');
    const f22 = data.filter(datas => datas.facOpCdN === '2L1' && datas.mSteWkYrdNo === '2');
    const f23 = data.filter(datas => datas.facOpCdN === '2L1' && datas.mSteWkYrdNo === '3');
    const f24 = data.filter(datas => datas.facOpCdN === '2L1' && datas.mSteWkYrdNo === '4');

    const f31 = data.filter(datas => datas.facOpCdN === '3L1' && datas.mSteWkYrdNo === '1');
    const f32 = data.filter(datas => datas.facOpCdN === '3L1' && datas.mSteWkYrdNo === '2');

    const fac1 = [ f11, f12, f13, f14 ];
    const fac2 = [ f21, f22, f23, f24 ];
    const fac3 = operFlag === '3' ? [ f31, f32 ] : [ f32, f31 ];
    const hour1 = [
      { mSteWkYrdNo: []},
      { mSteWkYrdNo: []},
      { mSteWkYrdNo: []},
      { mSteWkYrdNo: []},
    ];

    const hour2 = [
      { mSteWkYrdNo: []},
      { mSteWkYrdNo: []},
      { mSteWkYrdNo: []},
      { mSteWkYrdNo: []},
    ];

    const hour3 = [
      { mSteWkYrdNo: []},
      { mSteWkYrdNo: []},
    ];

    for (let i = 0; i < hour1.length; i++) {
      for (let j = 0; j < 25; j++) {
        hour1[i].mSteWkYrdNo.push([]);
      }
    }

    for (let i = 0; i < hour2.length; i++) {
      for (let j = 0; j < 25; j++) {
        hour2[i].mSteWkYrdNo.push([]);
      }
    }

    for (let i = 0; i < hour3.length; i++) {
      for (let j = 0; j < 25; j++) {
        hour3[i].mSteWkYrdNo.push([]);
      }
    }

    for (let i = 0; i < fac1.length; i++) {
      for (let j = 0; j < 25; j++) {
        const time = (moment(date).subtract(8, 'hour')).add(j, 'hour').format('YYYY-MM-DD HH:00:00');
        let time2 = null;
        if (j !== 0) {
          time2 = (moment(date).subtract(8, 'hour')).add(j - 1, 'hour').format('YYYY-MM-DD HH:00:00');
        }
        for (let o = 0; o < fac1[i].length; o++) {
          const dates = moment(fac1[i][o].operStartTime).format('YYYY-MM-DD HH:mm:ss');
          if (time > dates) {
            if (j !== 0) {
              if (time2 < dates) {
                hour1[i].mSteWkYrdNo[j].push(fac1[i][o]);
              }
            } else {
              hour1[i].mSteWkYrdNo[j].push(fac1[i][o]);
            }
          }
        }
      }
    }

    for (let i = 0; i < fac2.length; i++) {
      for (let j = 0; j < 25; j++) {
        const time = (moment(date).subtract(8, 'hour')).add(j, 'hour').format('YYYY-MM-DD HH:00:00');
        let time2 = null;
        if (j !== 0) {
          time2 = (moment(date).subtract(8, 'hour')).add(j - 1, 'hour').format('YYYY-MM-DD HH:00:00');
        }
        for (let o = 0; o < fac2[i].length; o++) {
          const dates = moment(fac2[i][o].operStartTime).format('YYYY-MM-DD HH:mm:ss');
          if (time > dates) {
            if (j !== 0) {
              if (time2 < dates) {
                hour2[i].mSteWkYrdNo[j].push(fac2[i][o]);
              }
            } else {
              hour2[i].mSteWkYrdNo[j].push(fac2[i][o]);
            }
          }
        }
      }
    }

    for (let i = 0; i < fac3.length; i++) {
      let color = null;
      for (let j = 0; j < 25; j++) {
        const time = (moment(date).subtract(8, 'hour')).add(j, 'hour').format('YYYY-MM-DD HH:00:00');
        let time2 = null;
        if (j !== 0) {
          time2 = (moment(date).subtract(8, 'hour')).add(j - 1, 'hour').format('YYYY-MM-DD HH:00:00');
        }
        for (let o = 0; o < fac3[i].length; o++) {
          const dates = moment(fac3[i][o].operStartTime).format('YYYY-MM-DD HH:mm:ss');
          if (fac3[i][o].mcNo === '1') {
            color = '#99BA99';
          } else if (fac3[i][o].mcNo === '2') {
            color = '#FFBAFF';
          }
          fac3[i][o].color = color;
          if (time > dates) {
            if (j !== 0) {
              if (time2 < dates) {
                hour3[i].mSteWkYrdNo[j].push(fac3[i][o]);
              }
            } else {
              hour3[i].mSteWkYrdNo[j].push(fac3[i][o]);
            }
          }
        }
      }
    }

    result = [ hour1, hour2, hour3 ];
    return result;

  }

}

export default SteelScheduleMonitoringModel;

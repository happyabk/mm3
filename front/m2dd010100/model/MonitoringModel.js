import { mesAutobind } from '@mes/mes-shared';

@mesAutobind
class MonitoringModel {

  static addComma(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  static findIronChart(responseData, operFlag) {

    let mix = {};
    let bar = [];
    let pie = [];
    let tooltip = [];
    let sum = '';
    let result = [];
    let chk = false;

    if (operFlag === 'C') {

      for (let i = 0; i < responseData.length; i++) {
        if (responseData[i] === null) {
          break;
        } else {
          chk = true;
        }
      }

      if (chk) {
        bar = [
          {
            name: '1고로',
            계획: responseData[0] !== null && responseData[0].formAttrStdDtNmV11 !== null && responseData[0].formAttrStdDtNmV11 !== undefined ? responseData[0].formAttrStdDtNmV11 : 0,
            실적: responseData[1] !== null && responseData[1].formAttrStdDtNmV11 !== null && responseData[1].formAttrStdDtNmV11 !== undefined ? responseData[1].formAttrStdDtNmV11 : 0,
          }, {
            name: '2고로',
            계획: responseData[0] !== null && responseData[0].formAttrStdDtNmV12 !== null && responseData[0].formAttrStdDtNmV12 !== undefined ? responseData[0].formAttrStdDtNmV12 : 0,
            실적: responseData[1] !== null && responseData[1].formAttrStdDtNmV12 !== null && responseData[1].formAttrStdDtNmV12 !== undefined ? responseData[1].formAttrStdDtNmV12 : 0,
          }, {
            name: '3고로',
            계획: responseData[0] !== null && responseData[0].formAttrStdDtNmV13 !== null && responseData[0].formAttrStdDtNmV13 !== undefined ? responseData[0].formAttrStdDtNmV13 : 0,
            실적: responseData[1] !== null && responseData[1].formAttrStdDtNmV13 !== null && responseData[1].formAttrStdDtNmV13 !== undefined ? responseData[1].formAttrStdDtNmV13 : 0,
          }, {
            name: '4고로',
            계획: responseData[0] !== null && responseData[0].formAttrStdDtNmV14 !== null && responseData[0].formAttrStdDtNmV14 !== undefined ? responseData[0].formAttrStdDtNmV14 : 0,
            실적: responseData[1] !== null && responseData[1].formAttrStdDtNmV14 !== null && responseData[1].formAttrStdDtNmV14 !== undefined ? responseData[1].formAttrStdDtNmV14 : 0,
          }, {
            name: '2Finex',
            계획: responseData[0] !== null && responseData[0].formAttrStdDtNmV22 !== null && responseData[0].formAttrStdDtNmV22 !== undefined ? responseData[0].formAttrStdDtNmV22 : 0,
            실적: responseData[1] !== null && responseData[1].formAttrStdDtNmV22 !== null && responseData[1].formAttrStdDtNmV22 !== undefined ? responseData[1].formAttrStdDtNmV22 : 0,
          }, {
            name: '3Finex',
            계획: responseData[0] !== null && responseData[0].formAttrStdDtNmV23 !== null && responseData[0].formAttrStdDtNmV23 !== undefined ? responseData[0].formAttrStdDtNmV23 : 0,
            실적: responseData[1] !== null && responseData[1].formAttrStdDtNmV23 !== null && responseData[1].formAttrStdDtNmV23 !== undefined ? responseData[1].formAttrStdDtNmV23 : 0,
          },
        ];

        tooltip = [
          {
            실적: responseData[5] !== null && responseData[5].formAttrStdDtNmV11 !== null && responseData[5].formAttrStdDtNmV11 !== undefined ? this.addComma(responseData[5].formAttrStdDtNmV11) : 0,
            증감: responseData[6] !== null && responseData[6].formAttrStdDtNmV11 !== null && responseData[6].formAttrStdDtNmV11 !== undefined ? this.addComma(responseData[6].formAttrStdDtNmV11) : 0,
          }, {
            실적: responseData[5] !== null && responseData[5].formAttrStdDtNmV12 !== null && responseData[5].formAttrStdDtNmV12 !== undefined ? this.addComma(responseData[5].formAttrStdDtNmV12) : 0,
            증감: responseData[6] !== null && responseData[6].formAttrStdDtNmV12 !== null && responseData[6].formAttrStdDtNmV12 !== undefined ? this.addComma(responseData[6].formAttrStdDtNmV12) : 0,
          }, {
            실적: responseData[5] !== null && responseData[5].formAttrStdDtNmV13 !== null && responseData[5].formAttrStdDtNmV13 !== undefined ? this.addComma(responseData[5].formAttrStdDtNmV13) : 0,
            증감: responseData[6] !== null && responseData[6].formAttrStdDtNmV13 !== null && responseData[6].formAttrStdDtNmV13 !== undefined ? this.addComma(responseData[6].formAttrStdDtNmV13) : 0,
          }, {
            실적: responseData[5] !== null && responseData[5].formAttrStdDtNmV14 !== null && responseData[5].formAttrStdDtNmV14 !== undefined ? this.addComma(responseData[5].formAttrStdDtNmV14) : 0,
            증감: responseData[6] !== null && responseData[6].formAttrStdDtNmV14 !== null && responseData[6].formAttrStdDtNmV14 !== undefined ? this.addComma(responseData[6].formAttrStdDtNmV14) : 0,
          }, {
            실적: responseData[5] !== null && responseData[5].formAttrStdDtNmV22 !== null && responseData[5].formAttrStdDtNmV22 !== undefined ? this.addComma(responseData[5].formAttrStdDtNmV22) : 0,
            증감: responseData[6] !== null && responseData[6].formAttrStdDtNmV22 !== null && responseData[6].formAttrStdDtNmV22 !== undefined ? this.addComma(responseData[6].formAttrStdDtNmV22) : 0,
          }, {
            실적: responseData[5] !== null && responseData[5].formAttrStdDtNmV23 !== null && responseData[5].formAttrStdDtNmV23 !== undefined ? this.addComma(responseData[5].formAttrStdDtNmV23) : 0,
            증감: responseData[6] !== null && responseData[6].formAttrStdDtNmV23 !== null && responseData[6].formAttrStdDtNmV23 !== undefined ? this.addComma(responseData[6].formAttrStdDtNmV23) : 0,
          },
        ];

        pie = [
          {
            name: '1고로',
            value: responseData[5] !== null && responseData[5].formAttrStdDtNmV11 !== null && responseData[5].formAttrStdDtNmV11 !== undefined ? Number(responseData[5].formAttrStdDtNmV11) : 0,
          }, {
            name: '2고로',
            value: responseData[5] !== null && responseData[5].formAttrStdDtNmV12 !== null && responseData[5].formAttrStdDtNmV12 !== undefined ? Number(responseData[5].formAttrStdDtNmV12) : 0,
          }, {
            name: '3고로',
            value: responseData[5] !== null && responseData[5].formAttrStdDtNmV13 !== null && responseData[5].formAttrStdDtNmV13 !== undefined ? Number(responseData[5].formAttrStdDtNmV13) : 0,
          }, {
            name: '4고로',
            value: responseData[5] !== null && responseData[5].formAttrStdDtNmV14 !== null && responseData[5].formAttrStdDtNmV14 !== undefined ? Number(responseData[5].formAttrStdDtNmV14) : 0,
          }, {
            name: '2Finex',
            value: responseData[5] !== null && responseData[5].formAttrStdDtNmV22 !== null && responseData[5].formAttrStdDtNmV22 !== undefined ? Number(responseData[5].formAttrStdDtNmV22) : 0,
          }, {
            name: '3Finex',
            value: responseData[5] !== null && responseData[5].formAttrStdDtNmV23 !== null && responseData[5].formAttrStdDtNmV23 !== undefined ? Number(responseData[5].formAttrStdDtNmV23) : 0,
          },
        ];

        const sum1 = responseData[5] !== null && responseData[5].formAttrStdDtNmV11 !== null && responseData[5].formAttrStdDtNmV11 !== undefined ? Number(responseData[5].formAttrStdDtNmV11) : 0;
        const sum2 = responseData[5] !== null && responseData[5].formAttrStdDtNmV12 !== null && responseData[5].formAttrStdDtNmV12 !== undefined ? Number(responseData[5].formAttrStdDtNmV12) : 0;
        const sum3 = responseData[5] !== null && responseData[5].formAttrStdDtNmV13 !== null && responseData[5].formAttrStdDtNmV13 !== undefined ? Number(responseData[5].formAttrStdDtNmV13) : 0;
        const sum4 = responseData[5] !== null && responseData[5].formAttrStdDtNmV14 !== null && responseData[5].formAttrStdDtNmV14 !== undefined ? Number(responseData[5].formAttrStdDtNmV14) : 0;
        const sum5 = responseData[5] !== null && responseData[5].formAttrStdDtNmV22 !== null && responseData[5].formAttrStdDtNmV22 !== undefined ? Number(responseData[5].formAttrStdDtNmV22) : 0;
        const sum6 = responseData[5] !== null && responseData[5].formAttrStdDtNmV23 !== null && responseData[5].formAttrStdDtNmV23 !== undefined ? Number(responseData[5].formAttrStdDtNmV23) : 0;

        sum = ( sum1 + sum2 + sum3 + sum4 + sum5 + sum6 );

        sum = this.addComma(sum);

        result = [
          {
            formAttrStdDtNmV11: responseData[3] !== null && responseData[3].formAttrStdDtNmV11 !== null && responseData[3].formAttrStdDtNmV11 !== undefined ? this.addComma(responseData[3].formAttrStdDtNmV11) : 0,
            formAttrStdDtNmV12: responseData[3] !== null && responseData[3].formAttrStdDtNmV12 !== null && responseData[3].formAttrStdDtNmV12 !== undefined ? this.addComma(responseData[3].formAttrStdDtNmV12) : 0,
            formAttrStdDtNmV13: responseData[3] !== null && responseData[3].formAttrStdDtNmV13 !== null && responseData[3].formAttrStdDtNmV13 !== undefined ? this.addComma(responseData[3].formAttrStdDtNmV13) : 0,
            formAttrStdDtNmV14: responseData[3] !== null && responseData[3].formAttrStdDtNmV14 !== null && responseData[3].formAttrStdDtNmV14 !== undefined ? this.addComma(responseData[3].formAttrStdDtNmV14) : 0,
            formAttrStdDtNmV22: responseData[3] !== null && responseData[3].formAttrStdDtNmV22 !== null && responseData[3].formAttrStdDtNmV22 !== undefined ? this.addComma(responseData[3].formAttrStdDtNmV22) : 0,
            formAttrStdDtNmV23: responseData[3] !== null && responseData[3].formAttrStdDtNmV23 !== null && responseData[3].formAttrStdDtNmV23 !== undefined ? this.addComma(responseData[3].formAttrStdDtNmV23) : 0,
          }, {
            formAttrStdDtNmV11: responseData[4] !== null && responseData[4].formAttrStdDtNmV11 !== null && responseData[4].formAttrStdDtNmV11 !== undefined ? this.addComma(Math.round(responseData[4].formAttrStdDtNmV11)) : 0,
            formAttrStdDtNmV12: responseData[4] !== null && responseData[4].formAttrStdDtNmV12 !== null && responseData[4].formAttrStdDtNmV12 !== undefined ? this.addComma(Math.round(responseData[4].formAttrStdDtNmV12)) : 0,
            formAttrStdDtNmV13: responseData[4] !== null && responseData[4].formAttrStdDtNmV13 !== null && responseData[4].formAttrStdDtNmV13 !== undefined ? this.addComma(Math.round(responseData[4].formAttrStdDtNmV13)) : 0,
            formAttrStdDtNmV14: responseData[4] !== null && responseData[4].formAttrStdDtNmV14 !== null && responseData[4].formAttrStdDtNmV14 !== undefined ? this.addComma(Math.round(responseData[4].formAttrStdDtNmV14)) : 0,
            formAttrStdDtNmV22: responseData[4] !== null && responseData[4].formAttrStdDtNmV22 !== null && responseData[4].formAttrStdDtNmV22 !== undefined ? this.addComma(Math.round(responseData[4].formAttrStdDtNmV22)) : 0,
            formAttrStdDtNmV23: responseData[4] !== null && responseData[4].formAttrStdDtNmV23 !== null && responseData[4].formAttrStdDtNmV23 !== undefined ? this.addComma(Math.round(responseData[4].formAttrStdDtNmV23)) : 0,
          },
        ];
      } else {

        result = [
          {
            formAttrStdDtNmV11: 0,
            formAttrStdDtNmV12: 0,
            formAttrStdDtNmV13: 0,
            formAttrStdDtNmV14: 0,
            formAttrStdDtNmV22: 0,
            formAttrStdDtNmV23: 0,
          }, {
            formAttrStdDtNmV11: 0,
            formAttrStdDtNmV12: 0,
            formAttrStdDtNmV13: 0,
            formAttrStdDtNmV14: 0,
            formAttrStdDtNmV22: 0,
            formAttrStdDtNmV23: 0,
          },
        ];
      }
      mix = { bar, pie, sum, result, tooltip };
    } else {
      for (let i = 0; i < responseData.length; i++) {
        if (responseData[i] === null) {
          break;
        } else {
          chk = true;
        }
      }

      if (chk) {
        bar = [
          {
            name: '1고로',
            계획: responseData[0] !== null && responseData[0].formAttrStdDtNmV11 !== null && responseData[0].formAttrStdDtNmV11 !== undefined ? responseData[0].formAttrStdDtNmV11 : 0,
            실적: responseData[1] !== null && responseData[1].formAttrStdDtNmV11 !== null && responseData[1].formAttrStdDtNmV11 !== undefined ? responseData[1].formAttrStdDtNmV11 : 0,
          }, {
            name: '2고로',
            계획: responseData[0] !== null && responseData[0].formAttrStdDtNmV12 !== null && responseData[0].formAttrStdDtNmV12 !== undefined ? responseData[0].formAttrStdDtNmV12 : 0,
            실적: responseData[1] !== null && responseData[1].formAttrStdDtNmV12 !== null && responseData[1].formAttrStdDtNmV12 !== undefined ? responseData[1].formAttrStdDtNmV12 : 0,
          }, {
            name: '3고로',
            계획: responseData[0] !== null && responseData[0].formAttrStdDtNmV13 !== null && responseData[0].formAttrStdDtNmV13 !== undefined ? responseData[0].formAttrStdDtNmV13 : 0,
            실적: responseData[1] !== null && responseData[1].formAttrStdDtNmV13 !== null && responseData[1].formAttrStdDtNmV13 !== undefined ? responseData[1].formAttrStdDtNmV13 : 0,
          }, {
            name: '4고로',
            계획: responseData[0] !== null && responseData[0].formAttrStdDtNmV14 !== null && responseData[0].formAttrStdDtNmV14 !== undefined ? responseData[0].formAttrStdDtNmV14 : 0,
            실적: responseData[1] !== null && responseData[1].formAttrStdDtNmV14 !== null && responseData[1].formAttrStdDtNmV14 !== undefined ? responseData[1].formAttrStdDtNmV14 : 0,
          }, {
            name: '5고로',
            계획: responseData[0] !== null && responseData[0].formAttrStdDtNmV15 !== null && responseData[0].formAttrStdDtNmV15 !== undefined ? responseData[0].formAttrStdDtNmV15 : 0,
            실적: responseData[1] !== null && responseData[1].formAttrStdDtNmV15 !== null && responseData[1].formAttrStdDtNmV15 !== undefined ? responseData[1].formAttrStdDtNmV15 : 0,
          },
        ];

        tooltip = [
          {
            실적: responseData[5] !== null && responseData[5].formAttrStdDtNmV11 !== null && responseData[5].formAttrStdDtNmV11 !== undefined ? this.addComma(responseData[5].formAttrStdDtNmV11) : 0,
            증감: responseData[6] !== null && responseData[6].formAttrStdDtNmV11 !== null && responseData[6].formAttrStdDtNmV11 !== undefined ? this.addComma(responseData[6].formAttrStdDtNmV11) : 0,
          }, {
            실적: responseData[5] !== null && responseData[5].formAttrStdDtNmV12 !== null && responseData[5].formAttrStdDtNmV12 !== undefined ? this.addComma(responseData[5].formAttrStdDtNmV12) : 0,
            증감: responseData[6] !== null && responseData[6].formAttrStdDtNmV12 !== null && responseData[6].formAttrStdDtNmV12 !== undefined ? this.addComma(responseData[6].formAttrStdDtNmV12) : 0,
          }, {
            실적: responseData[5] !== null && responseData[5].formAttrStdDtNmV13 !== null && responseData[5].formAttrStdDtNmV13 !== undefined ? this.addComma(responseData[5].formAttrStdDtNmV13) : 0,
            증감: responseData[6] !== null && responseData[6].formAttrStdDtNmV13 !== null && responseData[6].formAttrStdDtNmV13 !== undefined ? this.addComma(responseData[6].formAttrStdDtNmV13) : 0,
          }, {
            실적: responseData[5] !== null && responseData[5].formAttrStdDtNmV14 !== null && responseData[5].formAttrStdDtNmV14 !== undefined ? this.addComma(responseData[5].formAttrStdDtNmV14) : 0,
            증감: responseData[6] !== null && responseData[6].formAttrStdDtNmV14 !== null && responseData[6].formAttrStdDtNmV14 !== undefined ? this.addComma(responseData[6].formAttrStdDtNmV14) : 0,
          }, {
            실적: responseData[5] !== null && responseData[5].formAttrStdDtNmV15 !== null && responseData[5].formAttrStdDtNmV15 !== undefined ? this.addComma(responseData[5].formAttrStdDtNmV15) : 0,
            증감: responseData[6] !== null && responseData[6].formAttrStdDtNmV15 !== null && responseData[6].formAttrStdDtNmV15 !== undefined ? this.addComma(responseData[6].formAttrStdDtNmV15) : 0,
          },
        ];

        pie = [
          {
            name: '1고로',
            value: responseData[5] !== null && responseData[5].formAttrStdDtNmV11 !== null && responseData[5].formAttrStdDtNmV11 !== undefined ? Number(responseData[5].formAttrStdDtNmV11) : 0,
            fill: '#f9c00c',
          }, {
            name: '2고로',
            value: responseData[5] !== null && responseData[5].formAttrStdDtNmV12 !== null && responseData[5].formAttrStdDtNmV12 !== undefined ? Number(responseData[5].formAttrStdDtNmV12) : 0,
            fill: '#00b9f1',
          }, {
            name: '3고로',
            value: responseData[5] !== null && responseData[5].formAttrStdDtNmV13 !== null && responseData[5].formAttrStdDtNmV13 !== undefined ? Number(responseData[5].formAttrStdDtNmV13) : 0,
            fill: '#7200da',
          }, {
            name: '4고로',
            value: responseData[5] !== null && responseData[5].formAttrStdDtNmV14 !== null && responseData[5].formAttrStdDtNmV14 !== undefined ? Number(responseData[5].formAttrStdDtNmV14) : 0,
            fill: '#f9320c',
          }, {
            name: '5고로',
            value: responseData[5] !== null && responseData[5].formAttrStdDtNmV15 !== null && responseData[5].formAttrStdDtNmV15 !== undefined ? Number(responseData[5].formAttrStdDtNmV15) : 0,
            fill: '#ef5285',
          },
        ];

        const sum1 = responseData[5] !== null && responseData[5].formAttrStdDtNmV11 !== null && responseData[5].formAttrStdDtNmV11 !== undefined ? Number(responseData[5].formAttrStdDtNmV11) : 0;
        const sum2 = responseData[5] !== null && responseData[5].formAttrStdDtNmV12 !== null && responseData[5].formAttrStdDtNmV12 !== undefined ? Number(responseData[5].formAttrStdDtNmV12) : 0;
        const sum3 = responseData[5] !== null && responseData[5].formAttrStdDtNmV13 !== null && responseData[5].formAttrStdDtNmV13 !== undefined ? Number(responseData[5].formAttrStdDtNmV13) : 0;
        const sum4 = responseData[5] !== null && responseData[5].formAttrStdDtNmV14 !== null && responseData[5].formAttrStdDtNmV14 !== undefined ? Number(responseData[5].formAttrStdDtNmV14) : 0;
        const sum5 = responseData[5] !== null && responseData[5].formAttrStdDtNmV15 !== null && responseData[5].formAttrStdDtNmV15 !== undefined ? Number(responseData[5].formAttrStdDtNmV15) : 0;

        sum = ( sum1 + sum2 + sum3 + sum4 + sum5 );

        sum = this.addComma(sum);

        result = [
          {
            formAttrStdDtNmV11: responseData[3] !== null && responseData[3].formAttrStdDtNmV11 !== null && responseData[3].formAttrStdDtNmV11 !== undefined ? this.addComma(responseData[3].formAttrStdDtNmV11) : 0,
            formAttrStdDtNmV12: responseData[3] !== null && responseData[3].formAttrStdDtNmV12 !== null && responseData[3].formAttrStdDtNmV12 !== undefined ? this.addComma(responseData[3].formAttrStdDtNmV12) : 0,
            formAttrStdDtNmV13: responseData[3] !== null && responseData[3].formAttrStdDtNmV13 !== null && responseData[3].formAttrStdDtNmV13 !== undefined ? this.addComma(responseData[3].formAttrStdDtNmV13) : 0,
            formAttrStdDtNmV14: responseData[3] !== null && responseData[3].formAttrStdDtNmV14 !== null && responseData[3].formAttrStdDtNmV14 !== undefined ? this.addComma(responseData[3].formAttrStdDtNmV14) : 0,
            formAttrStdDtNmV15: responseData[3] !== null && responseData[3].formAttrStdDtNmV15 !== null && responseData[3].formAttrStdDtNmV15 !== undefined ? this.addComma(responseData[3].formAttrStdDtNmV15) : 0,
          }, {
            formAttrStdDtNmV11: responseData[4] !== null && responseData[4].formAttrStdDtNmV11 !== null && responseData[4].formAttrStdDtNmV11 !== undefined ? this.addComma(Math.round(responseData[4].formAttrStdDtNmV11)) : 0,
            formAttrStdDtNmV12: responseData[4] !== null && responseData[4].formAttrStdDtNmV12 !== null && responseData[4].formAttrStdDtNmV12 !== undefined ? this.addComma(Math.round(responseData[4].formAttrStdDtNmV12)) : 0,
            formAttrStdDtNmV13: responseData[4] !== null && responseData[4].formAttrStdDtNmV13 !== null && responseData[4].formAttrStdDtNmV13 !== undefined ? this.addComma(Math.round(responseData[4].formAttrStdDtNmV13)) : 0,
            formAttrStdDtNmV14: responseData[4] !== null && responseData[4].formAttrStdDtNmV14 !== null && responseData[4].formAttrStdDtNmV14 !== undefined ? this.addComma(Math.round(responseData[4].formAttrStdDtNmV14)) : 0,
            formAttrStdDtNmV15: responseData[4] !== null && responseData[4].formAttrStdDtNmV15 !== null && responseData[4].formAttrStdDtNmV15 !== undefined ? this.addComma(Math.round(responseData[4].formAttrStdDtNmV15)) : 0,
          },
        ];
      } else {

        result = [
          {
            formAttrStdDtNmV11: 0,
            formAttrStdDtNmV12: 0,
            formAttrStdDtNmV13: 0,
            formAttrStdDtNmV14: 0,
            formAttrStdDtNmV15: 0,
          }, {
            formAttrStdDtNmV11: 0,
            formAttrStdDtNmV12: 0,
            formAttrStdDtNmV13: 0,
            formAttrStdDtNmV14: 0,
            formAttrStdDtNmV15: 0,
          },
        ];
      }
      mix = { bar, pie, sum, result, tooltip };
    }

    return mix;
  }

  static findSteelData(responseData, operFlag) {
    let result = [];

    if (operFlag === 'C') {
      result = [
        {
          formAttrStdDtNmV11: responseData[6].formAttrStdDtNmV11 !== null && responseData[6].formAttrStdDtNmV11 !== undefined ? Math.round((responseData[6].formAttrStdDtNmV11)) : 0,
          formAttrStdDtNmV25: responseData[6].formAttrStdDtNmV25 !== null && responseData[6].formAttrStdDtNmV25 !== undefined ? Math.round((responseData[6].formAttrStdDtNmV25)) : 0,
          formAttrStdDtNmV35: responseData[6].formAttrStdDtNmV35 !== null && responseData[6].formAttrStdDtNmV35 !== undefined ? Math.round((responseData[6].formAttrStdDtNmV35)) : 0,
        }, {
          formAttrStdDtNmV11: responseData[8].formAttrStdDtNmV11 !== null && responseData[8].formAttrStdDtNmV11 !== undefined ? Math.round(responseData[8].formAttrStdDtNmV11) : 0,
          formAttrStdDtNmV25: responseData[8].formAttrStdDtNmV25 !== null && responseData[8].formAttrStdDtNmV25 !== undefined ? Math.round(responseData[8].formAttrStdDtNmV25) : 0,
          formAttrStdDtNmV35: responseData[8].formAttrStdDtNmV35 !== null && responseData[8].formAttrStdDtNmV35 !== undefined ? Math.round(responseData[8].formAttrStdDtNmV35) : 0,
        }, {
          formAttrStdDtNmV11: responseData[5].formAttrStdDtNmV11 !== null && responseData[5].formAttrStdDtNmV11 !== undefined ? Math.round(responseData[5].formAttrStdDtNmV11) : 0,
          formAttrStdDtNmV25: responseData[5].formAttrStdDtNmV25 !== null && responseData[5].formAttrStdDtNmV25 !== undefined ? Math.round(responseData[5].formAttrStdDtNmV25) : 0,
          formAttrStdDtNmV35: responseData[5].formAttrStdDtNmV35 !== null && responseData[5].formAttrStdDtNmV35 !== undefined ? Math.round(responseData[5].formAttrStdDtNmV35) : 0,
        }, {
          formAttrStdDtNmV11: responseData[14].formAttrStdDtNmV11 !== null && responseData[14].formAttrStdDtNmV11 !== undefined ? this.addComma(Math.round(responseData[14].formAttrStdDtNmV11)) : 0,
          formAttrStdDtNmV25: responseData[14].formAttrStdDtNmV25 !== null && responseData[14].formAttrStdDtNmV25 !== undefined ? this.addComma(Math.round(responseData[14].formAttrStdDtNmV25)) : 0,
          formAttrStdDtNmV35: responseData[14].formAttrStdDtNmV35 !== null && responseData[14].formAttrStdDtNmV35 !== undefined ? this.addComma(Math.round(responseData[14].formAttrStdDtNmV35)) : 0,
        }, {
          formAttrStdDtNmV11: responseData[15].formAttrStdDtNmV11 !== null && responseData[15].formAttrStdDtNmV11 !== undefined ? Math.round(responseData[15].formAttrStdDtNmV11) : 0,
          formAttrStdDtNmV25: responseData[15].formAttrStdDtNmV25 !== null && responseData[15].formAttrStdDtNmV25 !== undefined ? Math.round(responseData[15].formAttrStdDtNmV25) : 0,
          formAttrStdDtNmV35: responseData[15].formAttrStdDtNmV35 !== null && responseData[15].formAttrStdDtNmV35 !== undefined ? Math.round(responseData[15].formAttrStdDtNmV35) : 0,
        }, {
          formAttrStdDtNmV11: responseData[18].formAttrStdDtNmV11 !== null && responseData[18].formAttrStdDtNmV11 !== undefined ? Number(responseData[18].formAttrStdDtNmV11).toFixed(1) : 0,
          formAttrStdDtNmV25: responseData[18].formAttrStdDtNmV25 !== null && responseData[18].formAttrStdDtNmV25 !== undefined ? Number(responseData[18].formAttrStdDtNmV25).toFixed(1) : 0,
          formAttrStdDtNmV35: responseData[18].formAttrStdDtNmV35 !== null && responseData[18].formAttrStdDtNmV35 !== undefined ? Number(responseData[18].formAttrStdDtNmV35).toFixed(1) : 0,
        }, {
          formAttrStdDtNmV11: responseData[17].formAttrStdDtNmV11 !== null && responseData[17].formAttrStdDtNmV11 !== undefined ? Number(responseData[17].formAttrStdDtNmV11).toFixed(1) : 0,
          formAttrStdDtNmV25: responseData[17].formAttrStdDtNmV25 !== null && responseData[17].formAttrStdDtNmV25 !== undefined ? Number(responseData[17].formAttrStdDtNmV25).toFixed(1) : 0,
          formAttrStdDtNmV35: responseData[17].formAttrStdDtNmV35 !== null && responseData[17].formAttrStdDtNmV35 !== undefined ? Number(responseData[17].formAttrStdDtNmV35).toFixed(1) : 0,
        },
      ];
    } else {
      result = [
        {
          formAttrStdDtNmV11: responseData[6].formAttrStdDtNmV11 !== null && responseData[6].formAttrStdDtNmV11 !== undefined ? Math.round((responseData[6].formAttrStdDtNmV11)) : 0,
          formAttrStdDtNmV25: responseData[6].formAttrStdDtNmV25 !== null && responseData[6].formAttrStdDtNmV25 !== undefined ? Math.round((responseData[6].formAttrStdDtNmV25)) : 0,
          formAttrStdDtNmV35: responseData[6].formAttrStdDtNmV35 !== null && responseData[6].formAttrStdDtNmV35 !== undefined ? Math.round((responseData[6].formAttrStdDtNmV35)) : 0,
        }, {
          formAttrStdDtNmV11: responseData[8].formAttrStdDtNmV11 !== null && responseData[8].formAttrStdDtNmV11 !== undefined ? Math.round(responseData[8].formAttrStdDtNmV11) : 0,
          formAttrStdDtNmV25: responseData[8].formAttrStdDtNmV25 !== null && responseData[8].formAttrStdDtNmV25 !== undefined ? Math.round(responseData[8].formAttrStdDtNmV25) : 0,
          formAttrStdDtNmV35: responseData[8].formAttrStdDtNmV35 !== null && responseData[8].formAttrStdDtNmV35 !== undefined ? Math.round(responseData[8].formAttrStdDtNmV35) : 0,
        }, {
          formAttrStdDtNmV11: responseData[5].formAttrStdDtNmV11 !== null && responseData[5].formAttrStdDtNmV11 !== undefined ? Math.round(responseData[5].formAttrStdDtNmV11) : 0,
          formAttrStdDtNmV25: responseData[5].formAttrStdDtNmV25 !== null && responseData[5].formAttrStdDtNmV25 !== undefined ? Math.round(responseData[5].formAttrStdDtNmV25) : 0,
          formAttrStdDtNmV35: responseData[5].formAttrStdDtNmV35 !== null && responseData[5].formAttrStdDtNmV35 !== undefined ? Math.round(responseData[5].formAttrStdDtNmV35) : 0,
        }, {
          formAttrStdDtNmV11: responseData[14].formAttrStdDtNmV11 !== null && responseData[14].formAttrStdDtNmV11 !== undefined ? this.addComma(Math.round(responseData[14].formAttrStdDtNmV11)) : 0,
          formAttrStdDtNmV25: responseData[14].formAttrStdDtNmV25 !== null && responseData[14].formAttrStdDtNmV25 !== undefined ? this.addComma(Math.round(responseData[14].formAttrStdDtNmV25)) : 0,
          formAttrStdDtNmV35: responseData[14].formAttrStdDtNmV35 !== null && responseData[14].formAttrStdDtNmV35 !== undefined ? this.addComma(Math.round(responseData[14].formAttrStdDtNmV35)) : 0,
        }, {
          formAttrStdDtNmV11: responseData[15].formAttrStdDtNmV11 !== null && responseData[15].formAttrStdDtNmV11 !== undefined ? Math.round(responseData[15].formAttrStdDtNmV11) : 0,
          formAttrStdDtNmV25: responseData[15].formAttrStdDtNmV25 !== null && responseData[15].formAttrStdDtNmV25 !== undefined ? Math.round(responseData[15].formAttrStdDtNmV25) : 0,
          formAttrStdDtNmV35: responseData[15].formAttrStdDtNmV35 !== null && responseData[15].formAttrStdDtNmV35 !== undefined ? Math.round(responseData[15].formAttrStdDtNmV35) : 0,
        }, {
          formAttrStdDtNmV11: responseData[18].formAttrStdDtNmV11 !== null && responseData[18].formAttrStdDtNmV11 !== undefined ? Number(responseData[18].formAttrStdDtNmV11).toFixed(1) : 0,
          formAttrStdDtNmV25: responseData[18].formAttrStdDtNmV25 !== null && responseData[18].formAttrStdDtNmV25 !== undefined ? Number(responseData[18].formAttrStdDtNmV25).toFixed(1) : 0,
          formAttrStdDtNmV35: responseData[18].formAttrStdDtNmV35 !== null && responseData[18].formAttrStdDtNmV35 !== undefined ? Number(responseData[18].formAttrStdDtNmV35).toFixed(1) : 0,
        }, {
          formAttrStdDtNmV11: responseData[17].formAttrStdDtNmV11 !== null && responseData[17].formAttrStdDtNmV11 !== undefined ? Number(responseData[17].formAttrStdDtNmV11).toFixed(1) : 0,
          formAttrStdDtNmV25: responseData[17].formAttrStdDtNmV25 !== null && responseData[17].formAttrStdDtNmV25 !== undefined ? Number(responseData[17].formAttrStdDtNmV25).toFixed(1) : 0,
          formAttrStdDtNmV35: responseData[17].formAttrStdDtNmV35 !== null && responseData[17].formAttrStdDtNmV35 !== undefined ? Number(responseData[17].formAttrStdDtNmV35).toFixed(1) : 0,
        },
      ];
    }

    return result;
  }

  static findCastData(responseData, operFlag) {
    let result = [];

    if (operFlag === 'C') {
      result = [
        {
          formAttrStdDtNmV14: responseData[6].formAttrStdDtNmV14 !== null && responseData[6].formAttrStdDtNmV14 !== undefined ? Math.round((responseData[6].formAttrStdDtNmV14)) : 0,
          formAttrStdDtNmV12: responseData[6].formAttrStdDtNmV12 !== null && responseData[6].formAttrStdDtNmV12 !== undefined ? Math.round((responseData[6].formAttrStdDtNmV12)) : 0,
          formAttrStdDtNmV13: responseData[6].formAttrStdDtNmV13 !== null && responseData[6].formAttrStdDtNmV13 !== undefined ? Math.round((responseData[6].formAttrStdDtNmV13)) : 0,
          formAttrStdDtNmV35: responseData[6].formAttrStdDtNmV35 !== null && responseData[6].formAttrStdDtNmV35 !== undefined ? Math.round((responseData[6].formAttrStdDtNmV35)) : 0,
        }, {
          formAttrStdDtNmV14: responseData[8].formAttrStdDtNmV14 !== null && responseData[8].formAttrStdDtNmV14 !== undefined ? Math.round(responseData[8].formAttrStdDtNmV14) : 0,
          formAttrStdDtNmV12: responseData[8].formAttrStdDtNmV12 !== null && responseData[8].formAttrStdDtNmV12 !== undefined ? Math.round(responseData[8].formAttrStdDtNmV12) : 0,
          formAttrStdDtNmV13: responseData[8].formAttrStdDtNmV13 !== null && responseData[8].formAttrStdDtNmV13 !== undefined ? Math.round(responseData[8].formAttrStdDtNmV13) : 0,
          formAttrStdDtNmV35: responseData[8].formAttrStdDtNmV35 !== null && responseData[8].formAttrStdDtNmV35 !== undefined ? Math.round(responseData[8].formAttrStdDtNmV35) : 0,
        }, {
          formAttrStdDtNmV14: responseData[5].formAttrStdDtNmV14 !== null && responseData[5].formAttrStdDtNmV14 !== undefined ? Math.round(responseData[5].formAttrStdDtNmV14) : 0,
          formAttrStdDtNmV12: responseData[5].formAttrStdDtNmV12 !== null && responseData[5].formAttrStdDtNmV12 !== undefined ? Math.round(responseData[5].formAttrStdDtNmV12) : 0,
          formAttrStdDtNmV13: responseData[5].formAttrStdDtNmV13 !== null && responseData[5].formAttrStdDtNmV13 !== undefined ? Math.round(responseData[5].formAttrStdDtNmV13) : 0,
          formAttrStdDtNmV35: responseData[5].formAttrStdDtNmV35 !== null && responseData[5].formAttrStdDtNmV35 !== undefined ? Math.round(responseData[5].formAttrStdDtNmV35) : 0,
        }, {
          formAttrStdDtNmV14: responseData[21].formAttrStdDtNmV14 !== null && responseData[21].formAttrStdDtNmV14 !== undefined ? Number(responseData[21].formAttrStdDtNmV14).toFixed(1) : 0,
          formAttrStdDtNmV12: responseData[21].formAttrStdDtNmV12 !== null && responseData[21].formAttrStdDtNmV12 !== undefined ? Number(responseData[21].formAttrStdDtNmV12).toFixed(1) : 0,
          formAttrStdDtNmV13: responseData[21].formAttrStdDtNmV13 !== null && responseData[21].formAttrStdDtNmV13 !== undefined ? Number(responseData[21].formAttrStdDtNmV13).toFixed(1) : 0,
          formAttrStdDtNmV35: responseData[21].formAttrStdDtNmV35 !== null && responseData[21].formAttrStdDtNmV35 !== undefined ? Number(responseData[21].formAttrStdDtNmV35).toFixed(1) : 0,
        }, {
          formAttrStdDtNmV14: responseData[23].formAttrStdDtNmV14 !== null && responseData[23].formAttrStdDtNmV14 !== undefined ? Number(responseData[23].formAttrStdDtNmV14).toFixed(1) : 0,
          formAttrStdDtNmV12: responseData[23].formAttrStdDtNmV12 !== null && responseData[23].formAttrStdDtNmV12 !== undefined ? Number(responseData[23].formAttrStdDtNmV12).toFixed(1) : 0,
          formAttrStdDtNmV13: responseData[23].formAttrStdDtNmV13 !== null && responseData[23].formAttrStdDtNmV13 !== undefined ? Number(responseData[23].formAttrStdDtNmV13).toFixed(1) : 0,
          formAttrStdDtNmV35: responseData[23].formAttrStdDtNmV35 !== null && responseData[23].formAttrStdDtNmV35 !== undefined ? Number(responseData[23].formAttrStdDtNmV35).toFixed(1) : 0,
        },
      ];
    } else {
      result = [
        {
          formAttrStdDtNmV14: responseData[6].formAttrStdDtNmV14 !== null && responseData[6].formAttrStdDtNmV14 !== undefined ? Math.round((responseData[6].formAttrStdDtNmV14)) : 0,
          formAttrStdDtNmV12: responseData[6].formAttrStdDtNmV12 !== null && responseData[6].formAttrStdDtNmV12 !== undefined ? Math.round((responseData[6].formAttrStdDtNmV12)) : 0,
          formAttrStdDtNmV13: responseData[6].formAttrStdDtNmV13 !== null && responseData[6].formAttrStdDtNmV13 !== undefined ? Math.round((responseData[6].formAttrStdDtNmV13)) : 0,
        }, {
          formAttrStdDtNmV14: responseData[8].formAttrStdDtNmV14 !== null && responseData[8].formAttrStdDtNmV14 !== undefined ? Math.round(responseData[8].formAttrStdDtNmV14) : 0,
          formAttrStdDtNmV12: responseData[8].formAttrStdDtNmV12 !== null && responseData[8].formAttrStdDtNmV12 !== undefined ? Math.round(responseData[8].formAttrStdDtNmV12) : 0,
          formAttrStdDtNmV13: responseData[8].formAttrStdDtNmV13 !== null && responseData[8].formAttrStdDtNmV13 !== undefined ? Math.round(responseData[8].formAttrStdDtNmV13) : 0,
        }, {
          formAttrStdDtNmV14: responseData[5].formAttrStdDtNmV14 !== null && responseData[5].formAttrStdDtNmV14 !== undefined ? Math.round(responseData[5].formAttrStdDtNmV14) : 0,
          formAttrStdDtNmV12: responseData[5].formAttrStdDtNmV12 !== null && responseData[5].formAttrStdDtNmV12 !== undefined ? Math.round(responseData[5].formAttrStdDtNmV12) : 0,
          formAttrStdDtNmV13: responseData[5].formAttrStdDtNmV13 !== null && responseData[5].formAttrStdDtNmV13 !== undefined ? Math.round(responseData[5].formAttrStdDtNmV13) : 0,
        }, {
          formAttrStdDtNmV14: responseData[21].formAttrStdDtNmV14 !== null && responseData[21].formAttrStdDtNmV14 !== undefined ? Number(responseData[21].formAttrStdDtNmV14).toFixed(1) : 0,
          formAttrStdDtNmV12: responseData[21].formAttrStdDtNmV12 !== null && responseData[21].formAttrStdDtNmV12 !== undefined ? Number(responseData[21].formAttrStdDtNmV12).toFixed(1) : 0,
          formAttrStdDtNmV13: responseData[21].formAttrStdDtNmV13 !== null && responseData[21].formAttrStdDtNmV13 !== undefined ? Number(responseData[21].formAttrStdDtNmV13).toFixed(1) : 0,
        }, {
          formAttrStdDtNmV14: responseData[23].formAttrStdDtNmV14 !== null && responseData[23].formAttrStdDtNmV14 !== undefined ? Number(responseData[23].formAttrStdDtNmV14).toFixed(1) : 0,
          formAttrStdDtNmV12: responseData[23].formAttrStdDtNmV12 !== null && responseData[23].formAttrStdDtNmV12 !== undefined ? Number(responseData[23].formAttrStdDtNmV12).toFixed(1) : 0,
          formAttrStdDtNmV13: responseData[23].formAttrStdDtNmV13 !== null && responseData[23].formAttrStdDtNmV13 !== undefined ? Number(responseData[23].formAttrStdDtNmV13).toFixed(1) : 0,
        },
      ];
    }
    return result;
  }
}

export default MonitoringModel;

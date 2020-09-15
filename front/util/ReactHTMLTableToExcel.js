import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Button } from '@mes/mes-ui-react';

// const propTypes = {
//   table: PropTypes.array.isRequired,
//   filename: PropTypes.string.isRequired,
//   sheet: PropTypes.string.isRequired,
//   id: PropTypes.string,
//   className: PropTypes.string,
//   buttonText: PropTypes.string,
// };

// const defaultProps = {
//   id: 'button-download-as-xls',
//   className: 'button-download',
//   buttonText: 'Download',
// };

class ReactHTMLTableToExcel extends Component {
  constructor(props) {
    super(props);
    this.handleDownloadBefore = this.handleDownloadBefore.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
  }

  base64 = (s) => window.btoa(unescape(encodeURIComponent(s)));
  format = (s, c) => s.replace(/{(\w+)}/g, (m, p) => c[p]);

  inputTagDelete(e) {
    const element = document.getElementById(e);
    const parent = element.parentNode;
    const family = [];
    family.push(element);
    family.push(parent);
    parent.removeChild(element);
    return family;
  }

  handleDownloadBefore() {
    const txt1 = this.inputTagDelete('txt1');
    const txt2 = this.inputTagDelete('txt2');
    const txt3 = this.inputTagDelete('txt3');

    const txt4 = this.inputTagDelete('chkz1');
    const txt5 = this.inputTagDelete('chkz2');
    const txt6 = this.inputTagDelete('chkz3');

    const txt7 = this.inputTagDelete('txta1');
    const txt8 = this.inputTagDelete('txta2');
    const txt9 = this.inputTagDelete('txta3');
    const txt10 = this.inputTagDelete('txta4');
    const txt11 = this.inputTagDelete('txta5');
    this.handleDownload();
    txt1[1].appendChild(txt1[0]);
    txt2[1].appendChild(txt2[0]);
    txt3[1].appendChild(txt3[0]);
    txt4[1].appendChild(txt4[0]);
    txt5[1].appendChild(txt5[0]);
    txt6[1].appendChild(txt6[0]);
    txt7[1].appendChild(txt7[0]);
    txt8[1].appendChild(txt8[0]);
    txt9[1].appendChild(txt9[0]);
    txt10[1].appendChild(txt10[0]);
    txt11[1].appendChild(txt11[0]);
  }

  handleDownload() {
    const table = this.props.table;
    console.log('통합 테이블 개수 : ' + table.length);
    let tables = '';
    if (!document) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Failed to access document object');
      }
      return null;
    }

    for (let n = 0; n < table.length; n++) {
      if (document.getElementById(table[n]).nodeType !== 1 || document.getElementById(table[n]).nodeName !== 'TABLE') {
        if (process.env.NODE_ENV !== 'production') {
          console.error('Provided table property is not html table element');
        }
        return null;
      }
      tables = tables === '' ? document.getElementById(table[n]).outerHTML : tables + '<br/>' + document.getElementById(table[n]).outerHTML;
    }

    const sheet = String(this.props.sheet);
    const filename = `${String(this.props.filename)}.xls`;

    const uri = 'data:application/vnd.ms-excel;base64,';
    const template =      '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-mic'
      + 'rosoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta cha'
      + 'rset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:Exce'
      + 'lWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/>'
      + '</x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></'
      + 'xml><![endif]--></head><body>{tables}</body></html>';

    const context = {
      worksheet: sheet || 'Worksheet',
      tables,
    };

    // If IE11
    if (window.navigator.msSaveOrOpenBlob) {
      const fileData = [
        `${'<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-mic' + 'rosoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta cha' + 'rset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:Exce' + 'lWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/>' + '</x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></' + 'xml><![endif]--></head><body>'}${tables}</body></html>`,
      ];
      const blobObject = new Blob(fileData);
      document.getElementById('react-html-table-to-excel').click()(() => {
        window.navigator.msSaveOrOpenBlob(blobObject, filename);
      });

      return true;
    }

    const element = window.document.createElement('a');
    element.href =      uri
      + this.base64(
        this.format(template, context),
      );
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    return true;
  }

  render() {
    return (
      <Button
        id={this.props.id}
        className={this.props.className}
        type="button"
        onClick={this.handleDownloadBefore}
      >
        {this.props.buttonText}
      </Button>
    );
  }
}

// ReactHTMLTableToExcel.propTypes = propTypes;
// ReactHTMLTableToExcel.defaultProps = defaultProps;

export default ReactHTMLTableToExcel;
